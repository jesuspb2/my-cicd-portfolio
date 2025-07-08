import json
import pytest
from backend.src.app import handler


@pytest.mark.parametrize("name, email, message", [
    ("John Doe", "john@example.com", "Hello there!"),
    ("Jane Smith", "jane@example.com", "How are you?"),
    ("Alice Johnson", "alice@example.com", "I'm doing well, thank you!")
])
def test_handler_success(dynamodb_table, name, email, message):
    event = {
        "body": json.dumps({
            "name": name,
            "email": email,
            "message": message
        })
    }

    response = handler(event, None)

    assert response["statusCode"] == 200
    body = json.loads(response["body"])
    assert body["message"] == "Message stored successfully!"

    # check if the item was really stored
    items = dynamodb_table.scan()["Items"]
    assert len(items) == 1
    assert items[0]["name"] == name
    assert items[0]["email"] == email
    assert items[0]["message"] == message


@pytest.mark.parametrize("name, email, message", [
    ("", "john@example.com", "Hello there!"),
    ("Jane Smith", "", "How are you?"),
    ("Alice Johnson", "alice@example.com", ""),
    ("", "", "")
])
def test_handler_missing_fields(dynamodb_table, name, email, message):
    event = {
        "body": json.dumps({
            "name": name,
            "email": email,
            "message": message
        })
    }

    response = handler(event, None)

    assert response["statusCode"] == 400
    body = json.loads(response["body"])
    assert "Missing required fields" in body["error"]


@pytest.mark.parametrize("email", [
    "invalid-email",
    "john@invalid-email",
    "@invalid-email.com"
])
def test_handler_invalid_email(dynamodb_table, email):
    event = {
        "body": json.dumps({
            "name": "John Doe",
            "email": email,
            "message": "Hello there!"
        })
    }

    response = handler(event, None)

    assert response["statusCode"] == 400
    body = json.loads(response["body"])
    assert "Invalid email" in body["error"]


@pytest.mark.parametrize("name", [
    "1234567890",
    "John Doe1234567890",
    "John Doe@!$%^&*()",
])
def test_handler_invalid_name(dynamodb_table, name):
    event = {
        "body": json.dumps({
            "name": name,
            "email": "john@example.com",
            "message": "Hello there!"
        })
    }

    response = handler(event, None)

    assert response["statusCode"] == 400
    body = json.loads(response["body"])
    assert "Invalid name" in body["error"]

