#!/bin/bash -e

echo "[INFO] Destroying API Gateway"
cd ./cicd/deployment/api_gw || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] api_gw destroyed"

echo "[INFO] Destroying Lambda"
cd ../lambda || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] lambda destroyed"

echo "[INFO] Destroying DynamoDB"
cd ../dynamodb || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] dynamodb destroyed"

echo "[INFO] Destroying CloudFront"
cd ../cloudfront || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] cloudfront destroyed"

echo "[INFO] Destroying S3"
cd ../s3 || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] s3 destroyed"

echo "[INFO] Destroying ACM"
cd ../acm || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] acm destroyed"

echo "[INFO] Destroying Route53"
cd ../route53 || exit
terragrunt run-all destroy --terragrunt-non-interactive -no-color
echo "[INFO] route53 destroyed"

echo "[INFO] Destroy complete"
