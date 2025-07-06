include {
  path = find_in_parent_folders()
}

dependency "api_gw" {
  config_path = "../api_gw"
}

locals {
  app_name       = get_env("APP_NAME")
  environment    = get_env("ENV")
  aws_region     = get_env("AWS_REGION")
  aws_account_id = get_env("AWS_ACCOUNT_ID")
  ecr_url        = get_env("ECR_URL", "")
  image_tag      = get_env("IMAGE_TAG", "")
  from_email     = get_env("FROM_EMAIL")
  to_email       = get_env("TO_EMAIL")
  domain_name    = get_env("DOMAIN_NAME")
  lambda_image_uri = "${local.ecr_url}:${local.image_tag}"
}

inputs = {
  lambda_image_uri = local.lambda_image_uri
  domain_name      = local.domain_name
  api_gateway_id   = dependency.api_gw.outputs.api_gateway_id
}
