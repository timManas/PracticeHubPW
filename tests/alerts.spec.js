import { test, expect } from '@playwright/test';

test("Has Alerts Page", async ({ page }) => {
    await page.goto('https://qapracticehub.com');
    await page.getByTestId('nav-alerts').click();
    await expect(page.getByRole('heading', { name: 'Alerts, Modals & Popups' })).toHaveText('Alerts, Modals & Popups');
})

//Note: This dialog bok only has ok - We Ok :)
test("Can handle Alerts", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');


    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {
            console.log('Something went wrong while dismissing the dialog');
        });
    });
    await page.getByTestId('btn-alert').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Alert was shown and dismissed.")


})

//Note: This dialog box only has Cancel or Ok
test("Can handle Multi Option Alerts-Accept", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');


     page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {
            console.log('Something went wrong while dismissing the dialog');
        });
    });
    await page.getByTestId('btn-confirm').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Confirm result: Accepted")
})

//Note: This dialog box only has Cancel or Ok - We cancel
test("Can handle Multi Option Alerts-Cancel", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');


     page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {
            console.log('Something went wrong while dismissing the dialog');
        });
    });
    await page.getByTestId('btn-confirm').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Confirm result: Cancelled")
})

test("Can handle Dialog box without Validation input with Cancel or Accept - Accept", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept('HELLO WORLD').catch(() => {});
    });
    await page.getByTestId('btn-prompt').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Prompt without validation — entered: HELLO WORLD")
})

test("Can handle Dialog box without Validation input with Cancel or Accept - Cancel", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss('HELLO WORLD').catch(() => {});
    });
    await page.getByTestId('btn-prompt').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Prompt without validation was cancelled.")
})


test("Can handle Dialog box with Validation input with Cancel or Accept - Accept", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept("HELLO JOE").catch(() => {});
    });
    await page.getByTestId('btn-prompt-validated').click();
    await expect(page.getByTestId('alert-output')).toHaveText("Prompt with validation — entered: HELLO JOE")

})

//Note: Here we first dont send any value in, then we an error saying we need to enter
// Then we enter Hello Hugh. Then see the output on screen. A total of 3 dialog boxes appeared
test("Can handle Dialog box with Validation Empty input with Cancel or Accept - Accept", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');

    let dialogCount = 0;

    page.on('dialog', async dialog => {
        dialogCount++;

        console.log('Dialog count:', dialogCount);
        console.log('Dialog type:', dialog.type());
        console.log('Dialog message:', dialog.message());

        if(dialogCount === 1) {
            console.log('Submitting empty value');
            await dialog.accept('');
        }

        if (dialogCount === 2) {
            console.log('Clicking on Accept');
            await dialog.accept();
        }

        if (dialogCount === 3) {
            console.log('Submitting Hello Hugh');
            await dialog.accept('Hello Hugh');
        }
    })
    await page.getByTestId('btn-prompt-validated').click();

    await expect(page.getByTestId('alert-output')).toHaveText("Prompt with validation — entered: Hello Hugh")

})

test("Click on Toast and Dialog appeats. Verify output", async ({ page }) => {
    await page.goto('https://qapracticehub.com/#alerts');

    await page.getByTestId('btn-show-toast').click();
    await expect(page.getByTestId('toast-message')).toBeVisible()
    await expect(page.getByTestId('toast-message')).toContainText("Toast notification at")
})
