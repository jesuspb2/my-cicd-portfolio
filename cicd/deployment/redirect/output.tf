output "nameservers" {
  value       = aws_route53_zone.redirect.name_servers
  description = "NS records — update these at your domain registrar for jprianbaena.com"
}

output "cloudfront_domain" {
  value       = aws_cloudfront_distribution.redirect.domain_name
  description = "CloudFront distribution domain name"
}
