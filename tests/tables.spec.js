import { test, expect } from '@playwright/test';

test("Has Tables Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-tables').click();
    await expect(page.getByRole('heading', { name: 'Tables' })).toHaveText('Tables');
})

// Verify the table has 4 rows and 5 columns.
// Verify filter by name
// Verify sort by name
// Verify sort by age
// Verify we can select rows and verify the output.
// Verify we can delete a single row
// Verify we can delete multiple rows
// Verify we can switch the page to the next page
// Verify we can switch the page to the previous page
// Verify we can Add a new user
// Verify we cannot add an existing user
// Verify we cannot add an invalid existing user

// Verify we can Find the newly added user in the table
// Verify we can Add multiple new users
// Verify we can close the Add User modal
// Verify if delete 4 users, the Page will switch to the previous page and the table will have 4 rows and 5 columns.



