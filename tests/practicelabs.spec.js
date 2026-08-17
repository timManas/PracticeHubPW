import { test, expect } from '@playwright/test';

test("Has Practice Labs Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-practice-lab').click();
    await expect(page.getByRole('heading', { name: 'Automation Practice Lab' })).toHaveText('Automation Practice Lab');
})

test('MultiStepWizard', async({page}) => {
    await page.goto('https://qapracticehub.com/#practice-lab');

    await page.getByTestId('wizard-name').fill('Hugh Janus');
    await page.getByTestId('wizard-email').fill('Hugh@email.com');
    await page.getByTestId('wizard-next').click();
    await page.getByTestId('wizard-city').fill('Texas');
    await page.getByTestId('wizard-zip').fill('12345');
    await page.getByTestId('wizard-next').click();

    const info = await page.getByTestId('wizard-review').locator('p')
    await expect(info.nth(0)).toHaveText('Name: Hugh Janus')
    await expect(info.nth(1)).toHaveText('Email: Hugh@email.com')
    await expect(info.nth(2)).toHaveText('City: Texas')
    await expect(info.nth(3)).toHaveText('ZIP: 12345')

    await page.getByTestId('wizard-submit').click();

    await expect(page.getByTestId('wizard-message')).toHaveText("Wizard submitted successfully!")
})

test('Custom Date Picker', async ({page}) => {
    await page.goto('https://qapracticehub.com/#practice-lab');

    await page.getByTestId('custom-date-trigger').click();
    await page.getByTestId('custom-date-next').click();
    await page.getByTestId('custom-date-day-2026-09-30').click();

    await expect(page.getByTestId('custom-date-output')).toHaveText("Selected date: 2026-09-30")
})

test('Stale Element Demo', async({page}) => {
    await page.goto('https://qapracticehub.com/#practice-lab');

    await page.getByTestId('stale-action-btn').click();
    await expect(page.getByTestId('stale-output')).toHaveText("Click count: 1")

    await page.getByTestId('stale-action-btn').click();
    await expect(page.getByTestId('stale-output')).toHaveText("Click count: 2")

    await page.getByTestId('stale-action-btn').click();
    await expect(page.getByTestId('stale-output')).toHaveText("Click count: 3")

})