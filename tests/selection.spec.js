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

test("Can select Checkboxes", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    const checkboxOutput = await page.getByTestId('skills-output');

    await page.getByTestId('skills-checkboxes').getByText('Selenium').click();
    await expect(checkboxOutput).toHaveText('selenium');
    await page.getByTestId('skills-checkboxes').getByText('Playwright').click();
    await expect(checkboxOutput).toHaveText('selenium, playwright');
    await page.getByTestId('skills-checkboxes').getByText('Cypress').click();
    await expect(checkboxOutput).toHaveText('selenium, playwright, cypress');
    await page.getByTestId('skills-checkboxes').getByText('Appium').click();
    await expect(checkboxOutput).toHaveText('selenium, playwright, cypress, appium');


    await page.getByTestId('skills-checkboxes').getByText('Appium').click();
    await expect(checkboxOutput).toHaveText('selenium, playwright, cypress');

    await page.getByTestId('skills-checkboxes').getByText('Cypress').click();
    await expect(checkboxOutput).toHaveText('selenium, playwright');

    await page.getByTestId('skills-checkboxes').getByText('Playwright').click();
    await expect(checkboxOutput).toHaveText('selenium');

    await page.getByTestId('skills-checkboxes').getByText('Selenium').click();
    await expect(checkboxOutput).toHaveText('None selected');
})


test("Can select Dropdown", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.getByTestId('country-select').click();
    await page.getByTestId('country-select').selectOption('germany');
    await expect(page.getByTestId('country-output')).toHaveText('Germany');

})
