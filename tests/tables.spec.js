import { test, expect } from '@playwright/test';

test("Has Tables Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-tables').click();
    await expect(page.getByRole('heading', { name: 'Tables' })).toHaveText('Tables');
})

// test("Verify the table has 4 rows and 5 columns", async ({ page }) => {
//     await page.goto('https://qapracticehub.com/#tables');

//     // Verifies if table has indeed 4  rows
//     const rows = await (page.getByTestId('users-table-body').locator('tr'))
//     for (let i=0; i< await rows.count(); i++) {
//         const row = rows.nth(i);
//         // console.log(await row.innerText()) // Prints th entire row

//         let columns = row.locator('td')
//         await expect(columns).toHaveCount(7);

//         for (let j=0; j < await columns.count(); j++) {
//             const col = columns.nth(j);
//             console.log(await col.innerText())
//         }

//     }
//     await expect(rows).toHaveCount(4);
// })

test("Verify sort by name-Descending", async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');
    await page.getByTestId('table-sort-name').dblclick();

    const rows = await (page.getByTestId('users-table-body').locator('tr'))
    for (let i=0; i < await rows.count() - 1; i++) {
        const currentName = await rows.nth(i).locator('td').nth(2).innerText()
        const nextName = await rows.nth(i+1).locator('td').nth(2).innerText()
        expect(currentName.charAt(0) > nextName.charAt(0)).toBe(true)
    }
})

test("Verify sort by name-Ascending", async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-sort-name').click();
    const rows = await (page.getByTestId('users-table-body').locator('tr'))
    for (let i=0; i < await rows.count() -1; i++) {
        const currentName = await rows.nth(i).locator('td').nth(2).innerText()
        const nextName = await rows.nth(i+1).locator('td').nth(2).innerText()
        expect(currentName.charAt(0) < nextName.charAt(0)).toBe(true)
    }
})


// Verify sort by age
test("Verify sort by age - Ascending", async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-sort-age').click();
    const rows = await (page.getByTestId('users-table-body').locator('tr'))
    for (let i=0; i < await rows.count()-1; i++) {
        const currentAge = await rows.nth(i).locator('td').nth(5).innerText()
        const nextAge = await rows.nth(i+1).locator('td').nth(5).innerText()
        expect(Number(currentAge) <= Number(nextAge)).toBe(true)
    }
})

// Verify sort by age
test("Verify sort by age - Descending", async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-sort-age').dblclick();
    const rows = await (page.getByTestId('users-table-body').locator('tr'))
    for (let i=0; i < await rows.count()-1; i++) {
        const currentAge = await rows.nth(i).locator('td').nth(5).innerText()
        const nextAge = await rows.nth(i+1).locator('td').nth(5).innerText()
        expect(Number(currentAge) > Number(nextAge)).toBe(true)
    }
})

// Verify we can select rows and verify the output.
test("Verify we can select rows and verify the output.", async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    const rows = await (page.getByTestId('users-table-body')).locator('tr')
    for (let i=0; i < await (rows.count()); i++) {
        const row =  await rows.nth(i).innerText()
        const index = await rows.nth(i).locator('td').nth(1).innerText()

        if (index == 2 || index == 4) {
            console.log(row)
            await rows.nth(i).locator('td').nth(0).click()
            const checkbox = await page.getByTestId('row-checkbox-' + index)
            await checkbox.click()
        }
    }
    
    await expect(page.getByTestId('table-selection-output')).toHaveText("2 row(s) selected")
})

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



