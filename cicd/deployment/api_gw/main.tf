resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.environment}-${var.app_name}"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.environment}-${var.app_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_api_gateway_domain_name" "this" {
  domain_name              = var.domain_api
  regional_certificate_arn = var.api_certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  security_policy = "TLS_1_2"
}

resource "aws_apigatewayv2_api_mapping" "this" {
  api_id      = aws_apigatewayv2_api.http_api.id
  domain_name = aws_api_gateway_domain_name.this.domain_name
  stage       = aws_apigatewayv2_stage.default.name
}

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = var.domain_api
  type    = "A"

  alias {
    name                   = aws_api_gateway_domain_name.this.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.this.regional_zone_id
    evaluate_target_health = false
  }
}
