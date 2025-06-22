include {
  path = find_in_parent_folders()
}

locals {
  app_name       = get_env("APP_NAME")
  environment    = get_env("ENV")
  aws_region     = get_env("AWS_REGION")
  aws_account_id = get_env("AWS_ACCOUNT_ID")
  ecr_url        = get_env("ECR_URL", "")
  image_tag      = get_env("IMAGE_TAG", "")

  lambda_image_uri = "${local.ecr_url}:${local.image_tag}"
}

inputs = {
  lambda_image_uri = local.lambda_image_uri
}
