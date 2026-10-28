import { test, expect } from '@chromatic-com/playwright';
import { VehicleListingPage } from '../src/pages/VehicleListingPage.js';

test.describe('Vidyut NextRide - Vehicle Listing Suite', () => {
  let listingPage: VehicleListingPage;

  test.beforeEach(async ({ page }) => {
    listingPage = new VehicleListingPage(page);
    await listingPage.navigate();
  });

  test('TC_LIST_01: Verify vehicle listing page loads and renders cards', async () => {
    const cardCount = await listingPage.getVehicleCardsCount();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('TC_LIST_02: Verify vehicle card displays key information (price, specs)', async () => {
    const firstCard = listingPage.vehicleCards.first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard).toContainText(/₹/);
  });

  test('TC_LIST_03: Verify filter sidebar and options are available', async () => {
    await expect(listingPage.filterSidebar).toBeVisible();
  });

  test('TC_LIST_04: Verify clicking vehicle card navigates to vehicle detail page', async ({ page }) => {
    await listingPage.clickVehicleCard(0);
    await expect(page).toHaveURL(/.*\/details.*/);
  });

  test('TC_LIST_05: Verify city parameter is maintained in listing URL', async ({ page }) => {
    await listingPage.navigate('Bengaluru');
    const url = page.url();
    expect(url).toMatch(/city=/);
  });

  test('TC_LIST_06: Verify sorting by Price Low to High is clickable', async () => {
    await listingPage.sortByPriceLowToHigh();
    const count = await listingPage.getVehicleCardsCount();
    expect(count).toBeGreaterThan(0);
  });
});
