variable "domain_name" {
  description = "The domain name to secure with ACM"
  type        = string
}

variable "app_name" {
  description = "The application name"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, prd, etc)"
  type        = string
}

variable "hosted_zone_id" {
  description = "The ID of the hosted zone where validation records will be created"
  type        = string
}
