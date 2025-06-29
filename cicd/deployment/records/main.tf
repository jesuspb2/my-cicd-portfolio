# zone
data "aws_route53_zone" "selected" {
  name         = var.domain_name
  private_zone = false
}

data "aws_route53_records" "apex" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^${replace(var.domain_name, ".", "\\.")}$"
}

data "aws_route53_records" "www" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^www\\.${replace(var.domain_name, ".", "\\.")}$"
}


resource "aws_route53_record" "apex_a" {
  count  = length(data.aws_route53_records.apex.resource_record_sets) > 0 ? 0 : 1
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "apex_aaaa" {
  count  = length(data.aws_route53_records.apex.resource_record_sets) > 0 ? 0 : 1
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = var.domain_name
  type    = "AAAA"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www_a" {
  count  = length(data.aws_route53_records.www.resource_record_sets) > 0 ? 0 : 1
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www_aaaa" {
  count  = length(data.aws_route53_records.www.resource_record_sets) > 0 ? 0 : 1
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}
