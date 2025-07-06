#!/bin/bash -e

echo "[INFO] Deploying Route 53 for application: ${APP_NAME} in environment: ${ENV}"
cd ./cicd/deployment/route53 || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying ACM certificate for application: ${APP_NAME} in environment: ${ENV}"
cd ../acm || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color