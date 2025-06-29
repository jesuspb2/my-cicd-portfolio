include {
  path = find_in_parent_folders()
}

dependency "acm" {
  config_path = "../acm"
}

locals {
  app         = get_env("APP_NAME")
  region      = get_env("AWS_REGION")
  bucket_name = get_env("BUCKET_FRONT")
  domain_name = get_env("DOMAIN_NAME")
}

inputs = {
  app_name        = local.app
  bucket_name     = local.bucket_name
  aws_region      = local.region
  domain_name     = local.domain_name
  certificate_arn = dependency.acm.outputs.certificate_arn
}
