resource "aws_iam_role" "lambda_role" {
  name = "${var.environment}-${var.app_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  description = "${title(var.app_name)} Policy"
  name        = "${var.environment}-${var.app_name}-policy"
  path        = "/${var.app_name}/"
  policy      = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "LoggingPermissions",
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": [
          "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:*"
        ]
      },
      {
        "Sid": "DynamoDBWriteAccess",
        "Effect": "Allow",
        "Action": [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:BatchWriteItem"
        ],
        "Resource": "arn:aws:dynamodb:${var.aws_region}:${var.aws_account_id}:table/${var.dynamodb_table_name}"
      }
    ]
  }
  EOF
}

resource "aws_iam_role_policy_attachment" "custom_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}


resource "aws_lambda_function" "lambda" {
  function_name = "${var.environment}-${var.app_name}"
  role          = aws_iam_role.lambda_role.arn

  package_type  = "Image"
  image_uri     = "${var.lambda_image_uri}"

  environment {
    variables = {
      FROM_EMAIL = var.from_email
      TO_EMAIL   = var.to_email
      SES_REGION = var.aws_region
    }
  }

  tags = {
    App = var.app_name
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = var.api_gateway_id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.lambda.invoke_arn
  integration_method = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "post_route" {
  api_id    = var.api_gateway_id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

