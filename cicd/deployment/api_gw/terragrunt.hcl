include {
  path = find_in_parent_folders()
}

dependency "acm" {
  config_path = "../acm"

  mock_outputs = {
    api_certificate_arn = "arn:aws:acm:us-east-1:000000000000:certificate/mock"
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
  domain_api = get_env("DOMAIN_API_NAME")
}

inputs = {
  api_certificate_arn = dependency.acm.outputs.api_certificate_arn
  domain_api          = local.domain_api
  zone_id             = dependency.route53.outputs.zone_id
}
