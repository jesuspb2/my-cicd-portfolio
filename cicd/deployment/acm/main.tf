provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

data "aws_acm_certificate" "existing" {
  provider    = aws.virginia
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}

resource "aws_acm_certificate" "this" {
  provider = aws.virginia
  count    = data.aws_acm_certificate.existing.arn != "" ? 0 : 1

  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-certificate"
    Environment = var.environment
    Application = var.app_name
  }
}

resource "aws_route53_record" "validation" {
  for_each = (
    length(aws_acm_certificate.this) > 0 ?
    {
      for dvo in aws_acm_certificate.this[0].domain_validation_options : dvo.domain_name => {
        name  = dvo.resource_record_name
        type  = dvo.resource_record_type
        value = dvo.resource_record_value
      }
    }
    :
    {}
  )

  zone_id = var.hosted_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.value]
}

resource "aws_acm_certificate_validation" "this" {
  provider  = aws.virginia
  count     = length(aws_acm_certificate.this) > 0 ? 1 : 0

  certificate_arn = aws_acm_certificate.this[0].arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]

  timeouts {
    create = "5m"
  }
}