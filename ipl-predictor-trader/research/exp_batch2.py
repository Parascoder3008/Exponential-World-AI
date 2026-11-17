"""Backlog items 5, 6, 7."""
import lightgbm as lgb
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression

from harness import Bench
from iplquant import models
from iplquant.models import INN1, INN2, logit, sigmoid

b = Bench()


# 5. Resources remaining: share of a par innings still to come, by (balls left, wickets left),
#    learned from first innings in the training seasons only.
def resources(train, test):
    d = train[(train["innings"] == 1) & train["final_total"].notna()]
    ratio = (d["final_total"] - d["score"]) / d["par"]
    tab = ratio.groupby([d["balls_left"], d["wickets_left"]]).agg(["mean", "size"])
    tab = tab[tab["size"] >= 30]["mean"]
    grid = pd.MultiIndex.from_product([range(1, 121), range(1, 11)], names=["balls_left", "wickets_left"])
    full = tab.reindex(grid).unstack()
    # fill gaps: along balls, then along wickets; force more balls/wickets never to mean less
    full = full.interpolate(axis=0, limit_direction="both").interpolate(axis=1, limit_direction="both")
    full = full.cummax(axis=0).cummax(axis=1)

    def feats(s):
        s = s.copy()
        bl = s["balls_left"].clip(1, 120).astype(int).to_numpy()
        wl = s["wickets_left"].clip(1, 10).astype(int).to_numpy()
        r = full.to_numpy()[bl - 1, wl - 1]
        s["res"] = r
        s["proj_res"] = s["score"] + r * s["par"] - s["par"]
        exp_left = np.maximum(r * s["par"], 1.0)
        s["need_ratio"] = np.log(np.maximum(s["runs_needed"], 1) / exp_left)
        s["need_diff"] = (s["runs_needed"] - exp_left) / 10
        return s
    return feats(train), feats(test)


b.run("5a: resources table (proj vs par / need ratio)", fold=resources,
      inn1=INN1 + ["res", "proj_res"], inn2=INN2 + ["res", "need_ratio", "need_diff"])
b.run("5b: resources table, need terms only in 2nd innings", fold=resources,
      inn2=INN2 + ["need_ratio", "need_diff"])


# 6. Per-league, per-innings Platt calibration fitted on the last training season,
#    using a model that did not see that season.
def calibrate(m, train, test):
    last = train["season"].max()
    m0 = models.InPlayModel().fit(train[train["season"] < last])
    ho = train[train["season"] == last].copy()
    ho["p0"] = m0.predict(ho)
    p = test["p"].to_numpy().copy()
    for (lg, inn), g in ho.groupby(["league", "innings"]):
        mask = ((test["league"] == lg) & (test["innings"] == inn)).to_numpy()
        if not mask.any() or len(g) < 2000:
            continue
        lr = LogisticRegression(C=1e6).fit(logit(g["p0"]).reshape(-1, 1), g["won"])
        p[mask] = lr.predict_proba(logit(p[mask]).reshape(-1, 1))[:, 1]
    return p


b.run("6: per-league calibration on last training season", post=calibrate)

# 7. Small boosted-tree model on the logistic model's residual (it starts from the
#    logistic prediction and can only add bends the linear model missed).
RAW1 = ["balls_left", "wickets_left", "score", "par", "pm_logit", "l18", "l18w"]
RAW2 = ["balls_left", "wickets_left", "runs_needed", "target", "par", "pm_logit", "l18", "l18w"]


def residual(trees, leaves):
    def post(m, train, test):
        p = test["p"].to_numpy().copy()
        for inn, cols in ((1, RAW1), (2, RAW2)):
            tr, mk = train[train["innings"] == inn], (test["innings"] == inn).to_numpy()
            base_tr = logit(m.predict(tr))
            g = lgb.LGBMClassifier(n_estimators=trees, learning_rate=0.05, num_leaves=leaves,
                                   min_child_samples=5000, reg_lambda=100, subsample=0.7,
                                   subsample_freq=1, verbose=-1, n_jobs=4, random_state=3)
            g.fit(tr[cols], tr["won"], init_score=base_tr)
            raw = g.predict(test.loc[mk, cols], raw_score=True)
            p[mk] = sigmoid(logit(p[mk]) + raw)
        return p
    return post


for trees, leaves in ((60, 4), (150, 8)):
    b.run(f"7: residual trees n={trees} leaves={leaves}", post=residual(trees, leaves))
