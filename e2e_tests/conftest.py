import os
import pytest


VALID_CASES = [
    ("Alice", "alice@example.com", "Hello from Alice!"),
    ("Bob",   "bob@example.com",   "Testing the form"),
]

INVALID_CASES = [
                # name            emaiL                message       invalid_css
    pytest.param("",      "alice@example.com", "Hi!",        "#name",    id="missing_name"),
    pytest.param("Bob",   "",                  "Testing...", "#email",   id="missing_email"),
    pytest.param("Alice", "alice@example.com", "",           "#message", id="missing_message"),
    pytest.param("",      "",                  "",           "#name",    id="all_missing"),
]

DOMAIN_NAME = os.getenv('DOMAIN_NAME')
APP_URL = f"https://{DOMAIN_NAME}"

class ContactFormBase:
    """Base class for handling contact form interactions in e2e tests."""

    @staticmethod
    def open_contact_form(page):
        page.goto(APP_URL)
        page.click("//button[text()='Contact']")

    @staticmethod
    def fill_fields(page, name, email, message):
        page.fill("#name", name)
        page.fill("#email", email)
        page.fill("#message", message)

    @staticmethod
    def submit(page):
        page.click("button[type='submit']")

    @staticmethod
    def validate_fields(page, name, email, message):
        assert page.input_value("#name") == name
        assert page.input_value("#email") == email
        assert page.input_value("#message") == message
    
    @staticmethod
    def assert_success_message(page):
        success_selector = "//p[text()='Message sent successfully!']"
        page.wait_for_selector(success_selector)
        assert page.is_visible(success_selector), "Success message should be visible after form submission"

    @staticmethod
    def assert_invalid_fields(page, invalid_css):
        invalid_el = page.locator(invalid_css)
        assert invalid_el.evaluate("el => !el.validity.valid")
        assert invalid_el.evaluate("el => el.validationMessage !== ''")


@pytest.fixture
def page(page):
    """Extend the built-in page fixture without re-launching the browser."""
    page.set_default_timeout(3000)
    return page