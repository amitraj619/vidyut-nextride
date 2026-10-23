import { Page, Locator, expect } from '@playwright/test';

/**
 * Common helper functions
 */

export async function waitForNetworkIdleAndStable(page: Page, timeoutMs = 5000) {
  try {
    await page.waitForLoadState('networkidle', { timeout: timeoutMs });
  } catch {
    // Fallback if continuous polling occurs
    await page.waitForTimeout(1000);
  }
}

export function extractNumericPrice(priceText: string): number {
  const clean = priceText.replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
}

export async function scrollIntoViewAndClick(locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();
  await locator.click();
}
