variable "app_name" {
  type        = string
  description = "App name"
}

variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
}

variable "environment" {
  type        = string
  description = "Environment"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
}
variable "lambda_image_uri" {
  type        = string
  description = "URI of the Docker image published in ECR"
}

variable "from_email" {
  type        = string
  description = "Email address to send from"
}

variable "to_email" {
  type        = string
  description = "Email address to send to"
}

variable "domain_name" {
  type        = string
  description = "Domain name"
}

variable "api_gateway_id" {
  type        = string
  description = "API Gateway ID"
}