#!/bin/bash
set -e
export PAGER=

# ----- Create S3 backend for Terraform -----
echo "[INFO] Creating S3 bucket: ${backend_bucket}"
if aws s3api head-bucket --bucket "${backend_bucket}" 2>/dev/null; then
  echo "[INFO] Bucket already exists: ${backend_bucket}"
else
  aws s3api create-bucket \
    --bucket "${backend_bucket}" \
    --region "${aws_region}" \
    --create-bucket-configuration LocationConstraint="${aws_region}"
  fi
echo "[INFO] Bucket created: ${backend_bucket}"

# ----- Enabling versioning -----
echo "[INFO] Enabling versioning on the bucket"
aws s3api put-bucket-versioning \
  --bucket "${backend_bucket}" \
  --versioning-configuration Status=Enabled

# ----- Create Dynamo Lock Table -----
echo "[INFO] Creating DynamoDB table: ${backend_dynamodb_table}"
if aws dynamodb describe-table --table-name "${backend_dynamodb_table}" --region "${aws_region}" 2>/dev/null; then
  echo "[INFO] DynamoDB table already exists: ${backend_dynamodb_table}"
else
  aws dynamodb create-table \
    --table-name "${backend_dynamodb_table}" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "${aws_region}"
  echo "[INFO] DynamoDB table created: ${backend_dynamodb_table}"
fi

echo "[INFO] Backend ready with bucket: ${backend_bucket} and table: ${backend_dynamodb_table}"
