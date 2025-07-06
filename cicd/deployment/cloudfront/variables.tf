variable "app_name" {
  description = "Application name."
  type        = string
}

variable "bucket_name" {
  description = "Name of the S3 bucket."
  type        = string
}

variable "aws_region" {
  description = "AWS region."
  type        = string
}

variable "domain_name" {
  description = "Domain name for the CloudFront distribution."
  type        = string
}

variable "certificate_arn" {
  description = "ARN of the ACM certificate to use for HTTPS."
  type        = string
}

variable "env" {
  description = "Environment"
  type        = string
}
