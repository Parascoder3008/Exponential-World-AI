#!/usr/bin/env bash
# Apply both migrations to a scratch database and run the schema assertions.
#
# Needs a reachable Postgres. Honours PGHOST/PGPORT/PGUSER, or point DATABASE_URL
# at a server. Creates and drops a database called reng_schema_test.
set -euo pipefail

DB=${SCHEMA_TEST_DB:-reng_schema_test}
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

psql -q -c "DROP DATABASE IF EXISTS $DB;"
psql -q -c "CREATE DATABASE $DB;"
trap 'psql -q -c "DROP DATABASE IF EXISTS $DB;" >/dev/null 2>&1 || true' EXIT

psql -q -v ON_ERROR_STOP=1 -d "$DB" -f "$HERE/../migrations/0001_init.sql"
echo "0001_init.sql applied"
psql -q -v ON_ERROR_STOP=1 -d "$DB" -f "$HERE/../migrations/0002_conversations_and_ops.sql"
echo "0002_conversations_and_ops.sql applied"
psql -q -v ON_ERROR_STOP=1 -d "$DB" -f "$HERE/schema_test.sql"
