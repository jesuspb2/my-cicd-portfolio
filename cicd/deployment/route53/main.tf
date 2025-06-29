resource "aws_route53_zone" "this" {
  name = var.domain_name

  comment = "Hosted zone for ${var.app_name} (${var.environment})"

  tags = {
    Name        = "${var.app_name}-${var.environment}-zone"
    Environment = var.environment
    Application = var.app_name
  }
}