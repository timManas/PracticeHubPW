import { test, expect } from '@playwright/test';
import fs from 'fs';


test('Test Download button', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#buttons');

    // Start waiting for the download BEFORE clicking
    const downloadPromise = page.waitForEvent('download');

    // Click the download button
    await page.getByText('Download Sample File').click();

    // Wait for the download
    const download = await downloadPromise;

    // Get Playwright's temporary file location
    const tempPath = await download.path();

    // Read and print the contents
    const contents = fs.readFileSync(tempPath, 'utf8');

    console.log('File contents:');
    console.log(contents);

    // Save directly to your Mac Downloads folder
    await download.saveAs('/Users/timmerz/Downloads/sample.txt');

    // Verify it exists
    expect(
        fs.existsSync('/Users/timmerz/Downloads/sample.txt')
    ).toBeTruthy();

    console.log('Saved to: /Users/timmerz/Downloads/sample.txt');

})

test('Test Buttons Page', async ({ page }) => {
    await page.goto('https://qapracticehub.com/#buttons');

    const buttonElement = page.getByTestId('button-output');

    await page.getByTestId('btn-primary').click();
    await expect(buttonElement).toHaveText('Primary button clicked.');

    await page.getByTestId('btn-secondary').click();
    await expect(buttonElement).toHaveText('Secondary button clicked.');

    await page.getByTestId('btn-left-click').click();
    await expect(buttonElement).toHaveText('Left click detected!');

    await expect(page.getByTestId('btn-disabled')).toBeDisabled();

    await page.getByTestId('btn-click-counter').click();
    await expect(buttonElement).toHaveText('Button clicked 1 time(s).');
    await expect(page.getByTestId('btn-click-counter')).toHaveText('Click Me (1)');
    await page.getByTestId('btn-click-counter').click();
    await expect(buttonElement).toHaveText('Button clicked 2 time(s).');
    await expect(page.getByTestId('btn-click-counter')).toHaveText('Click Me (2)');
    await page.getByTestId('btn-click-counter').click();
    await expect(buttonElement).toHaveText('Button clicked 3 time(s).');
    await expect(page.getByTestId('btn-click-counter')).toHaveText('Click Me (3)');


    await page.getByTestId('btn-double-click').dblclick();
    await expect(buttonElement).toHaveText('Double click detected!');

    await page.getByTestId('btn-right-click').click({button: 'right'});
    await expect(buttonElement).toHaveText('Right click detected!');

    await page.getByTestId('btn-hover').hover();
    await expect(buttonElement).toHaveText('Mouse entered the hover button.');
    await page.getByTestId('btn-hover').click();
    await page.getByTestId('btn-right-click').hover();
    await expect(buttonElement).toHaveText('Mouse left the hover button.');

    await page.getByTestId('btn-danger').click();
    await expect(buttonElement).toHaveText('Danger button clicked.');

    await page.getByTestId('info-btn-click').click();
    await expect(page.getByTestId('info-popup-click')).toBeVisible();
    await page.getByTestId('info-popup-click').click();
    await expect(page.getByTestId('info-popup-click')).not.toBeVisible();

    await page.getByTestId('info-box-hover').hover();
    await expect(page.getByTestId('info-popup-hover')).toBeVisible();
    await page.getByTestId('info-btn-click').hover();
    await expect(page.getByTestId('info-popup-hover')).not.toBeVisible();


})

