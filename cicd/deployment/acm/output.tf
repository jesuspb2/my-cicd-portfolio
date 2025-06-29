output "certificate_arn" {
  value = data.aws_acm_certificate.existing.arn != "" ? data.aws_acm_certificate.existing.arn : aws_acm_certificate_validation.this[0].certificate_arn
}