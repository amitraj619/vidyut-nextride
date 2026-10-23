import { test, expect } from '@chromatic-com/playwright';
import { HomePage } from '../src/pages/HomePage.js';
import { TEST_DATA } from '../src/fixtures/testData.js';

test.describe('Vidyut NextRide - Homepage Suite', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('TC_HOME_01: Verify page title and header controls are visible', async () => {
    const title = await homePage.getPageTitle();
    expect(title).toMatch(TEST_DATA.expectedTitles.home);
    await homePage.header.verifyHeaderElements();
  });

  test('TC_HOME_02: Verify Hero section and Best Deals CTA are rendered', async () => {
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.viewBestDealsBtn).toBeVisible();
  });

  test('TC_HOME_03: Verify "Find my EV" CTA navigates to quiz flow', async ({ page }) => {
    await homePage.clickFindMyEV();
    await expect(page).toHaveURL(/.*find-my-perfect-ev.*/);
  });

  test('TC_HOME_04: Verify Brand Carousel displays OEM partner logos', async () => {
    const count = await homePage.brandLogos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC_HOME_05: Verify Why Choose NextRide section is displayed', async () => {
    await expect(homePage.whyChooseSection).toBeVisible();
  });

  test('TC_HOME_06: Verify Customer Reviews section is displayed', async () => {
    await expect(homePage.customerReviewsSection).toBeVisible();
  });

  test('TC_HOME_07: Verify FAQ accordion displays questions', async () => {
    await expect(homePage.faqSection).toBeVisible();
    await homePage.expandFaq(0);
  });

  test('TC_HOME_08: Verify footer displays quick links and policies', async () => {
    await homePage.scrollToFooter();
    await expect(homePage.footer).toContainText(/Quick links|Policies|Privacy Policy/i);
  });
});
