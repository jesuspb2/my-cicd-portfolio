include {
  path = find_in_parent_folders()
}

locals {
  env         = get_env("ENV")
  app         = get_env("APP_NAME")
  region      = get_env("AWS_REGION")
  bucket_name = get_env("BUCKET_FRONT")
}

inputs = {
  bucket_name        = local.bucket_name
  environment        = local.env
  app_name           = local.app
  versioning_enabled = true
  allow_public_read  = true
}
