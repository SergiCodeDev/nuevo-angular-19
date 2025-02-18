import { expect, test } from '@playwright/test';

test('flujo completo de login exitoso', async ({ page }) => {
  // mokear la api de login para caso exitoso

  await page.route('**/api/login', async (route) => {
    const requestBody = await route.request().postDataJSON();
    if (
      requestBody.email === 'user@user.com' &&
      requestBody.password === 'password12345'
    ) {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    } else {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid email or password' }),
      });
    }
  });

  // iniciar sesión

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@user.com');
  await page.fill('input[name="password"]', 'password12345');
  await page.click('button[type="submit"]');

  // verifiar la redirección

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
});

test('flujo completo de login fallido', async ({ page }) => {
  // mokear la api de login para caso fallido

  await page.route('**/api/login', async (route) => {
    const requestBody = await route.request().postDataJSON();
    if (
      requestBody.email === 'user@user.com' &&
      requestBody.password === 'errorpassword12345'
    ) {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid email or password' }),
      });
    } else {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    }
  });

  // iniciar sesión

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@user.com');
  await page.fill('input[name="password"]', 'password12345');
  await page.click('button[type="submit"]');

  // verifiar mensage de error

  const errorMessage = await page.locator('test: Invalid email or password');
  await expect(errorMessage).toBeVisible();
});
