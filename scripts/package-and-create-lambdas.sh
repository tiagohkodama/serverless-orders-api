#!/usr/bin/env bash
set -euo pipefail

# Packages the compiled TypeScript and node_modules into zip files and creates/updates
# Lambda functions on LocalStack via AWS CLI.


ENDPOINT=${LOCALSTACK_ENDPOINT:-http://localhost:4566}
functions=(createOrder getOrders getOrderById updateOrder deleteOrder)

# Use host aws CLI if available, otherwise use dockerized aws cli image
if command -v aws >/dev/null 2>&1; then
  AWS_CMD="aws"
elif docker compose ps localstack >/dev/null 2>&1; then
  AWS_CMD="docker compose exec -T localstack awslocal"
else
  AWS_CMD="docker run --rm -i -v $(pwd):/work -w /work --entrypoint aws amazon/aws-cli:2.13.4"
fi

echo "Installing dependencies (dev + prod) to build"
npm ci

echo "Building project (TypeScript)"
npm run build

echo "Reinstalling production-only dependencies for packaging"
# Install production dependencies so zip includes required modules
npm ci --only=production

for fn in "${functions[@]}"; do
  zipname="${fn}.zip"
  echo "Packaging ${fn} -> ${zipname}"
  rm -f "$zipname"
  # include dist, node_modules and package.json so runtime can require deps
  if command -v zip >/dev/null 2>&1; then
    zip -r "$zipname" dist package.json node_modules > /dev/null
  elif command -v python3 >/dev/null 2>&1; then
    # Use python's zipfile module to create the archive
    python3 -m zipfile -c "$zipname" dist package.json node_modules
  else
    echo "Error: neither 'zip' nor 'python3' is available to create zip archives" >&2
    exit 1
  fi

  # If using awslocal inside the LocalStack container, copy the zip into the container
  if echo "$AWS_CMD" | grep -q "awslocal"; then
    docker cp "$zipname" localstack:/tmp/"$zipname"
    ZIP_URI="fileb:///tmp/$zipname"
  else
    ZIP_URI="fileb://$zipname"
  fi

  if $AWS_CMD --endpoint-url="$ENDPOINT" lambda get-function --function-name "$fn" >/dev/null 2>&1; then
    echo "Updating code for lambda $fn"
    $AWS_CMD --endpoint-url="$ENDPOINT" lambda update-function-code --function-name "$fn" --zip-file "$ZIP_URI"
  else
    echo "Creating lambda $fn"
    $AWS_CMD --endpoint-url="$ENDPOINT" lambda create-function \
      --function-name "$fn" \
      --runtime nodejs20.x \
      --handler "dist/handlers/${fn}.handler" \
      --zip-file "$ZIP_URI" \
      --role arn:aws:iam::000000000000:role/lambda-role
  fi
done

echo "Done packaging and creating/updating lambdas."
