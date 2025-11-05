#!/usr/bin/env bash
set -euo pipefail

ENDPOINT=${LOCALSTACK_ENDPOINT:-http://localhost:4566}
functions=(createOrder getOrders getOrderById updateOrder deleteOrder)
OUTFILE=invocations.sh

echo "# Auto-generated invocation script" > "$OUTFILE"
echo "#!/usr/bin/env bash" >> "$OUTFILE"
echo "set -euo pipefail" >> "$OUTFILE"
echo "" >> "$OUTFILE"

echo "# Detect AWS CLI or use awslocal/dockerized aws-cli" >> "$OUTFILE"
echo "if command -v aws >/dev/null 2>&1; then" >> "$OUTFILE"
echo "  AWS_CMD=aws" >> "$OUTFILE"
echo "elif docker compose ps localstack >/dev/null 2>&1; then" >> "$OUTFILE"
echo "  AWS_CMD='docker compose exec -T localstack awslocal'" >> "$OUTFILE"
echo "else" >> "$OUTFILE"
echo "  AWS_CMD='docker run --rm -i -v $(pwd):/work -w /work --entrypoint aws amazon/aws-cli:2.13.4'" >> "$OUTFILE"
echo "fi" >> "$OUTFILE"
echo "" >> "$OUTFILE"

for fn in "${functions[@]}"; do
  # Default payload is empty object. Adjust per function as needed.
  payload='{}'
  echo "echo \"Invoking $fn\"" >> "$OUTFILE"

  echo "# Determine response path/cat method depending on AWS_CMD" >> "$OUTFILE"
  echo "if echo \"\$AWS_CMD\" | grep -q \"awslocal\"; then" >> "$OUTFILE"
  echo "  RESP_PATH=/tmp/${fn}_resp.json" >> "$OUTFILE"
  echo "  CAT_CMD='docker compose exec -T localstack cat'" >> "$OUTFILE"
  echo "elif echo \"\$AWS_CMD\" | grep -q \"docker run\"; then" >> "$OUTFILE"
  echo "  RESP_PATH=/work/tmp/${fn}_resp.json" >> "$OUTFILE"
  echo "  CAT_CMD='cat tmp/${fn}_resp.json'" >> "$OUTFILE"
  echo "else" >> "$OUTFILE"
  echo "  RESP_PATH=/tmp/${fn}_resp.json" >> "$OUTFILE"
  echo "  CAT_CMD='cat /tmp/${fn}_resp.json'" >> "$OUTFILE"
  echo "fi" >> "$OUTFILE"

  # Invoke and print
  echo "bash -lc \"\$AWS_CMD --endpoint-url=\\\"$ENDPOINT\\\" lambda invoke --function-name $fn --payload '$payload' \$RESP_PATH --region us-east-1 >/dev/null && \$CAT_CMD\"" >> "$OUTFILE"
  echo "echo" >> "$OUTFILE"
done

chmod +x "$OUTFILE"
echo "Generated $OUTFILE"
