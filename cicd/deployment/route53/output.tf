output "zone_id" {
  value = length(data.aws_route53_zone.existing.zone_id) > 0 ? data.aws_route53_zone.existing.zone_id : aws_route53_zone.this[0].zone_id
}