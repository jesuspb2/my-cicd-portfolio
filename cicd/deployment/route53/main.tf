resource "aws_route53_zone" "this" {
  name  = var.domain_name
  tags = {
    Name = "${var.environment}-${var.app_name}-zone"
  }
}
