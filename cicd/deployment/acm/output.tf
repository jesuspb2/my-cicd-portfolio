output "certificate_arn" {
  description = "ARN of the validated ACM certificate"
  value       = aws_acm_certificate.this.arn
}