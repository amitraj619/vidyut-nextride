import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class VehicleListingPage extends BasePage {
  readonly vehicleCards: Locator;
  readonly filterSidebar: Locator;
  readonly clearAllBtn: Locator;
  readonly applyFilterBtn: Locator;
  readonly sortNewlyAdded: Locator;
  readonly sortPriceLowHigh: Locator;
  readonly sortPriceHighLow: Locator;
  readonly cargoFilter: Locator;
  readonly passengerFilter: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    this.vehicleCards = page.locator('.vehicle_card_v2');
    this.filterSidebar = page.getByRole('button', { name: /Filters & Sort|Filters|फ़िल्टर/i }).or(page.locator('text=/Vehicle Type|Brand|Price range|KMs driven/i')).first();
    this.clearAllBtn = page.getByRole('button', { name: /Clear all|सभी हटाएं/i }).first();
    this.applyFilterBtn = page.getByRole('button', { name: /Apply|लागू करें/i }).first();
    this.sortNewlyAdded = page.locator('text=/Newly added|हाल ही में जोड़ा गया/i').first();
    this.sortPriceLowHigh = page.locator('text=/Price: low to high|कीमत: कम से ज्यादा/i').first();
    this.sortPriceHighLow = page.locator('text=/Price: high to low|कीमत: ज्यादा से कम/i').first();
    this.cargoFilter = page.locator('label, span, div').filter({ hasText: /^Cargo$/i }).first();
    this.passengerFilter = page.locator('label, span, div').filter({ hasText: /^Passenger$/i }).first();
    this.emptyState = page.locator('text=/No results found|कोई गाड़ी नहीं मिली/i').first();
  }

  async navigate(city = '') {
    const path = city ? `/all-ev-vehicles?city=${encodeURIComponent(city)}` : '/all-ev-vehicles';
    await this.goto(path);
  }

  async getVehicleCardsCount(): Promise<number> {
    await this.vehicleCards.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    return await this.vehicleCards.count();
  }

  async clickVehicleCard(index = 0) {
    const card = this.vehicleCards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();

    const viewDetailBtn = card.locator('text=/View Detail|विवरण देखें/i').first();
    if (await viewDetailBtn.isVisible()) {
      await viewDetailBtn.click();
    } else {
      await card.click();
    }
    await this.waitForPageLoad();
  }

  async filterByVehicleType(type: 'Cargo' | 'Passenger') {
    const filter = type === 'Cargo' ? this.cargoFilter : this.passengerFilter;
    if (await filter.isVisible()) {
      await filter.scrollIntoViewIfNeeded();
      await filter.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async sortByPriceLowToHigh() {
    const mobileFilterBtn = this.page.getByRole('button', { name: /Filters & Sort|Filters|फ़िल्टर/i }).first();
    if (await mobileFilterBtn.isVisible()) {
      await mobileFilterBtn.click();
      const dialog = this.page.locator('[role="dialog"], .ant-drawer, .ant-modal').first();
      await dialog.waitFor({ state: 'visible', timeout: 5000 });
      const sortTab = dialog.getByRole('tab', { name: /Sort|सॉर्ट/i });
      if (await sortTab.isVisible()) {
        await sortTab.click();
      }
      const option = dialog.locator('label, span').filter({ hasText: /Price: low to high|कीमत: कम से ज्यादा/i }).first();
      await option.click();
      const applyBtn = dialog.getByRole('button', { name: /Apply|लागू करें/i }).first();
      if (await applyBtn.isVisible()) {
        await applyBtn.click();
      }
    } else {
      await this.sortPriceLowHigh.scrollIntoViewIfNeeded();
      await this.sortPriceLowHigh.click();
    }
    await this.page.waitForTimeout(1000);
  }
}
