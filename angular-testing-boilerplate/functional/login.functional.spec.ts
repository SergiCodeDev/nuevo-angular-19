import { expect, test } from '@playwright/test';

test('debería redirigir al dashboard en login exitoso', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({ status: 200 });
  });

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@user.com');
  await page.fill('input[name="password"]', 'password12345');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
});

test('debería de mostrar un mensaje de error en login fallido', async ({
  page,
}) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({
      status: 401,
      body: JSON.stringify({ message: 'Invalid email or password' }),
    });
  });

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@user.com');
  await page.fill('input[name="password"]', 'errorpassword12345');
  await page.click('button[type="submit"]');

  const errorMessage = page.locator('text=Invalid email or password');
  await expect(errorMessage).toBeVisible();
});
