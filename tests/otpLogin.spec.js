import { test, expect } from '@playwright/test';

test('Has Form Page', async ({ page }) => {
    // Test implementation
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-otp-login').click();
    await expect(page.getByRole('heading', { name: 'OTP Login', exact: true })).toHaveText('OTP Login');
})

test('Fetch OTP and Submit Valid Login', async ({ page, context }) => {
    // await page.goto('https://qapracticehub.com/#otp-login');

    // await page.getByTestId('otp-username').fill('tester');

    // const [otpPage] = await Promise.all([
    //     context.waitForEvent('popup'),
    //     page.getByTestId('btn-fetch-otp').click()
    // ]);

    // await otpPage.waitForLoadState();

    // const otpValue = await page.getByTestId('otp-display').textContent();
    // console.log('Fetched OTP: %s', otpValue);

    await page.goto('https://qapracticehub.com/#otp-login');
    await page.getByTestId('otp-username').fill('test');

    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-fetch-otp').click();

    const page1 = await page1Promise;
    await page1.getByText('QA Practice Hub Fresh OTP').press('ControlOrMeta+c');
    await page.getByTestId('otp-digit-1').click();

    await page.getByTestId('otp-submit').click();
})

test('Fetch 2nd OTP and Submit Valid Login', async ({ page }) => {

    await page.goto('https://qapracticehub.com/#otp-login');
    await page.getByTestId('otp-username').fill('test');

    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-fetch-otp').click();
    const page1 = await page1Promise;

    await page.waitForTimeout(30000);

    const page2Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-resend-otp').click();
    const page2 = await page2Promise;
    await page2.getByTestId('otp-display').dblclick();
    await page2.getByText('QA Practice Hub Resend OTP').press('ControlOrMeta+c');

    await page.getByTestId('otp-digit-1').click();
    await page.getByTestId('otp-submit').click();
    await page.getByTestId('otp-login-message').click();

})
