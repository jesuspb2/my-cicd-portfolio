output "api_gateway_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
  description = "HTTP API endpoint"
  sensitive   = true
}

output "api_gateway_id" {
  value = aws_apigatewayv2_api.http_api.id
  description = "HTTP API ID"
}