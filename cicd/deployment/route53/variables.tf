variable "domain_name" {
  description = "The domain to manage in Route53 (e.g. jprianbaena.com)"
  type        = string
}

variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "environment" {
  description = "Environment name, for example dev, prod"
  type        = string
}