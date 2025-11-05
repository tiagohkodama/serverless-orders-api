# Auto-generated invocation script
#!/usr/bin/env bash
set -euo pipefail

# Detect AWS CLI or use awslocal/dockerized aws-cli
if command -v aws >/dev/null 2>&1; then
  AWS_CMD=aws
elif docker compose ps localstack >/dev/null 2>&1; then
  AWS_CMD='docker compose exec -T localstack awslocal'
else
  AWS_CMD='docker run --rm -i -v /home/tiago-linux/Projects/serverless-orders-api:/work -w /work --entrypoint aws amazon/aws-cli:2.13.4'
fi

echo "Invoking createOrder"
# Determine response path/cat method depending on AWS_CMD
if echo "$AWS_CMD" | grep -q "awslocal"; then
  RESP_PATH=/tmp/createOrder_resp.json
  CAT_CMD='docker compose exec -T localstack cat'
elif echo "$AWS_CMD" | grep -q "docker run"; then
  RESP_PATH=/work/tmp/createOrder_resp.json
  CAT_CMD='cat tmp/createOrder_resp.json'
else
  RESP_PATH=/tmp/createOrder_resp.json
  CAT_CMD='cat /tmp/createOrder_resp.json'
fi
bash -lc "$AWS_CMD --endpoint-url=\"http://localhost:4566\" lambda invoke --function-name createOrder --payload '{}' $RESP_PATH --region us-east-1 >/dev/null && $CAT_CMD"
echo
echo "Invoking getOrders"
# Determine response path/cat method depending on AWS_CMD
if echo "$AWS_CMD" | grep -q "awslocal"; then
  RESP_PATH=/tmp/getOrders_resp.json
  CAT_CMD='docker compose exec -T localstack cat'
elif echo "$AWS_CMD" | grep -q "docker run"; then
  RESP_PATH=/work/tmp/getOrders_resp.json
  CAT_CMD='cat tmp/getOrders_resp.json'
else
  RESP_PATH=/tmp/getOrders_resp.json
  CAT_CMD='cat /tmp/getOrders_resp.json'
fi
bash -lc "$AWS_CMD --endpoint-url=\"http://localhost:4566\" lambda invoke --function-name getOrders --payload '{}' $RESP_PATH --region us-east-1 >/dev/null && $CAT_CMD"
echo
echo "Invoking getOrderById"
# Determine response path/cat method depending on AWS_CMD
if echo "$AWS_CMD" | grep -q "awslocal"; then
  RESP_PATH=/tmp/getOrderById_resp.json
  CAT_CMD='docker compose exec -T localstack cat'
elif echo "$AWS_CMD" | grep -q "docker run"; then
  RESP_PATH=/work/tmp/getOrderById_resp.json
  CAT_CMD='cat tmp/getOrderById_resp.json'
else
  RESP_PATH=/tmp/getOrderById_resp.json
  CAT_CMD='cat /tmp/getOrderById_resp.json'
fi
bash -lc "$AWS_CMD --endpoint-url=\"http://localhost:4566\" lambda invoke --function-name getOrderById --payload '{}' $RESP_PATH --region us-east-1 >/dev/null && $CAT_CMD"
echo
echo "Invoking updateOrder"
# Determine response path/cat method depending on AWS_CMD
if echo "$AWS_CMD" | grep -q "awslocal"; then
  RESP_PATH=/tmp/updateOrder_resp.json
  CAT_CMD='docker compose exec -T localstack cat'
elif echo "$AWS_CMD" | grep -q "docker run"; then
  RESP_PATH=/work/tmp/updateOrder_resp.json
  CAT_CMD='cat tmp/updateOrder_resp.json'
else
  RESP_PATH=/tmp/updateOrder_resp.json
  CAT_CMD='cat /tmp/updateOrder_resp.json'
fi
bash -lc "$AWS_CMD --endpoint-url=\"http://localhost:4566\" lambda invoke --function-name updateOrder --payload '{}' $RESP_PATH --region us-east-1 >/dev/null && $CAT_CMD"
echo
echo "Invoking deleteOrder"
# Determine response path/cat method depending on AWS_CMD
if echo "$AWS_CMD" | grep -q "awslocal"; then
  RESP_PATH=/tmp/deleteOrder_resp.json
  CAT_CMD='docker compose exec -T localstack cat'
elif echo "$AWS_CMD" | grep -q "docker run"; then
  RESP_PATH=/work/tmp/deleteOrder_resp.json
  CAT_CMD='cat tmp/deleteOrder_resp.json'
else
  RESP_PATH=/tmp/deleteOrder_resp.json
  CAT_CMD='cat /tmp/deleteOrder_resp.json'
fi
bash -lc "$AWS_CMD --endpoint-url=\"http://localhost:4566\" lambda invoke --function-name deleteOrder --payload '{}' $RESP_PATH --region us-east-1 >/dev/null && $CAT_CMD"
echo
