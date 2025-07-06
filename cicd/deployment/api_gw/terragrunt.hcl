include {
  path = find_in_parent_folders()
}

dependency "acm" {
  config_path = "../acm"
}

locals {
  domain_api = get_env("DOMAIN_API_NAME")
}

inputs = {
  api_certificate_arn = dependency.acm.outputs.api_certificate_arn
  domain_api     = local.domain_api
}
