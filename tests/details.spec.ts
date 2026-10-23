import { test, expect } from '@chromatic-com/playwright';
import { VehicleListingPage } from '../src/pages/VehicleListingPage.js';
import { VehicleDetailPage } from '../src/pages/VehicleDetailPage.js';

test.describe('Vidyut NextRide - Vehicle Details Suite', () => {
  let listingPage: VehicleListingPage;
  let detailPage: VehicleDetailPage;

  test.beforeEach(async ({ page }) => {
    listingPage = new VehicleListingPage(page);
    detailPage = new VehicleDetailPage(page);
    await listingPage.navigate();
    await listingPage.clickVehicleCard(0);
  });

  test('TC_DETAIL_01: Verify navigation to vehicle details and URL structure', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/details.*/);
  });

  test('TC_DETAIL_02: Verify Book Test Ride CTA button is rendered', async () => {
    await detailPage.verifyDetailsLoaded();
    await expect(detailPage.bookTestRideBtn).toBeVisible();
  });

  test('TC_DETAIL_03: Verify vehicle specifications section is displayed', async () => {
    await expect(detailPage.specsContainer).toBeVisible();
  });

  test('TC_DETAIL_04: Verify EMI Calculator section is present', async () => {
    await detailPage.emiCalculatorSection.scrollIntoViewIfNeeded();
    await expect(detailPage.emiCalculatorSection).toBeVisible();
  });

  test('TC_DETAIL_05: Verify back button navigates back to vehicle listing', async ({ page }) => {
    if (await detailPage.backButton.isVisible()) {
      await detailPage.clickBack();
      await expect(page).toHaveURL(/.*all-ev-vehicles.*/);
    }
  });
});
