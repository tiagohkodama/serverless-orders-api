#!/usr/bin/env bash
set -euo pipefail

ENDPOINT=${1:-http://localhost:4566}
echo "Waiting for LocalStack at $ENDPOINT ..."
for i in {1..60}; do
  # Try health endpoint first
  if curl -s "$ENDPOINT/health" | grep -qi 'running' >/dev/null 2>&1; then
    echo "LocalStack healthy"
    exit 0
  fi
  # fallback: try root
  if curl -s "$ENDPOINT" >/dev/null 2>&1; then
    echo "LocalStack reachable"
    exit 0
  fi
  sleep 1
done
echo "LocalStack did not start in time" >&2
exit 1
