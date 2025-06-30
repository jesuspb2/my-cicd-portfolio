data "aws_route53_zone" "existing" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_zone" "this" {
  count = length(data.aws_route53_zone.existing.zone_id) == 0 ? 1 : 0
  name  = var.domain_name
  tags = {
    Name = "${var.app_name}-${var.environment}-zone"
  }
}
