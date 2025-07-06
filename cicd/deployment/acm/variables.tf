variable "domain_name" {
  description = "Domain to secure with ACM"
  type        = string
}

variable "app_name" {
  description = "App name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "hosted_zone_id" {
  description = "Hosted zone ID for validation"
  type        = string
}

variable "domain_api" {
  description = "Domain for API Gateway"
  type        = string
}