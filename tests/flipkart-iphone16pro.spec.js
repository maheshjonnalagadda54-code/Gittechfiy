const { test, expect } = require('@playwright/test');

test.describe('Flipkart iPhone 16 Pro Selection', () => {

  test('Open Flipkart and select iPhone 16 Pro', async ({ page }) => {
    // Step 1: Navigate to Flipkart homepage
    await page.goto('https://www.flipkart.com/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Verify Flipkart homepage is loaded
    await expect(page).toHaveTitle(/Flipkart/);

    // Step 2: Click on the search bar
    const searchBar = page.locator('input[placeholder="Search for products, brands and more"]');
    await searchBar.click();

    // Step 3: Type "iphones" in the search bar
    await searchBar.fill('iphones');

    // Step 4: Press Enter to search
    await searchBar.press('Enter');

    // Wait for search results to load
    await page.waitForLoadState('networkidle');

    // Step 5: Verify search results page is displayed
    await expect(page).toHaveURL(/search\?q=iphones/);

    // Step 6: Find and click on iPhone 16 Pro (Desert Titanium, 256 GB)
    // Look for the product link containing "iPhone 16 Pro"
    const iphone16ProLink = page.getByRole('link', { name: /Apple iPhone 16 Pro.*Desert.*256 GB/i }).first();

    // Verify the link exists
    await expect(iphone16ProLink).toBeVisible();

    // Step 7: Click on iPhone 16 Pro product
    await iphone16ProLink.click();

    // Wait for product page to load
    await page.waitForLoadState('networkidle');

    // Step 8: Verify product details page is loaded
    await expect(page).toHaveURL(/apple-iphone-16-pro.*256-gb/);

    // Step 9: Verify key product information is visible
    await expect(page.locator('h1', { hasText: /iPhone 16 Pro/ })).toBeVisible();

    // Verify price is displayed
    await expect(page.locator('text=₹1,19,900')).toBeVisible();

    // Verify specifications are shown
    await expect(page.locator('text=256 GB ROM')).toBeVisible();
    await expect(page.locator('text=16.0 cm.*6.3 inch.*Super Retina XDR Display')).toBeVisible();
    await expect(page.locator('text=48MP.*48MP.*12MP')).toBeVisible();
    await expect(page.locator('text=A18 Pro Chip')).toBeVisible();

    console.log('✓ Successfully opened Flipkart');
    console.log('✓ Searched for iphones');
    console.log('✓ Selected iPhone 16 Pro (Desert Titanium, 256 GB)');
    console.log('✓ Verified product details page');
  });

  test('Verify iPhone 16 Pro specifications', async ({ page }) => {
    // Navigate directly to iPhone 16 Pro product page
    await page.goto('https://www.flipkart.com/apple-iphone-16-pro-desert-titanium-256-gb/p/itm4f25cec0bd003?pid=MOBH4DQFEZFXPGNJ');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify key specifications
    const specifications = {
      'ROM': '256 GB ROM',
      'Display': '16.0 cm (6.3 inch) Super Retina XDR Display',
      'Rear Camera': '48MP + 48MP + 12MP',
      'Front Camera': '12MP Front Camera',
      'Processor': 'A18 Pro Chip, 6 Core Processor',
      'Price': '₹1,19,900',
      'Rating': '4.7',
      'Warranty': '1 year warranty for phone and 1 year warranty for in Box Accessories'
    };

    for (const [spec, value] of Object.entries(specifications)) {
      console.log(`Checking ${spec}: ${value}`);
      await expect(page.locator(`text=${value}`)).toBeVisible();
    }

    console.log('✓ All specifications verified successfully');
  });

});
