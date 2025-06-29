# zone
data "aws_route53_zone" "selected" {
  name         = var.domain_name
  private_zone = false
}

# apex A
data "aws_route53_records" "apex_a" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^${replace(var.domain_name, ".", "\\.")}$"
  type       = "A"
}

# apex AAAA
data "aws_route53_records" "apex_aaaa" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^${replace(var.domain_name, ".", "\\.")}$"
  type       = "AAAA"
}

# www A
data "aws_route53_records" "www_a" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^www\\.${replace(var.domain_name, ".", "\\.")}$"
  type       = "A"
}

# www AAAA
data "aws_route53_records" "www_aaaa" {
  zone_id    = data.aws_route53_zone.selected.zone_id
  name_regex = "^www\\.${replace(var.domain_name, ".", "\\.")}$"
  type       = "AAAA"
}


resource "aws_route53_record" "apex_a" {
  count  = length(data.aws_route53_records.apex_a.resource_record_sets) > 0 ? 0 : 1
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
  count  = length(data.aws_route53_records.apex_aaaa.resource_record_sets) > 0 ? 0 : 1
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
  count  = length(data.aws_route53_records.www_a.resource_record_sets) > 0 ? 0 : 1
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
  count  = length(data.aws_route53_records.www_aaaa.resource_record_sets) > 0 ? 0 : 1
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_zone_id
    evaluate_target_health = true
  }
}
