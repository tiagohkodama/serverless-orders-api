# Serverless Orders CRUD (LocalStack)

**Status:** WIP — README created. Follow the instructions below to run this project locally.

## Project Overview

This project implements a simple **Orders API** (Create, Read, Update, Delete) using a Node.js + TypeScript + Serverless Framework stack that runs entirely on **LocalStack** (local AWS cloud emulation). The purpose is to demonstrate a clean, well-structured REST API following **Clean Architecture** and **SOLID** principles.

The code shows how to:

- Structure Lambda handlers using use-cases and repository interfaces.
- Persist data to **DynamoDB** running in LocalStack.
- Provide a RESTful interface through API Gateway (LocalStack API Gateway emulation).
- Run full unit tests (Jest) with coverage target >= 80%.
- Use ESLint, Prettier, and Husky to enforce code quality and pre-commit hooks.
- Deploy and run locally using `sls deploy --stage local` and `serverless-offline`/LocalStack.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Repository layout](#repository-layout)
3. [Local development setup](#local-development-setup)
4. [Run the service locally (LocalStack)](#run-the-service-locally-localstack)
5. [Serverless commands](#serverless-commands)
6. [API Endpoints & Examples (curl / Postman)](#api-endpoints--examples-curl--postman)
7. [Testing](#testing)
8. [Linters & Commit hooks](#linters--commit-hooks)
9. [Architecture notes](#architecture-notes)
10. [Serverless / LocalStack config (examples)](#serverless--localstack-config-examples)
11. [Troubleshooting](#troubleshooting)
12. [Definition of Done / Acceptance Criteria mapping](#definition-of-done--acceptance-criteria-mapping)

---

## Requirements

- Node.js **20+** (LTS recommended)
- npm or Yarn
- Docker (for LocalStack)
- Serverless Framework (global install recommended)
  ```bash
  npm install -g serverless

LocalStack (we use the Docker Compose below)



---

Repository layout (recommended)

/ (repo root)
├─ src/
│  ├─ handlers/                # Lambda handler thin adapters
│  │  └─ ordersHandler.ts
│  ├─ usecases/                # Application use-cases (business logic)
│  │  ├─ CreateOrderUseCase.ts
│  │  ├─ GetOrderUseCase.ts
│  │  ├─ ListOrdersUseCase.ts
│  │  ├─ UpdateOrderUseCase.ts
│  │  └─ DeleteOrderUseCase.ts
│  ├─ repositories/            # Interfaces & local implementations
│  │  ├─ IOrdersRepository.ts
│  │  └─ DynamoOrdersRepository.ts
│  ├─ models/                  # Types and DTOs
│  │  └─ Order.ts
│  ├─ infra/                   # DynamoDB client, infra wiring
│  │  └─ dynamoClient.ts
│  ├─ shared/                  # Shared helpers, errors
│  └─ index.ts                 # optional local bootstrap for runnable functions
├─ tests/                      # Unit tests (Jest)
├─ serverless.yml
├─ docker-compose.yml          # LocalStack
├─ package.json
├─ tsconfig.json
├─ .eslintrc.js
├─ .prettierrc
└─ README.md


---

Local development setup

1. Clone the repo



git clone <repo-url>
cd <repo>
npm install

2. Start LocalStack (Docker Compose)



Create a docker-compose.yml with the LocalStack service (example provided later) and run:

docker compose up -d

3. (Optional) Verify LocalStack is up



# LocalStack Health
curl http://localhost:4566/health

4. Configure environment variables



Create .env.local at repo root or export variables in your shell. Example variables used by lambdas:

AWS_REGION=us-east-1
DYNAMODB_TABLE=OrdersTable-local
LOCALSTACK_ENDPOINT=http://localhost:4566


---

Run the service locally (LocalStack)

Deploy stack to LocalStack

# Build & deploy to local stage
npx serverless deploy --stage local
# or if installed globally
sls deploy --stage local

This deploys the Lambda functions, creates the DynamoDB table in LocalStack, and wires API Gateway endpoints.

Invoke locally (optional)

sls invoke local -f orders --stage local --path ./events/create-order.json

Run tests

npm test
# with coverage
npm run test:coverage


---

Serverless commands

sls deploy --stage local — deploy the stack to LocalStack

sls remove --stage local — remove deployed resources in LocalStack

sls invoke local -f <function> — run handler locally

npm run test — run tests

npm run lint — run ESLint

npm run format — run Prettier



---

API Endpoints & Examples (curl / Postman)

Base URL

After sls deploy --stage local the LocalStack API Gateway URL will be printed in the deploy output. Usually it's:

http://localhost:4566/restapis/<restApiId>/<stage>/_user_request_

For convenience, the project includes an npm script that attempts to discover and print the local URL after deploy. If not present, check the sls deploy output.

POST /orders — Create order

Request body (JSON):

{
  "customerId": "cust_123",
  "items": [{"sku": "sku_1", "qty": 2}],
  "total": 49.99
}

Curl example:

curl -X POST "${API_BASE_URL}/orders" \
  -H "Content-Type: application/json" \
  -d '{"customerId":"cust_123","items":[{"sku":"sku_1","qty":2}],"total":49.99}'

GET /orders — List orders

curl "${API_BASE_URL}/orders"

GET /orders/{id} — Get order by id

curl "${API_BASE_URL}/orders/{orderId}"

PUT /orders/{id} — Update order

curl -X PUT "${API_BASE_URL}/orders/{orderId}" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"sku":"sku_1","qty":3}],"total":74.99}'

DELETE /orders/{id}

curl -X DELETE "${API_BASE_URL}/orders/{orderId}"

> Postman: Import the endpoints as a collection using the above routes. Save a base URL variable {{API_BASE_URL}} and set it to the API Gateway URL from sls deploy.




---

Testing

Jest is configured with TypeScript support.

Example scripts in package.json:

{
  "scripts": {
    "build": "tsc",
    "test": "jest --runInBand",
    "test:coverage": "jest --coverage",
    "lint": "eslint 'src/**' --ext .ts",
    "format": "prettier --write 'src/**/*.{ts,js,json,md}'"
  }
}

Goal: tests must cover at least 80% of statements/branches/functions/lines.
Use mocks for DynamoDB client (do not call LocalStack in unit tests). Integration tests may be added separately which use LocalStack.


---

Linters & Commit hooks

ESLint + Prettier configured.

Husky with pre-commit hook runs npm run lint and npm test (or test:quick subset).


Example Husky hook:

npx husky add .husky/pre-commit "npm run lint && npm run test:quick"


---

Architecture notes

Follows Clean Architecture:

Handlers parse HTTP requests, invoke use-cases, return responses.

Use-cases hold business logic, orchestrate repositories.

Repositories provide data persistence (DynamoDB implementation).

Models define domain entities and DTOs.


Flow:
POST /orders → ordersHandler.createOrder() → CreateOrderUseCase.execute(dto, repository) → DynamoOrdersRepository.save(order) → DynamoDB


---

Serverless / LocalStack config (examples)

Minimal serverless.yml:

service: orders-api
frameworkVersion: '4'
provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: ${opt:stage, 'dev'}
  environment:
    DYNAMODB_TABLE: ${self:custom.tableName}

plugins:
  - serverless-offline
  - serverless-localstack

custom:
  tableName: OrdersTable-${self:provider.stage}
  localstack:
    stages:
      - local
    endpoints:
      dynamodb: http://localhost:4566

functions:
  orders:
    handler: dist/handlers/ordersHandler.main
    events:
      - http:
          path: orders
          method: post
      - http:
          path: orders
          method: get
      - http:
          path: orders/{id}
          method: get
      - http:
          path: orders/{id}
          method: put
      - http:
          path: orders/{id}
          method: delete

resources:
  Resources:
    OrdersDynamoTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:custom.tableName}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST

Docker Compose for LocalStack

version: '3.8'
services:
  localstack:
    image: localstack/localstack:latest
    ports:
      - '4566:4566'
      - '4571:4571'
    environment:
      - SERVICES=dynamodb,apigateway,lambda
      - DEBUG=1
      - DATA_DIR=/tmp/localstack/data
    volumes:
      - ./localstack:/tmp/localstack
      - /var/run/docker.sock:/var/run/docker.sock


---

Troubleshooting

DynamoDB table not found: Ensure sls deploy --stage local ran successfully.

API Gateway 403/404: Check API base URL from sls deploy output.

Lambda errors: Run sls logs -f <function> --stage local.

Port conflicts: Ensure nothing else is using port 4566.



---

Definition of Done / Acceptance Criteria Mapping

[ ] REST endpoints implemented.

[ ] Orders stored in DynamoDB (LocalStack).

[ ] Handlers follow Clean Architecture.

[ ] Tests with Jest ≥80% coverage.

[ ] ESLint + Prettier + Husky configured.

[ ] Deployable with sls deploy --stage local.

[ ] Curl/Postman examples included.



---

Next Steps

Add integration tests using LocalStack.

Add Swagger/OpenAPI spec.

Add small frontend demo for CRUD visualization.
