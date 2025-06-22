#!/bin/bash
set -e
export PAGER=

# ----- Destruir API Gateway -----
echo "[INFO] Moving into Terragrunt api_gw module directory"
cd ./cicd/deployment/api_gw || exit

echo "[INFO] Destroying resources for module: api_gw"
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] api_gw module destroyed successfully"

cd ../lambda || exit

echo "[INFO] Destroying resources for module: lambda"
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] lambda module destroyed successfully"

cd ../s3 || exit

echo "[INFO] Destroying resources for module: S3"
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] S3 module destroyed successfully"


echo "[INFO] Destroy complete"
