import os
from playwright.sync_api import sync_playwright

def run_about_verification():
    current_dir = os.getcwd()
    about_path = f"file://{current_dir}/about.html"

    print(f"Loading About Page: {about_path}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- DESKTOP VIEWPORT ---
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(about_path)
        page.wait_for_timeout(1000) # Wait for initial reveals & transition mechanics

        # 1. Desktop Light Theme - Hero & Company Story
        page.screenshot(path="verification/about_desktop_light_hero.png")
        print("Captured Desktop About Page Light Theme Hero screenshot.")

        # Scroll to Pillars section
        page.locator("text=The Four Architectural Pillars").scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="verification/about_desktop_light_pillars.png")
        print("Captured Desktop About Page Pillars screenshot.")

        # Scroll to Guild Council section
        page.locator("text=Leaders & Master Craftsmen").scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="verification/about_desktop_light_team.png")
        print("Captured Desktop About Page Team screenshot.")

        # Scroll to Material Excellence
        page.locator("text=The Natural Library").scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="verification/about_desktop_light_materials.png")
        print("Captured Desktop About Page Materials Sourcing screenshot.")

        # Test Dark Theme Toggle
        theme_toggle = page.locator("#themeToggle")
        theme_toggle.click()
        page.wait_for_timeout(1000)

        # Scroll up to story in dark mode
        page.locator("text=Our Journey, Mission, and Spatial Vision").scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="verification/about_desktop_dark_story.png")
        print("Captured Desktop About Page Dark Theme Story screenshot.")

        # --- MOBILE VIEWPORT ---
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto(about_path)
        mobile_page.wait_for_timeout(1000)

        # 1. Mobile Light Theme Hero
        mobile_page.screenshot(path="verification/about_mobile_light_hero.png")
        print("Captured Mobile About Page Light Theme Hero screenshot.")

        # Scroll down to team on mobile (responsive stacking check)
        mobile_page.locator("text=Leaders & Master Craftsmen").scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(800)
        mobile_page.screenshot(path="verification/about_mobile_light_team.png")
        print("Captured Mobile About Page Team stacking screenshot.")

        # Toggle Dark Theme on mobile
        mobile_theme_toggle = mobile_page.locator("#themeToggle")
        mobile_theme_toggle.click()
        mobile_page.wait_for_timeout(1000)

        # Scroll down to material excellence on mobile
        mobile_page.locator("text=The Natural Library").scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(800)
        mobile_page.screenshot(path="verification/about_mobile_dark_materials.png")
        print("Captured Mobile About Page Materials Sourcing screenshot (dark mode).")

        browser.close()

if __name__ == "__main__":
    run_about_verification()
