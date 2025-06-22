echo "[INFO] Building and pushing Docker image to ECR"

export new_tag="build-$(date +%s)"
export ecr_url="${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com/${env}-${app_name}"

aws ecr get-login-password --region "${aws_region}" | docker login --username AWS --password-stdin "${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com"

docker buildx build --platform linux/amd64 --provenance=false -t "${env}-${app_name}" ./backend
docker tag "${env}-${app_name}" "${ecr_url}:${new_tag}"
docker push "${ecr_url}:${new_tag}"

echo "[INFO] Docker image pushed: ${ecr_url}:${new_tag}"