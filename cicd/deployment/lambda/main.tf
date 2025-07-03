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
      "Sid": "SendEmailPermissions",
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "arn:aws:ses:${var.aws_region}:${var.aws_account_id}:identity/*"
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

