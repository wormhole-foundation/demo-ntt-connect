import { test, expect } from '@playwright/test';

test('homepage displays Wormhole NTT UI title', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load and the title to be present
    await expect(page.getByText('Wormhole NTT UI')).toBeVisible({
        timeout: 30000,
    });

    // Also check that the page title is correct
    await expect(page).toHaveTitle(/Wormhole NTT Connect/);
});

test('page structure is correct', async ({ page }) => {
    await page.goto('/');

    // Check that the main container exists
    const mainContainer = page.locator('div').first();
    await expect(mainContainer).toBeVisible();

    // Wait for Wormhole Connect component to load
    await page.waitForTimeout(5000);

    // Verify the title is rendered
    await expect(page.getByText('Wormhole NTT UI')).toBeVisible();
});
