variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "app_name" {
  type        = string
  description = "Application name"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "dynamodb_table_name" {
  type        = string
  description = "Name of the DynamoDB table"
}
