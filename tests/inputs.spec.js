import { test, expect } from '@playwright/test';

test('Has Input Page', async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-inputs').click();
    await expect(page.getByRole('heading', { name: 'Text Inputs' })).toHaveText('Text Inputs');
})

test('Enter Valid Information', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#inputs');

    await page.getByTestId('text-input').fill('John Doe');
    await expect(page.getByTestId('text-input')).toHaveValue('John Doe');

    await page.getByTestId('email-input').fill('JohnDoe@email.com');
    await expect(page.getByTestId('email-input')).toHaveValue('JohnDoe@email.com');

    await page.getByTestId('password-input').fill('Password123');
    await expect(page.getByTestId('password-input')).toHaveValue('Password123');

    await page.getByTestId('number-input').fill('5');
    await expect(page.getByTestId('number-input')).toHaveValue('5');

    await page.getByTestId('date-input').fill('1987-12-05');
    await expect(page.getByTestId('date-input')).toHaveValue('1987-12-05');

    await page.getByTestId('time-input').fill('14:57');
    await expect(page.getByTestId('time-input')).toHaveValue('14:57');

    await page.getByTestId('tel-input').fill('4372621214');
    await expect(page.getByTestId('tel-input')).toHaveValue('4372621214');

    await page.getByTestId('textarea-input').fill('Hello World');
    await expect(page.getByTestId('textarea-input')).toHaveValue('Hello World');

    await expect(page.getByTestId('readonly-input')).toHaveValue('Cannot edit this');

    
    await page.getByTestId('input-output').fill('Typing 1234');
    await expect(page.getByTestId('input-output-result')).toHaveText('Typing 1234');
    await page.waitForTimeout(5000);
})

test('Enter Invalid Information', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#inputs');
    await page.getByTestId('text-input').fill('John Doe');
    await page.getByTestId('email-input').fill('JohnDoe!!!!missingAt.com');
    await page.getByTestId('password-input').fill('   ');
    await expect(page.getByTestId('number-input').fill('ABC')).rejects.toThrow();


    await expect(page.getByTestId('time-input').fill('AA:BB')).rejects.toThrow();

    const telInput = page.getByTestId('tel-input');
    await telInput.fill('000000');
    await telInput.press('Enter');
    await page.getByTestId('tel-feedback').getByText('India numbers must be 10 digits (6/10 entered)');



    await page.waitForTimeout(5000);
})