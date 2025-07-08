#!/bin/bash -e


echo "[INFO] Deploying API Gateway for application: ${APP_NAME} in environment: ${ENV}"
cd ./cicd/deployment/api_gw || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Deploying lambda for application: ${APP_NAME} in environment: ${ENV}"
cd ../lambda_src || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color