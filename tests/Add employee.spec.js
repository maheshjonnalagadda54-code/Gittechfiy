import { test, expect } from '@playwright/test';

test('Add Employee in OrangeHRM', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.locator('input[placeholder="Username"]').fill('Admin');
});