#!/bin/bash
set -e
export PAGER=

# ----- Create S3 backend for Terraform -----
echo "[INFO] Creating S3 bucket: ${BACKEND_BUCKET}"
if aws s3api head-bucket --bucket "${BACKEND_BUCKET}" 2>/dev/null; then
  echo "[INFO] Bucket already exists: ${BACKEND_BUCKET}"
else
  aws s3api create-bucket \
    --bucket "${BACKEND_BUCKET}" \
    --region "${AWS_REGION}" \
    --create-bucket-configuration LocationConstraint="${AWS_REGION}"
  fi
echo "[INFO] Bucket created: ${BACKEND_BUCKET}"

# ----- Enabling versioning -----
echo "[INFO] Enabling versioning on the bucket"
aws s3api put-bucket-versioning \
  --bucket "${BACKEND_BUCKET}" \
  --versioning-configuration Status=Enabled

# ----- Create Dynamo Lock Table -----
echo "[INFO] Creating DynamoDB table: ${BACKEND_DYNAMODB_TABLE}"
if aws dynamodb describe-table --table-name "${BACKEND_DYNAMODB_TABLE}" --region "${AWS_REGION}" 2>/dev/null; then
  echo "[INFO] DynamoDB table already exists: ${BACKEND_DYNAMODB_TABLE}"
else
  aws dynamodb create-table \
    --table-name "${BACKEND_DYNAMODB_TABLE}" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "${AWS_REGION}"
  echo "[INFO] DynamoDB table created: ${BACKEND_DYNAMODB_TABLE}"
fi

echo "[INFO] Backend ready with bucket: ${BACKEND_BUCKET} and table: ${BACKEND_DYNAMODB_TABLE}"