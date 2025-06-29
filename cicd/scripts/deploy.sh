#!/bin/bash
set -e
export PAGER=

echo "[INFO] Deploying Route 53 for application: ${APP_NAME} in environment: ${ENV}"
cd ./cicd/deployment/route53 || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying ACM certificate for application: ${APP_NAME} in environment: ${ENV}"
cd ../acm || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying lambda for application: ${APP_NAME} in environment: ${ENV}"
cd ../lambda || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying API Gateway for application: ${APP_NAME} in environment: ${ENV}"
cd ../api_gw || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color
API_URL=$(terragrunt output -raw api_gateway_endpoint)

echo "[INFO] API URL: ${API_URL}"
echo "API_URL=$API_URL" >> "$GITHUB_ENV"
echo "api_url=$API_URL" >> "$GITHUB_OUTPUT"

echo "[INFO] Deploying CloudFront for application: ${APP_NAME} in environment: ${ENV}"
cd ../cloudfront || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying Route 53 records for application: ${APP_NAME} in environment: ${ENV}"
cd ../records || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying S3 bucket for application: ${APP_NAME} in environment: ${ENV}"
cd ../s3 || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color