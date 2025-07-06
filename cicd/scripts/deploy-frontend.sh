#!/bin/bash -e


cd ./cicd/deployment/cloudfront
echo "[INFO] Fetching CloudFront distribution id..."
CLOUDFRONT_DISTRIBUTION_ID=$(terragrunt output -raw distribution_id)

echo "[INFO] Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
    --paths "/*"

cd ../../../
echo "[INFO] Deploying S3 bucket for application: ${APP_NAME} in environment: ${ENV}"
aws s3 sync frontend/dist "s3://${BUCKET_FRONT}" --delete