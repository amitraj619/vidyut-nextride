import { test, expect } from '@chromatic-com/playwright';
import { HomePage } from '../src/pages/HomePage.js';

test.describe('Vidyut NextRide - Localization and City Selection Suite', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('TC_LOC_01: Verify switching language to Hindi and back to English', async ({ page }) => {
    // Switch to Hindi
    await homePage.header.switchToHindi();
    const hindiLang = await page.evaluate(() => document.documentElement.lang);
    expect(hindiLang).toBe('hi');

    // Switch back to English
    await homePage.header.switchToEnglish();
    const englishLang = await page.evaluate(() => document.documentElement.lang);
    expect(englishLang).toBe('en');
  });

  test('TC_LOC_02: Verify selecting city from modal updates URL and header display', async ({ page }) => {
    await homePage.header.selectCity('Delhi NCR');
    await expect(page).toHaveURL(/.*city=Delhi.*/);
  });

  test('TC_LOC_03: Verify language toggle switch and City selector are visible in header', async () => {
    await homePage.header.verifyHeaderElements();
  });
});
