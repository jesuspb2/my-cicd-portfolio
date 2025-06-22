variable "app_name" {}
variable "aws_account_id" {}
variable "environment" {}
variable "aws_region" {}
variable "lambda_image_uri" {
  type        = string
  description = "URI of the Docker image published in ECR"
}