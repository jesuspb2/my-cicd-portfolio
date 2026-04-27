variable "redirect_domain" {
  description = "Domain to redirect from (e.g. jprianbaena.com)"
  type        = string
}

variable "target_domain" {
  description = "Domain to redirect to (e.g. jesuspb.dev)"
  type        = string
}

variable "app_name" {
  description = "Application name for resource tagging"
  type        = string
}

variable "env" {
  description = "Environment name"
  type        = string
}
