variable "bucket_name" {
  type        = string
}

variable "app_name" {
  type        = string
}

variable "environment" {
  type        = string
}

variable "versioning_enabled" {
  type        = bool
  default     = true
}

variable "cloudfront_distribution_arn" {
  description = "The ARN of the CloudFront distribution that can access this bucket"
  type        = string
}
