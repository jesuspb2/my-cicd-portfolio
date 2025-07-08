include {
  path = find_in_parent_folders()
}

locals {
  app_name               = get_env("APP_NAME")
  environment            = get_env("ENV")
  aws_region             = get_env("AWS_REGION")
  aws_account_id         = get_env("AWS_ACCOUNT_ID")
  dynamodb_table_name    = get_env("DYNAMODB_TABLE_NAME")
}

inputs = {
  aws_region          = local.aws_region
  app_name            = local.app_name
  environment         = local.environment
  dynamodb_table_name = local.dynamodb_table_name
}
