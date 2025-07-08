import os
import pytest
from unittest import mock
from moto import mock_aws
import boto3

table_name = "test-table"
region_name = "eu-central-1"

@pytest.fixture
def dynamodb_table():
    with mock_aws():
        ddb = boto3.resource("dynamodb", region_name=region_name)
        table = ddb.create_table(
            TableName=table_name,
            KeySchema=[
                {"AttributeName": "id", "KeyType": "HASH"}
            ],
            AttributeDefinitions=[
                {"AttributeName": "id", "AttributeType": "S"}
            ],
            BillingMode="PAY_PER_REQUEST"
        )
        table.wait_until_exists()
        
        # patch environment variable
        with mock.patch.dict(os.environ, {"DDB_TABLE": table_name, "AWS_REGION": region_name}):
            yield table