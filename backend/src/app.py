import json
import regex
import re
import boto3
import os
import uuid
from datetime import datetime, timezone


def handler(event, context):
    try:
        dynamodb = boto3.resource("dynamodb", region_name=os.getenv("AWS_REGION"))
        table = dynamodb.Table(os.getenv("DDB_TABLE"))
        body = json.loads(event.get("body", "{}"))
        name = body.get("name")
        email = body.get("email")
        message = body.get("message")

        if not name or not email or not message:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing required fields"})
            }

        if not regex.match(r"^[\p{L}\s'-]+$", name):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Invalid name"})
            }

        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Invalid email"})
            }

        # build the item to store
        item = {
            "id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "message": message,
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        # put the item into DynamoDB
        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            "body": json.dumps({"message": "Message stored successfully!"})
        }

    except Exception as e:
        print("Error:", e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }