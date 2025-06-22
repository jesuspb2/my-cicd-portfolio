output "bucket_name" {
  value       = aws_s3_bucket.this.id
  description = "Name of the S3 bucket"
}

output "bucket_arn" {
  value       = aws_s3_bucket.this.arn
  description = "ARN of the S3 bucket"
}

output "bucket_domain_name" {
  value       = aws_s3_bucket.this.bucket_domain_name
  description = "Public DNS name of the bucket"
}
