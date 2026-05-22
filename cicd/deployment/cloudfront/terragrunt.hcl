include {
  path = find_in_parent_folders()
}

dependency "acm" {
  config_path = "../acm"

  mock_outputs = {
    certificate_arn = "arn:aws:acm:us-east-1:000000000000:certificate/mock"
  }
  mock_outputs_allowed_terraform_commands = ["destroy"]
}

dependency "route53" {
  config_path = "../route53"

  mock_outputs = {
    zone_id = "MOCKZONEID"
  }
  mock_outputs_allowed_terraform_commands = ["destroy"]
}

locals {
  app         = get_env("APP_NAME")
  region      = get_env("AWS_REGION")
  bucket_name = get_env("BUCKET_FRONT")
  domain_name = get_env("DOMAIN_NAME")
}

inputs = {
  app_name        = local.app
  env             = get_env("ENV")
  bucket_name     = local.bucket_name
  aws_region      = local.region
  domain_name     = local.domain_name
  certificate_arn = dependency.acm.outputs.certificate_arn
  zone_id         = dependency.route53.outputs.zone_id
}
