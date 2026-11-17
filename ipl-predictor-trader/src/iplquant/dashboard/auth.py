"""Login for the dashboard: one password, scrypt-hashed, server-side sessions.

* The password hash lives in ``~/.iplquant/dashboard.json`` (file mode 600). The
  password itself is never stored or logged.
* scrypt (memory-hard, in the standard library) with a random salt per password.
* Session tokens are 256-bit random values. The server keeps only their SHA-256, so
  a memory dump of the server does not hand out usable cookies.
* Five wrong passwords from one address lock that address out for five minutes.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import secrets
import threading
import time
from pathlib import Path

DEFAULT_PATH = Path.home() / ".iplquant" / "dashboard.json"
MIN_LENGTH = 10
SCRYPT = {"n": 2 ** 15, "r": 8, "p": 1, "dklen": 32}
SESSION_TTL = 12 * 3600
MAX_FAILS, LOCKOUT = 5, 300


def _scrypt(password: str, salt: bytes, params: dict) -> bytes:
    return hashlib.scrypt(password.encode("utf-8"), salt=salt, n=params["n"], r=params["r"],
                          p=params["p"], dklen=params["dklen"], maxmem=128 * 1024 * 1024)


class PasswordStore:
    def __init__(self, path: str | Path | None = None):
        self.path = Path(path) if path else DEFAULT_PATH

    @property
    def is_set(self) -> bool:
        return self.path.exists()

    def set(self, password: str) -> None:
        if len(password) < MIN_LENGTH:
            raise ValueError(f"use at least {MIN_LENGTH} characters")
        salt = secrets.token_bytes(16)
        rec = {"algo": "scrypt", **SCRYPT, "salt": base64.b64encode(salt).decode(),
               "hash": base64.b64encode(_scrypt(password, salt, SCRYPT)).decode()}
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w") as fh:
            json.dump(rec, fh)
        os.replace(tmp, self.path)

    def verify(self, password: str) -> bool:
        """Fails closed: a missing or damaged file means no one gets in."""
        try:
            rec = json.loads(self.path.read_text())
            if rec.get("algo") != "scrypt":
                return False
            want = base64.b64decode(rec["hash"])
            got = _scrypt(password, base64.b64decode(rec["salt"]),
                          {k: int(rec[k]) for k in ("n", "r", "p", "dklen")})
        except Exception:  # noqa: BLE001
            return False
        return hmac.compare_digest(got, want)


class Sessions:
    def __init__(self, ttl: float = SESSION_TTL, clock=time.time):
        self.ttl, self.clock = ttl, clock
        self._live: dict[str, float] = {}
        self._lock = threading.Lock()

    @staticmethod
    def _key(token: str) -> str:
        return hashlib.sha256(token.encode()).hexdigest()

    def create(self) -> str:
        token = secrets.token_urlsafe(32)
        with self._lock:
            now = self.clock()
            self._live = {k: v for k, v in self._live.items() if v > now}
            self._live[self._key(token)] = now + self.ttl
        return token

    def valid(self, token: str | None) -> bool:
        if not token or len(token) > 128:
            return False
        with self._lock:
            exp = self._live.get(self._key(token))
            return exp is not None and exp > self.clock()

    def revoke(self, token: str | None) -> None:
        if token:
            with self._lock:
                self._live.pop(self._key(token), None)


class Throttle:
    """Per-address lockout after repeated wrong passwords."""

    def __init__(self, max_fails: int = MAX_FAILS, lockout: float = LOCKOUT, clock=time.time):
        self.max_fails, self.lockout, self.clock = max_fails, lockout, clock
        self._fails: dict[str, list] = {}
        self._lock = threading.Lock()

    def blocked(self, ip: str) -> float:
        """Seconds left on a lockout, 0 if none."""
        with self._lock:
            n, until = self._fails.get(ip, (0, 0.0))
            return max(until - self.clock(), 0.0)

    def fail(self, ip: str) -> None:
        with self._lock:
            n, until = self._fails.get(ip, (0, 0.0))
            n += 1
            if n >= self.max_fails:
                self._fails[ip] = (0, self.clock() + self.lockout)
            else:
                self._fails[ip] = (n, until)

    def ok(self, ip: str) -> None:
        with self._lock:
            self._fails.pop(ip, None)
