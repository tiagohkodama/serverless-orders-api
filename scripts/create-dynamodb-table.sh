#!/usr/bin/env bash
set -euo pipefail

ENDPOINT=${LOCALSTACK_ENDPOINT:-http://localhost:4566}
ORDERS_TABLE=${ORDERS_TABLE:-serverless-orders-crud-orders-local}

# Use host aws CLI if available, otherwise use dockerized aws cli image
if command -v aws >/dev/null 2>&1; then
  AWS_CMD="aws"
elif docker compose ps localstack >/dev/null 2>&1; then
  # Use awslocal inside the running LocalStack container
  AWS_CMD="docker compose exec -T localstack awslocal"
else
  AWS_CMD="docker run --rm -i -v $(pwd):/work -w /work --entrypoint aws amazon/aws-cli:2.13.4"
fi

echo "Creating DynamoDB table '$ORDERS_TABLE' at $ENDPOINT"
$AWS_CMD --endpoint-url="$ENDPOINT" dynamodb create-table \
  --table-name "$ORDERS_TABLE" \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST || echo "Table may already exist"
