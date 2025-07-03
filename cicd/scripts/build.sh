#!/bin/bash -e

echo "[INFO] Building and pushing Docker image to ECR"

export IMAGE_TAG="build-$(date +%s)"
export ECR_URL="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ENV}-${APP_NAME}"

aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

docker buildx build --platform linux/amd64 --provenance=false -t "${ENV}-${APP_NAME}" ./backend
docker tag "${ENV}-${APP_NAME}" "${ECR_URL}:${IMAGE_TAG}"
docker push "${ECR_URL}:${IMAGE_TAG}"

echo "[INFO] Docker image pushed: ${ECR_URL}:${IMAGE_TAG}"

# ---------- expose outputs to later jobs ----------
{
  echo "IMAGE_TAG=${IMAGE_TAG}"
  echo "ECR_URL=${ECR_URL}"
} >> "$GITHUB_OUTPUT"