data "aws_route53_record" "apex_a_existing" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"
}

data "aws_route53_record" "apex_aaaa_existing" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "AAAA"
}

data "aws_route53_record" "www_a_existing" {
  zone_id = var.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
}

data "aws_route53_record" "www_aaaa_existing" {
  zone_id = var.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"
}

resource "aws_route53_record" "apex_a" {
  count = data.aws_route53_record.apex_a_existing.fqdn != "" ? 0 : 1

  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "apex_aaaa" {
  count = data.aws_route53_record.apex_aaaa_existing.fqdn != "" ? 0 : 1

  zone_id = var.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www_a" {
  count = data.aws_route53_record.www_a_existing.fqdn != "" ? 0 : 1

  zone_id = var.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www_aaaa" {
  count = data.aws_route53_record.www_aaaa_existing.fqdn != "" ? 0 : 1

  zone_id = var.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}
