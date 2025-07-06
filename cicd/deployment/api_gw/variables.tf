variable "app_name" {
    type = string
    description = "The name of the application"
}
variable "environment" {
    type = string
    description = "The environment for the application"
}
variable "domain_api" {
    type = string
    description = "The name of the API domain"
}
variable "api_certificate_arn" {
    type = string
    description = "The ARN of the API ACM certificate"
}
variable "zone_id" {
  description = "The Route53 hosted zone ID for the domain"
  type        = string
}

