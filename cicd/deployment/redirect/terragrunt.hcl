include {
  path = find_in_parent_folders()
}

inputs = {
  app_name        = get_env("APP_NAME")
  env             = get_env("ENV")
  redirect_domain = "jprianbaena.com"
  target_domain   = "jesuspb.dev"
}
