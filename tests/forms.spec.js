import { test, expect } from '@playwright/test';

test('Has Form Page', async ({ page }) => {
  // Test implementation
  await page.goto('https://qapracticehub.com');
  await page.getByTestId('nav-forms').click();
  await expect(page.getByRole('heading', { name: 'Login & Registration Forms' })).toHaveText('Login & Registration Forms');
})

test('Submit Valid Login', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');
    await page.getByTestId('login-username').fill('tester');
    await page.getByTestId('login-password').fill('password123');

    await page.getByTestId('login-password-toggle').click();
    await expect(page.getByTestId('login-password')).toHaveValue('password123');

    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('login-message')).toHaveText('Login successful! Welcome, tester.');
})

test('Submit Invalid Form', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');
    await page.getByTestId('login-username').fill('testerXXX');
    await page.getByTestId('login-password').fill('password123XXX');

    await page.getByTestId('login-password-toggle').click();
    await expect(page.getByTestId('login-password')).toHaveValue('password123XXX');

    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('login-message')).toHaveText('Invalid credentials. Try username: tester, password: password123');
})


test('Forgot password. Enter valid username', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');

    await page.getByTestId('forgot-password-trigger').click();

    await page.getByTestId('forgot-password-modal').isVisible();
    await page.getByTestId('forgot-username').fill('tester');
    await page.getByTestId('forgot-password-submit').click();

    await expect(page.getByTestId('forgot-password-value')).toHaveText('password123');

    await page.getByTestId('forgot-password-modal-close').click
})

test('Forgot password. Enter invalid username', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');

    await page.getByTestId('forgot-password-trigger').click();

    await page.getByTestId('forgot-password-modal').isVisible();
    await page.getByTestId('forgot-username').fill('testerXXX');
    await page.getByTestId('forgot-password-submit').click();

    await expect(page.getByTestId('forgot-password-message')).toHaveText('Username not found.');

    await page.getByTestId('forgot-password-modal-close').click

})

test('Submit Registration Form', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');

    await page.getByTestId('reg-firstname').fill('John');
    await page.getByTestId('reg-lastname').fill('Doe');
    await page.getByTestId('reg-email').fill('JohnDoe@email.com');

    await page.getByTestId('reg-country').selectOption('ca');

    await page.getByTestId('register-submit').click();
    await expect(page.getByTestId('register-message')).toHaveText('Registration successful for John Doe!');

})

test('Clear Registration Form', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');

    await page.getByTestId('reg-firstname').fill('John');
    await page.getByTestId('reg-lastname').fill('Doe');
    await page.getByTestId('reg-email').fill('JohnDoe@email.com');

    await page.getByTestId('reg-country').selectOption('ca');

    await page.getByTestId('register-submit').click();
    await expect(page.getByTestId('register-message')).toHaveText('Registration successful for John Doe!');

    await page.getByTestId('register-clear').click();
    await expect(page.getByTestId('reg-firstname')).toHaveValue('');
    await expect(page.getByTestId('reg-lastname')).toHaveValue('');
    await expect(page.getByTestId('reg-email')).toHaveValue('');
    await expect(page.getByTestId('reg-country')).toHaveValue('');
})

test('Submit Invalid Registration Form', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#forms');

    await page.getByTestId('reg-firstname').fill('John');
    await page.getByTestId('reg-lastname').fill('');
    await page.getByTestId('reg-email').fill('John@Doe.com');

    await page.getByTestId('reg-country').selectOption('ca');

    await page.getByTestId('register-submit').click();
    await expect(page.getByTestId('register-message')).toHaveText('Please fill in all required fields.')

    await page.getByTestId('register-clear').click();
    await expect(page.getByTestId('reg-firstname')).toHaveValue('');
    await expect(page.getByTestId('reg-lastname')).toHaveValue('');
    await expect(page.getByTestId('reg-email')).toHaveValue('');
    await expect(page.getByTestId('reg-country')).toHaveValue('');

})