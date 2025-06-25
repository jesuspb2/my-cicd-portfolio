include {
  path = find_in_parent_folders()
}

locals {
  app    = get_env("APP_NAME")
  region = get_env("AWS_REGION")
  bucket_name = get_env("BUCKET_FRONT")
}

inputs = {
  app_name    = local.app
  bucket_name = local.bucket_name
  aws_region  = local.region
}
