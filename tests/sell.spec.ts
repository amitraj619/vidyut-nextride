import { test, expect } from '@chromatic-com/playwright';
import { SellEVPage } from '../src/pages/SellEVPage.js';

test.describe('Vidyut NextRide - Sell EV Suite', () => {
  let sellPage: SellEVPage;

  test.beforeEach(async ({ page }) => {
    sellPage = new SellEVPage(page);
    await sellPage.navigate();
  });

  test('TC_SELL_01: Verify Sell EV page renders headline and Why Choose NextRide section', async () => {
    await expect(sellPage.sellHeader).toBeVisible();
    await expect(sellPage.whyChooseNextRide).toBeVisible();
  });

  test('TC_SELL_02: Verify Book Free Inspection button is clickable and navigates to enquiry form', async ({ page }) => {
    await sellPage.clickBookFreeInspection();
    await expect(page).toHaveURL(/.*customer-enquiry.*/);
  });

  test('TC_SELL_03: Verify Customer Enquiry form displays Name and Phone inputs with callback button', async ({ page }) => {
    await sellPage.clickBookFreeInspection();
    await expect(sellPage.nameInput).toBeVisible();
    await expect(sellPage.phoneInput).toBeVisible();
    await expect(sellPage.requestCallbackBtn).toBeVisible();
  });

  test('TC_SELL_04: Verify entering valid seller details enables Request Callback CTA', async ({ page }) => {
    await sellPage.clickBookFreeInspection();
    await sellPage.nameInput.fill('Sunil Kumar');
    await sellPage.phoneInput.fill('9876543210');
    await expect(sellPage.requestCallbackBtn).toBeEnabled();
  });
});
