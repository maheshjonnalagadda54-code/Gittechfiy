const { test, expect } = require('@playwright/test');

test.describe('DemoQA Text Box Form Submission', () => {

  test('Fill text box form and verify submitted data', async ({ page }) => {
    // Step 1: Navigate to the DemoQA text box page
    await page.goto('https://www.demoqa.com/text-box');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Verify page title
    await expect(page).toHaveTitle(/ToolsQA/);

    // Step 2: Define test data
    const testData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      currentAddress: '123 Main Street, Springfield, IL 62701',
      permanentAddress: '456 Oak Avenue, Chicago, IL 60601'
    };

    // Step 3: Fill in Full Name field
    const fullNameInput = page.locator('#fullName');
    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill(testData.fullName);

    // Step 4: Fill in Email field
    const emailInput = page.locator('#userEmail');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(testData.email);

    // Step 5: Fill in Current Address field
    const currentAddressInput = page.locator('#currentAddress');
    await expect(currentAddressInput).toBeVisible();
    await currentAddressInput.fill(testData.currentAddress);

    // Step 6: Fill in Permanent Address field
    const permanentAddressInput = page.locator('#permanentAddress');
    await expect(permanentAddressInput).toBeVisible();
    await permanentAddressInput.fill(testData.permanentAddress);

    // Step 7: Scroll to Submit button and click it
    const submitButton = page.locator('button#submit');
    await submitButton.scrollIntoViewIfNeeded();
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Wait for form submission and response to appear
    await page.waitForSelector('#output', { timeout: 5000 });

    // Step 8: Verify submitted data is displayed
    const outputSection = page.locator('#output');
    await expect(outputSection).toBeVisible();

    // Verify all submitted details are displayed in the output
    const outputText = await outputSection.textContent();

    expect(outputText).toContain(testData.fullName);
    expect(outputText).toContain(testData.email);
    expect(outputText).toContain(testData.currentAddress);
    expect(outputText).toContain(testData.permanentAddress);

    // Additional verification by checking individual output fields
    const nameOutput = page.locator('text=Name:').locator('..').locator('text=' + testData.fullName);
    const emailOutput = page.locator('text=Email:').locator('..').locator('text=' + testData.email);

    await expect(nameOutput).toBeVisible();
    await expect(emailOutput).toBeVisible();

    // Step 9: Log verification results
    console.log('✓ Full Name entered: ' + testData.fullName);
    console.log('✓ Email entered: ' + testData.email);
    console.log('✓ Current Address entered: ' + testData.currentAddress);
    console.log('✓ Permanent Address entered: ' + testData.permanentAddress);
    console.log('✓ Form submitted successfully');
    console.log('✓ All submitted details verified in output');
  });

  test('Submit form with different data and verify', async ({ page }) => {
    // Navigate to the text box page
    await page.goto('https://www.demoqa.com/text-box');
    await page.waitForLoadState('networkidle');

    // Test data for second test case
    const testData = {
      fullName: 'Jane Smith',
      email: 'jane.smith@email.com',
      currentAddress: '789 Elm Street, New York, NY 10001',
      permanentAddress: '321 Pine Road, Boston, MA 02101'
    };

    // Fill all fields
    await page.locator('#fullName').fill(testData.fullName);
    await page.locator('#userEmail').fill(testData.email);
    await page.locator('#currentAddress').fill(testData.currentAddress);
    await page.locator('#permanentAddress').fill(testData.permanentAddress);

    // Submit the form
    await page.locator('button#submit').click();

    // Wait for output
    await page.waitForSelector('#output');

    // Verify output contains all data
    const outputText = await page.locator('#output').textContent();

    expect(outputText).toContain(testData.fullName);
    expect(outputText).toContain(testData.email);
    expect(outputText).toContain(testData.currentAddress);
    expect(outputText).toContain(testData.permanentAddress);

    console.log('✓ Test case 2: Form submission with different data verified successfully');
  });

  test('Verify form field validation and clearing', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://www.demoqa.com/text-box');
    await page.waitForLoadState('networkidle');

    // Fill in data
    const fullNameInput = page.locator('#fullName');
    const emailInput = page.locator('#userEmail');

    // Enter data
    await fullNameInput.fill('Test User');
    await emailInput.fill('test@example.com');

    // Verify data is entered
    await expect(fullNameInput).toHaveValue('Test User');
    await expect(emailInput).toHaveValue('test@example.com');

    // Clear and re-enter different data
    await fullNameInput.clear();
    await emailInput.clear();

    await fullNameInput.fill('Updated User');
    await emailInput.fill('updated@example.com');

    // Verify updated data
    await expect(fullNameInput).toHaveValue('Updated User');
    await expect(emailInput).toHaveValue('updated@example.com');

    // Submit and verify
    await page.locator('#currentAddress').fill('Some Address');
    await page.locator('#permanentAddress').fill('Another Address');

    await page.locator('button#submit').click();
    await page.waitForSelector('#output');

    const outputText = await page.locator('#output').textContent();
    expect(outputText).toContain('Updated User');
    expect(outputText).toContain('updated@example.com');

    console.log('✓ Form field validation and clearing verified successfully');
  });

});
