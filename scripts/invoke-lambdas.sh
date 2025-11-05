#!/usr/bin/env bash
set -euo pipefail

mkdir -p logs
if [[ ! -x ./invocations.sh ]]; then
  echo "invocations.sh not found or not executable. Run ./scripts/generate-invoke-commands.sh first."
  exit 1
fi

echo "Invoking lambdas and saving output to logs/invocations.log"
./invocations.sh | tee logs/invocations.log
