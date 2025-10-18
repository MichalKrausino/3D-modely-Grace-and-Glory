from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.wait_for_timeout(5000)

        # Go to the dashboard
        page.goto("http://localhost:3000/")
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()

        # Check for the Google Calendar button
        expect(page.get_by_role("link", name="Connect to Google Calendar")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/dashboard.png")

        browser.close()

if __name__ == "__main__":
    run_verification()