output "certificate_arn" {
  description = "ARN of the validated ACM certificate"
  value       = aws_acm_certificate.this.arn
}

output "api_certificate_arn" {
  description = "ARN of the API ACM certificate"
  value       = aws_acm_certificate.api_cert.arn
}