# Serverless Orders CRUD (LocalStack)

## Quickstart

1. Start LocalStack (DynamoDB + API Gateway):
   ```bash
   docker run --rm -it -p 4566:4566 -e SERVICES=dynamodb,apigateway localstack/localstack
