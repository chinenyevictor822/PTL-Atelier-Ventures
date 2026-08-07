import os
from playwright.sync_api import sync_playwright

def run_verification():
    current_dir = os.getcwd()
    homepage_path = f"file://{current_dir}/index.html"
    design_system_path = f"file://{current_dir}/design-system.html"

    print(f"Loading Homepage: {homepage_path}")
    print(f"Loading Design System: {design_system_path}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- DESKTOP VIEWPORT ---
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # 1. Load Homepage
        page.goto(homepage_path)
        page.wait_for_timeout(1000) # Wait for transitions

        # Take desktop light theme screenshot of homepage hero
        page.screenshot(path="verification/homepage_desktop_light.png")
        print("Captured Desktop Homepage Light Theme screenshot.")

        # Click theme toggle to verify dark theme
        theme_toggle = page.locator("#themeToggle")
        theme_toggle.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/homepage_desktop_dark.png")
        print("Captured Desktop Homepage Dark Theme screenshot.")

        # Scroll to services preview
        services_section = page.locator("#services")
        services_section.scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="verification/homepage_desktop_services.png")
        print("Captured Desktop Homepage Services screenshot.")

        # Test overlay menu click
        menu_btn = page.locator("#menuToggle")
        menu_btn.click()
        page.wait_for_timeout(1000)

        # Hover first navigation link to test hover blueprint image preview
        atelier_link = page.locator("text=01 The Atelier")
        atelier_link.hover()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/homepage_desktop_overlay.png")
        print("Captured Desktop Homepage Overlay Preview screenshot.")

        # Close overlay
        close_btn = page.locator("#menuClose")
        close_btn.click()
        page.wait_for_timeout(500)

        # --- MOBILE VIEWPORT ---
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto(homepage_path)
        mobile_page.wait_for_timeout(1000)

        # Capture mobile light theme screenshot of homepage hero
        mobile_page.screenshot(path="verification/homepage_mobile_light.png")
        print("Captured Mobile Homepage Light Theme screenshot.")

        # Toggle theme on mobile
        mobile_theme_toggle = mobile_page.locator("#themeToggle")
        mobile_theme_toggle.click()
        mobile_page.wait_for_timeout(1000)

        # Scroll down to process preview on mobile to verify responsive column alignment
        process_section = mobile_page.locator("#process")
        process_section.scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(800)
        mobile_page.screenshot(path="verification/homepage_mobile_process.png")
        print("Captured Mobile Homepage Process screenshot (dark mode).")

        # Close browser
        browser.close()

if __name__ == "__main__":
    run_verification()
