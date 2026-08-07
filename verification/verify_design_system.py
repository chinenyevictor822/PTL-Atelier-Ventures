import os
from playwright.sync_api import sync_playwright

def run_verification():
    # Find absolute path of index.html
    current_dir = os.getcwd()
    html_path = f"file://{current_dir}/index.html"
    print(f"Loading page: {html_path}")

    with sync_playwright() as p:
        # Launch headless browser
        browser = p.chromium.launch(headless=True)
        # Configure a luxury desktop viewport (1280x900)
        page = browser.new_page(viewport={"width": 1280, "height": 900})

        # 1. Load the Living Style Guide Showcase
        page.goto(html_path)
        page.wait_for_timeout(1000) # Wait for transitions

        # Capture light mode screenshot (Top half of Design System)
        page.screenshot(path="verification/light_theme_showcase.png")
        print("Captured Light Mode screenshot.")

        # Scroll to section 4 (reusable cards & components)
        cards_section = page.locator("#cards")
        cards_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification/light_theme_components.png")
        print("Captured Light Mode components screenshot.")

        # 2. Toggle dark mode theme
        theme_toggle = page.locator("#themeToggle")
        theme_toggle.click()
        page.wait_for_timeout(1000) # Wait for theme swap transition

        # Go back to top
        page.locator("header").scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification/dark_theme_showcase.png")
        print("Captured Dark Mode screenshot.")

        # Test navigation overlay menu click
        menu_btn = page.locator("#menuToggle")
        menu_btn.click()
        page.wait_for_timeout(1000) # Wait for overlay menu transition

        # Take screenshot of active overlay navigation system
        page.screenshot(path="verification/nav_overlay_active.png")
        print("Captured Overlay Menu screenshot.")

        # Hover first navigation link to test hover blueprint image preview
        atelier_link = page.locator("text=01 Atelier")
        atelier_link.hover()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/nav_overlay_hover_preview.png")
        print("Captured Hover Blueprint Preview screenshot.")

        # Close menu
        close_btn = page.locator("#menuClose")
        close_btn.click()
        page.wait_for_timeout(500)

        browser.close()

if __name__ == "__main__":
    run_verification()
