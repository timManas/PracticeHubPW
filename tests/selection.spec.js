import { test, expect } from '@playwright/test';

//Note: Verify that the Selection page is accessible.
test("Has Selection Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-selection').click();
    await expect(page.getByRole('heading', { name: 'Radio Buttons, Checkboxes &' })).toHaveText('Radio Buttons, Checkboxes & Dropdowns');

})

//Note: Select each radio button and verify the output.
test("Can select Radio Button", async ({ page }) => {
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

//Note: Select multiple checkboes and verify the output. Then unselect them and verify the output.
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

//Note: Select Option multiple times and verify the output.  
test("Can select Dropdown", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.getByTestId('country-select').click();
    await page.getByTestId('country-select').selectOption('germany');
    await expect(page.getByTestId('country-output')).toHaveText('Germany');

    await page.getByTestId('country-select').click();
    await page.getByTestId('country-select').selectOption('japan');
    await expect(page.getByTestId('country-output')).toHaveText('Japan');

})

//Note: Select multiple options from the multi-select listbox and verify the output.
test("Can select MultiSelect Listbox", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.getByTestId('languages-select').selectOption(['javascript', 'python', 'java']);
    await expect(page.getByTestId('languages-output')).toHaveText('JavaScript, Python, Java');

})

//Note: Select multiple options from the multi-select dropdown and verify the output. Then unselect them and verify the output. 
test("Can select MultiSelect Dropdown", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');
    await page.getByTestId('frameworks-multi-select-trigger').click();
    await page.getByTestId('framework-selenium').check();
    await page.getByTestId('framework-cypress').check();
    await page.getByTestId('framework-appium').check();
    await page.getByTestId('framework-appium').press('Escape');
    await expect(page.getByTestId('frameworks-multi-output')).toHaveText('Selenium, Cypress, Appium');

    await page.getByTestId('frameworks-multi-select-trigger').click();
    await page.getByTestId('frameworks-multi-select-panel').getByText('Appium').click();
    await page.getByTestId('frameworks-multi-select-panel').getByText('Cypress').click();
    await page.getByTestId('framework-cypress').press('Escape');
    await expect(page.getByTestId('frameworks-multi-output')).toHaveText('Selenium');

    await page.getByTestId('frameworks-multi-select-trigger').click();
    await page.getByTestId('frameworks-multi-select-panel').getByText('Selenium').click();
    await page.getByTestId('framework-selenium').press('Escape');
    await expect(page.getByTestId('frameworks-multi-output')).toHaveText('None selected');

})

//Note: Select Range Slider  and verify the output
test("Can select Range Slider", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.getByTestId('experience-range').fill('10');
    await expect(page.getByTestId('experience-output')).toHaveText('10 years');
    await page.getByTestId('experience-range').fill('20');
    await expect(page.getByTestId('experience-output')).toHaveText('20 years');
    await page.getByTestId('experience-range').fill('0');
    await expect(page.getByTestId('experience-output')).toHaveText('0 years');
})

//Note: Select colour picker and verify the output
test("Can Colour picker and verify output", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.getByTestId('color-output').click();
    await page.getByTestId('color-input').fill('#100971');
    await expect(page.getByTestId('color-output')).toHaveText('#100971');

})

//Note: Select toggle button and verify the output
test('Can enable and disable toggle button', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');

    await page.locator('.toggle-track').click();
    await expect(page.getByTestId('toggle-output')).toHaveText('On');
    await expect(page.getByTestId('toggle-notifications')).toBeChecked();


    await page.locator('.toggle-track').click();
    await expect(page.getByTestId('toggle-output')).toHaveText('Off');
    await expect(page.getByTestId('toggle-notifications')).not.toBeChecked();
})

test('Test Auto-complete', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#selection');
    await page.getByTestId('autocomplete-input').fill('ind');

    await expect(page.getByTestId('autocomplete-option-0')).toHaveText('India');
    await expect(page.getByTestId('autocomplete-option-1')).toHaveText('Indonesia');
})




