## Serverless Orders — Interview / Portfolio README

Short summary
---------------
This repository is a small, production-minded Serverless CRUD API for orders. It's intended to be shown to interviewers as a compact example of architecture and engineering practices: TypeScript, unit tests, clear separation of handlers/use-cases/adapters, and local integration using LocalStack + Docker.

Technologies
------------
- Node.js (20) + TypeScript
- AWS Lambda (zip package handlers)
- AWS DynamoDB (table for orders)
- AWS SDK v3 (@aws-sdk/client-dynamodb + @aws-sdk/lib-dynamodb)
- LocalStack (for local Lambda + DynamoDB testing)
- Docker + Docker Compose
- Jest for unit tests

Project structure (high level)
-----------------------------
- `src/handlers/` — Lambda handlers (HTTP entry points)
- `src/usecases/` — Application business use-cases
- `src/adapters/` — Infrastructure adapters (DynamoOrderRepository)
- `src/entities/` — Domain entity types (Order)
- `src/lib/` — shared helpers (dynamo client, etc.)
- `tests/` — unit tests (Jest)

Architecture (one-liner)
-----------------------
HTTP -> Lambda handler -> Use-case -> Repository adapter -> DynamoDB

How this showcases your skills
---------------------------------------------------------
- Clean separation of concerns: handlers, use-cases, adapters, entities.
- Test coverage (unit tests under `tests/`) and a CI job that runs smoke tests against LocalStack.
- Practical infra experience: packaging Lambdas, using LocalStack for local integration tests, and automating with Docker.

Quick run / demo commands
-------------------------
Use these commands when demoing the project locally. They assume Docker is installed.

1) Start LocalStack (in background):

```bash
docker compose up -d
```

2) Wait until LocalStack is ready (script included):

```bash
./scripts/wait-for-localstack.sh http://localhost:4566
```

3) Create DynamoDB table (uses awslocal/dockerized aws if you don't have aws CLI):

```bash
./scripts/create-dynamodb-table.sh
```

4) Build, package and register Lambda functions in LocalStack:

```bash
./scripts/package-and-create-lambdas.sh
```

5) Generate simple invoke commands and run them (outputs saved in `logs/`):

```bash
./scripts/generate-invoke-commands.sh
./scripts/invoke-lambdas.sh
```

Direct invoke examples (useful when demoing in terminal):

- Using awslocal inside LocalStack container:

```bash
docker compose exec -T localstack awslocal lambda invoke --function-name createOrder --payload '{"body":"..."}' /tmp/resp.json
docker compose exec -T localstack cat /tmp/resp.json
```

- From host using dockerized aws-cli (if you don't have aws installed):

```bash
docker run --rm -i -v $(pwd):/work -w /work --entrypoint aws amazon/aws-cli:2.13.4 lambda invoke --endpoint-url http://localhost:4566 --function-name getOrders /work/tmp/resp.json
cat tmp/resp.json
```

Stop LocalStack:

```bash
docker compose down
```

Notes and tips
--------------
- `./scripts/package-and-create-lambdas.sh` packages `dist/` and node_modules; ensure you `npm install` before running if you changed dependencies.
- For interviews, focus on explaining the folder layout, how handlers map to use-cases, and the adapter pattern used for DynamoDB.

If you want, I can also:
- Add a one-page architecture diagram (SVG) to include in the repo.
- Add small example payloads for each lambda into `scripts/generate-invoke-commands.sh` so the demo shows realistic behavior.

