#!/usr/bin/env bash
set -euo pipefail

echo "Starting LocalStack via docker-compose"
docker compose up -d

echo "Waiting for LocalStack to be ready"
./scripts/wait-for-localstack.sh http://localhost:4566

echo "Creating DynamoDB table"
./scripts/create-dynamodb-table.sh

echo "Packaging and creating lambdas"
./scripts/package-and-create-lambdas.sh

echo "Generating invocation script"
./scripts/generate-invoke-commands.sh

echo "Local environment ready. To invoke lambdas run: ./scripts/invoke-lambdas.sh"
