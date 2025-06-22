locals {
  app_name               = get_env("APP_NAME")
  aws_region             = get_env("AWS_REGION")
  backend_bucket         = get_env("BACKEND_BUCKET")
  backend_dynamodb_table = get_env("BACKEND_DYNAMODB_TABLE")
  environment            = get_env("ENV")
  aws_account_id         = get_env("AWS_ACCOUNT_ID")
  ecr_url                = get_env("ECR_URL", "")
  image_tag              = get_env("IMAGE_TAG", "")
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket         = local.backend_bucket
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    dynamodb_table = local.backend_dynamodb_table
    encrypt        = true
  }
}

generate "provider" {
  path = "providers.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "${local.aws_region}"
}
EOF
}

terraform {
  source = "${path_relative_from_include()}"
}

inputs = {
  app_name       = local.app_name
  environment    = local.environment
  aws_region     = local.aws_region
  aws_account_id = get_env("AWS_ACCOUNT_ID")
}

