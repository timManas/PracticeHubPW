import { test, expect } from '@playwright/test';

test("Has Practice Labs Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-practice-lab').click();
    await expect(page.getByRole('heading', { name: 'Automation Practice Lab' })).toHaveText('Automation Practice Lab');
})

