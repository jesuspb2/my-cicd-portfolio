#!/bin/bash

set -o pipefail

tg_destroy() {
  terragrunt run-all destroy --terragrunt-non-interactive -no-color || \
    echo "[WARN] terragrunt destroy returned non-zero (backend may already be gone), continuing..."
}

echo "[INFO] Destroying API Gateway"
cd ./cicd/deployment/api_gw || exit 1
tg_destroy

echo "[INFO] Destroying Lambda"
cd ../lambda || exit 1
tg_destroy

echo "[INFO] Destroying DynamoDB"
cd ../dynamodb || exit 1
tg_destroy

echo "[INFO] Destroying CloudFront"
cd ../cloudfront || exit 1
tg_destroy

echo "[INFO] Destroying S3"
cd ../s3 || exit 1
tg_destroy

echo "[INFO] Destroying ACM"
cd ../acm || exit 1
tg_destroy

echo "[INFO] Destroying Redirect"
cd ../redirect || exit 1
tg_destroy

echo "[INFO] Destroying Route53"
cd ../route53 || exit 1
tg_destroy

echo "[INFO] Destroy complete"
