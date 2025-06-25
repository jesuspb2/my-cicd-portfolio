output "cloudfront_distribution_arn" {
  value = aws_cloudfront_distribution.this.arn
}

output "distribution_id" {
  value = aws_cloudfront_distribution.this.id
}