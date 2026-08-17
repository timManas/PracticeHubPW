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

// Verify we can delete multiple rows
test('Verify we can delete multiple rows', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    const rows = await page.getByTestId('users-table-body').locator('tr')
    for (let i=0; i < await(rows.count()); i++) {
        const row = await rows.nth(i).innerText()
        const index = Number(await rows.nth(i).locator('td').nth(1).innerText())

        if (index == 2 || index == 4) {
            console.log(row)
            const deleteBtn = await page.getByTestId('row-delete-' + index)
            await deleteBtn.click()
            const newindex = Number(await rows.nth(i).locator('td').nth(1).innerText())
            await expect(newindex != index).toBe(true)
        }
    }
})

// Verify we can switch the page to the next page
test('Verify we can switch the page to the next', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('page-next').click();
    await expect(page.getByTestId('page-info')).toHaveText("Page 2 of 2")

    await page.getByTestId('page-prev').click();
    await expect(page.getByTestId('page-info')).toHaveText("Page 1 of 2")
})

// Verify we can Add a new user
test('Verify we can Add a new user', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();
    const newUser1 = await page.getByTestId('role-entry-1').innerText()

    await page.getByTestId('role-id-1').fill('9');
    await page.getByTestId('role-name-1').fill('Hugh Janus');
    await page.getByTestId('role-email-1').fill('hugh@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('40');
    await page.getByTestId('add-role-save').click();

    const rowName = await page.getByTestId('users-table-body').locator('tr').nth(0).locator('td').nth(2).innerText()
    await expect(rowName == 'Hugh Janus').toBe(true)
})

// 
test('Verify we cannot add an existing user', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();
    await page.getByTestId('role-id-1').fill('9');
    await page.getByTestId('role-name-1').fill('Hugh Janus');
    await page.getByTestId('role-email-1').fill('hugh@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('40');
    await page.getByTestId('add-role-save').click();
    const rowName = await page.getByTestId('users-table-body').locator('tr').nth(0).locator('td').nth(2).innerText()
    await expect(rowName == 'Hugh Janus').toBe(true)

    await page.getByTestId('table-add-role').click();
    await page.getByTestId('role-id-1').fill('9');
    await page.getByTestId('role-name-1').fill('Hugh Jackman');
    await page.getByTestId('role-email-1').fill('hughJackman@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('25');
    await page.getByTestId('add-role-save').click();
    await expect(page.getByTestId('add-role-message')).toHaveText("ID 9 already exists. Please use a unique ID.")

})

test('Verify we cannot add an invalid existing user', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();
    await page.getByTestId('role-id-1').fill('');
    await page.getByTestId('role-name-1').fill('');
    await page.getByTestId('role-email-1').fill('hugh@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('40');
    await page.getByTestId('add-role-save').click();
    await expect(page.getByTestId('add-role-message')).toHaveText("Please fill in all fields (ID, Name, Email, Role, Age).")
})


test('Verify we can Add multiple new users', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();

    await page.getByTestId('role-id-1').fill('9');
    await page.getByTestId('role-name-1').fill('Hugh Janus');
    await page.getByTestId('role-email-1').fill('hugh@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('40');

    // Add another user
    await page.getByTestId('add-role-entry-btn').click();

    await page.getByTestId('role-id-2').fill('10');
    await page.getByTestId('role-name-2').fill('Downtown Abbey');
    await page.getByTestId('role-email-2').fill('Downtown@email.com');
    await page.getByTestId('role-role-2').selectOption('Admin');
    await page.getByTestId('role-age-2').fill('100');

    await page.getByTestId('add-role-save').click();

    const rowName1 = await page.getByTestId('users-table-body').locator('tr').nth(0).locator('td').nth(2).innerText()
    await expect(rowName1 == 'Hugh Janus').toBe(true)

    const rowName2 = await page.getByTestId('users-table-body').locator('tr').nth(1).locator('td').nth(2).innerText()
    await expect(rowName2 == 'Downtown Abbey').toBe(true)
})


test('Verify we can Remove entered users', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();
    await page.getByTestId('role-id-1').fill('9');
    await page.getByTestId('role-name-1').fill('Hugh Janus');
    await page.getByTestId('role-email-1').fill('hugh@email.com');
    await page.getByTestId('role-role-1').selectOption('Admin');
    await page.getByTestId('role-age-1').fill('40');
    await page.getByTestId('add-role-save').click();

    const rowName1 = await page.getByTestId('users-table-body').locator('tr').nth(0).locator('td').nth(2).innerText()
    await expect(rowName1 == 'Hugh Janus').toBe(true)

    await page.getByTestId('row-delete-9').click();
    await expect(page.getByTestId('row-delete-9')).not.toBeVisible()
    
})


// 
test('Verify we can close the Add User modal', async({page}) => {
    await page.goto('https://qapracticehub.com/#tables');

    await page.getByTestId('table-add-role').click();
    await expect(page.getByTestId('add-role-modal')).toBeVisible()

    await page.getByTestId('add-role-modal-close').click();
    await expect(page.getByTestId('add-role-modal')).not.toBeVisible()



})


