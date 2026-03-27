# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio application deployed serverlessly on AWS, demonstrating modern DevOps practices. The contact form is the core feature: React frontend → API Gateway → Lambda → DynamoDB.

**Stack:** React + TypeScript + Vite (frontend), Python + AWS Lambda (backend), Terraform + Terragrunt (IaC), GitHub Actions (CI/CD), Playwright + Pytest (testing).

## Commands

### Frontend
```bash
cd frontend
npm ci                # Install dependencies
npm run dev           # Local dev server
npm run build         # Build to frontend/dist/
npm run lint          # ESLint
```

### Backend Unit Tests
```bash
pip install -r backend/tests/requirements.txt
pytest backend/tests/test_handler.py -s -v
```

### E2E Tests (requires deployed environment)
```bash
pip install -r e2e_tests/requirements.txt
pytest e2e_tests/test_form_submission.py -s -v \
  --browser chromium --browser firefox --browser webkit \
  --numprocesses 2 \
  --alluredir=allure-results
```

### Backend Docker Build (local)
```bash
# Requires AWS credentials and ECR access
./cicd/scripts/build-backend.sh
```

## Architecture

```
Internet → CloudFront → S3 (React SPA)
                ↓
         API Gateway (HTTP API)
                ↓
         Lambda (Python 3.12, containerized)
                ↓
         DynamoDB (contact messages)
```

DNS via Route53, SSL via ACM. Lambda is deployed as a container image stored in ECR.

### Key Paths
- `frontend/src/` — React components (App, Contact form, About, Skills, Experience, Certifications)
- `backend/src/app.py` — Lambda handler; validates name/email/message, writes to DynamoDB
- `backend/tests/` — Pytest unit tests using `moto` to mock DynamoDB
- `e2e_tests/` — Playwright tests covering valid and invalid contact form submissions across 3 browsers
- `cicd/deployment/` — Terragrunt modules (s3, cloudfront, route53, acm, api_gw, dynamodb, lambda)
- `cicd/scripts/` — Shell scripts called by CI jobs (build-backend, deploy-backend, deploy-frontend, create-infra, destroy)
- `.github/workflows/` — GitHub Actions pipelines

## CI/CD Pipelines

All pipelines are manually triggered (`workflow_dispatch`). AWS auth uses OIDC (no stored keys).

| Workflow | Purpose |
|---|---|
| `cicd-dev.yml` | Full deploy: unit tests → build → deploy → e2e tests → Allure report |
| `create-infra.yml` | One-time infrastructure provisioning (Route53, ACM, CloudFront, S3, API GW) |
| `create-tf-backend.yml` | Bootstrap Terraform state backend (S3 + DynamoDB) and ECR repo |
| `destroy.yml` | Tear down all resources |

**cicd-dev.yml job order:** `unit-tests` → `build-backend` + `build-frontend` (parallel) → `deploy-backend` + `deploy-frontend` (parallel) → `e2e-tests` → `publish-allure`

E2E test results are published as an Allure HTML report to the `gh-pages` branch.

## Infrastructure Details

- **Terraform state:** Remote backend on S3 + DynamoDB locking, configured in `cicd/deployment/terragrunt.hcl`
- **Lambda IAM:** CloudWatch Logs + DynamoDB write (PutItem, UpdateItem, BatchWriteItem)
- **Lambda route:** `POST /contact` via API Gateway v2 HTTP API
- **Frontend env var:** `VITE_API_URL` — set at build time to the API Gateway custom domain

## Environment Variables

CI/CD variables stored as GitHub Actions repository vars/secrets:

| Variable | Description |
|---|---|
| `AWS_ARN_ROLE` | IAM role ARN for OIDC authentication |
| `ENV` | Environment name (e.g., `dev`) |
| `APP_NAME` | Application name for resource naming |
| `AWS_REGION`, `AWS_ACCOUNT_ID` | AWS target |
| `BACKEND_BUCKET`, `BACKEND_DYNAMODB_TABLE` | Terraform state backend |
| `BUCKET_FRONT` | S3 bucket for frontend assets |
| `DOMAIN_NAME`, `DOMAIN_API_NAME` | Custom domains |
| `DYNAMODB_TABLE_NAME` | DynamoDB table for contact messages |
| `ECR_REPO` | ECR repository name |
