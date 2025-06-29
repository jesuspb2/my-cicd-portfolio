include {
  path = find_in_parent_folders()
}

dependency "route53" {
  config_path = "../route53"
}

dependency "cloudfront" {
  config_path = "../cloudfront"
}

locals {
  domain = get_env("DOMAIN_NAME")
}

inputs = {
  zone_id                = dependency.route53.outputs.zone_id
  domain_name            = local.domain
  cloudfront_domain_name = dependency.cloudfront.outputs.cloudfront_domain_name
  cloudfront_zone_id     = dependency.cloudfront.outputs.cloudfront_hosted_zone_id
}
