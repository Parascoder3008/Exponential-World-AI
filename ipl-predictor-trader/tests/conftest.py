import pytest

from iplquant import models


@pytest.fixture(scope="session")
def prepared():
    """Real data, loaded once. Returns (matches, balls, F, state, pm, states)."""
    return models.prepare()


@pytest.fixture(scope="session")
def bundle(prepared):
    matches, balls, F, state, pm, states = prepared
    return models.Bundle(
        prematch=models.PreMatchModel().fit(F),
        inplay=models.fit_inplay(states),
        totals=models.fit_totals(states),
        state=state,
        trained_through=str(matches["date"].max().date()),
    )
