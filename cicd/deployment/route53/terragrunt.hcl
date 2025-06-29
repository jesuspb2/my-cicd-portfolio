include {
  path = find_in_parent_folders()
}

locals {
  app_name   = get_env("APP_NAME")
  env        = get_env("ENV")
  domain     = get_env("DOMAIN_NAME")
}

inputs = {
  domain_name = local.domain
  app_name    = local.app_name
  environment = local.env
}