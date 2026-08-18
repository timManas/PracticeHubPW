import { test, expect } from '@playwright/test';

test("Has Practice Labs Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-dynamic').click();
    await expect(page.getByRole('heading', { name: 'Dynamic Content' })).toHaveText('Dynamic Content');
})

test("Remove element staleness and DOM updaets", async ({page}) => {
    await page.goto('https://qapracticehub.com/#dynamic');

    const items = await page.getByTestId("dynamic-list").locator("li")
    for (let i=0; i < await items.count(); i++) {
        const item = await items.nth(i)
    }
    await expect(items).toHaveCount(2)

    await page.getByTestId('btn-add-element').click();
    await expect(items).toHaveCount(3)

    await page.getByTestId('btn-remove-element').click();
    await expect(items).toHaveCount(2)
})


test("Load Data 2s delay", async ({page}) => {
    await page.goto('https://qapracticehub.com/#dynamic');

    await page.getByTestId('btn-load-data').click();
    await expect(page.getByTestId('loading-spinner')).toBeVisible()

    await expect(page.getByTestId('loaded-data')).toContainText("Data loaded at")

})

test("Test Tab Switching", async ({page}) => {
    await page.goto('https://qapracticehub.com/#dynamic');

    await page.getByTestId('tab-btn-home').click()
    await expect(page.getByTestId('tab-panel-home')).toHaveText("Welcome to the Home tab content.")

    await page.getByTestId('tab-btn-profile').click()
    await expect(page.getByTestId('tab-panel-profile')).toHaveText("Profile settings and user info go here.")

    await page.getByTestId('tab-btn-settings').click()
    await expect(page.getByTestId('tab-panel-settings')).toHaveText("Application settings and preferences.")
})

test("Test iFrame - Submit New User Data", async ({page}) => {
    await page.goto('https://qapracticehub.com/#dynamic');

    await page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-name').fill('Hugh Janus');
    await page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-email').fill('Hugh@email.com');
    await page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-role').selectOption('developer');
    await page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-message').fill('Hello World');
    await page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-submit').click();

    await expect(page.locator('[data-testid="practice-iframe"]').contentFrame().getByTestId('iframe-message-box')).toHaveText("Successfully updated user data.")
    
})

// test("Test iFrame - Clear New User Data", async ({page}) => {})

// test("Test iFrame - Show/Hide Text", async ({page}) => {})