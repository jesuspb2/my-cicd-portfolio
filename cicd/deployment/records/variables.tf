variable "zone_id" {
  description = "ID of the hosted zone"
  type        = string
}

variable "domain_name" {
  description = "Root domain"
  type        = string
}

variable "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  type        = string
}

variable "cloudfront_zone_id" {
  description = "CloudFront hosted zone ID"
  type        = string
}
