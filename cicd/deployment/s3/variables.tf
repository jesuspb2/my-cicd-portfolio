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