"""Browser connection to a Betfair-style exchange site: read prices and the score from
the page, and (only in execute mode) click to place bets.

The person logs in themselves in a normal browser window. Nothing here ever sees or
stores a password; the login lives in a browser profile folder on their own computer.
"""
