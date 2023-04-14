# Hexagonal Architecture with AWS SAM and TypeScript

## Overview

Hexagonal Architecture is to design the application in layers, with the core business logic at the center and the external interfaces and technologies forming a "hexagonal" shape around it. The core business logic is encapsulated in the center of the hexagon, while the external interfaces and technologies are represented by the "ports" and "adapters" on the hexagon's perimeter.

## Usage

This is more of a prof of concept or template rather than fully working application. To deploy it properly you'd need to:

- create an IAM role with permission to access CloudFormation, Lambda, API Gateway, and DynamoDB
- create a DynamoDB table using the AWS Console or AWS CLI
- update template.yaml with required credentials and resource locations
- package AWS SAM application with `sam package`
- deploy AWS SAM application with `sam deploy`

### Installation:

```bash
npm install
```

### Run locally:

- install [Docker](https://docs.docker.com/desktop/install/mac-install/)
- install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- compile TypeScript

```bash
npm run build
```

- build AWS SAM application

```bash
sam build
```

- run AWS SAM application locally

```bash
sam local start-api
```

### Test:

```bash
npm run test
```

### Coverage:

```bash
npm run coverage
```

## Endpoints

- POST `/` - adds new user
- GET `/{id}` - get one user by id
- DELETE `/{id}` - remove user by id
- PUT `/{id}` - update user by id

## TODO

- [ ] address comments in the code
- [ ] consider using dependency injection
- [ ] add proper tracing
- [ ] add a pipeline
- [ ] add AWS policies and roles
