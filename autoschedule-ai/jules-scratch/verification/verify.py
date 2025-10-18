from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.wait_for_timeout(5000)

        # Go to the dashboard
        page.goto("http://localhost:3000/")
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()

        # Go to add task page
        page.get_by_role("link", name="Add New Task").click()
        expect(page.get_by_role("heading", name="Create a new task")).to_be_visible()

        # Fill out the form
        page.get_by_label("Task Name").fill("My new test task")
        page.get_by_label("Duration (in minutes)").fill("30")
        page.get_by_role("button", name="Select a category").click()
        page.get_by_role("option", name="Work").click()
        page.get_by_role("button", name="Add Task").click()

        # Check for success message
        expect(page.get_by_text("Task added successfully!")).to_be_visible()

        # Go back to dashboard and verify task
        page.goto("http://localhost:3000/")
        expect(page.get_by_role("heading", name="My new test task")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/dashboard.png")

        # Go to stats page and verify
        page.get_by_role("link", name="Stats").click()
        expect(page.get_by_role("heading", name="Statistics")).to_be_visible()
        expect(page.get_by_text("1")).to_be_visible() # Total tasks
        page.screenshot(path="jules-scratch/verification/stats.png")

        browser.close()

if __name__ == "__main__":
    run_verification()