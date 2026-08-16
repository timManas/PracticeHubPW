import { test, expect } from '@playwright/test';

test("Can select Radio Button", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-selection').click();
    await expect(page.getByRole('heading', { name: 'Radio Buttons, Checkboxes &' })).toHaveText('Radio Buttons, Checkboxes & Dropdowns');

})

test("Has Selection Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    const genderOutput = await page.getByTestId('gender-output');

    // await page.getByTestId('gender-male').click();
    await page.getByTestId('gender-male').check();    
    await expect(genderOutput).toHaveText('male');
    await expect(page.getByTestId('gender-male')).toBeChecked();

    await page.getByTestId('gender-radios').getByText('Female').click();
    await expect(genderOutput).toHaveText('female');

    await page.getByTestId('gender-radios').getByText('Other').click();
    await expect(genderOutput).toHaveText('other');
})  

