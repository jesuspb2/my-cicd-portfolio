import pytest
from e2e_tests.conftest import INVALID_CASES, VALID_CASES, ContactFormBase

contact_form_base = ContactFormBase()

# POSITIVE TESTS
@pytest.mark.parametrize("name, email, message", VALID_CASES)
def test_form_submission(page, browser_name, name, email, message):
    print(f"Running on browser: {browser_name}")
    
    contact_form_base.open_contact_form(page)
    contact_form_base.fill_fields(page, name, email, message)
    contact_form_base.validate_fields(page, name, email, message)
    contact_form_base.submit(page)
    contact_form_base.assert_success_message(page)
    
# NEGATIVE TESTS
@pytest.mark.parametrize("name, email, message, invalid_css", INVALID_CASES)
def test_handler_missing_fields(page, browser_name, name, email, message, invalid_css):
    print(f"Running on browser: {browser_name}")

    contact_form_base.open_contact_form(page)
    contact_form_base.fill_fields(page, name, email, message)
    contact_form_base.submit(page)
    contact_form_base.assert_invalid_fields(page, invalid_css)