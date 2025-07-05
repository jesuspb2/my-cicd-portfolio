import json
import boto3
import os

SES_REGION = os.getenv("SES_REGION")
FROM_EMAIL = os.getenv("FROM_EMAIL")
TO_EMAIL = os.getenv("TO_EMAIL")

ses = boto3.client("ses", region_name=SES_REGION)

def handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        name = body.get("name")
        email = body.get("email")
        message = body.get("message")

        if not name or not email or not message:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing required fields"})
            }

        if len(name) > 20:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Name must be less than 20 characters"})
            }

        ses.send_email(
            Source=FROM_EMAIL,
            Destination={"ToAddresses": [TO_EMAIL]},
            Message={
                "Subject": {"Data": f"New message from {name}"},
                "Body": {
                    "Text": {
                        "Data": f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
                    }
                }
            }
        )

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            "body": json.dumps({"message": "Email sent successfully!"})
        }

    except Exception as e:
        print("Error:", e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
