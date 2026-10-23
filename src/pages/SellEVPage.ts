import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SellEVPage extends BasePage {
  readonly sellHeader: Locator;
  readonly whyChooseNextRide: Locator;
  readonly bookFreeInspectionBtn: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly requestCallbackBtn: Locator;
  readonly locationOverlay: Locator;

  constructor(page: Page) {
    super(page);
    this.sellHeader = page.locator('text=/Sell your EV|बिना किसी परेशानी के अपने ईवी को/i').first();
    this.whyChooseNextRide = page.locator('text=/Why choose Nextride|नेक्सट्राइड क्यों चुनें/i').first();
    this.bookFreeInspectionBtn = page.locator('button').filter({ hasText: /मुफ़्त निरीक्षण बुक करें|Book.*Inspection/i }).first();
    this.nameInput = page.locator('input[type="text"]').first();
    this.phoneInput = page.locator('input[type="text"], input[type="tel"]').nth(1);
    this.requestCallbackBtn = page.getByRole('button', { name: /Request call back|कॉल बैक/i }).first();
    this.locationOverlay = page.locator('.location_selection_overlay');
  }

  async navigate() {
    await this.page.goto('/sell-used-ev');
    await this.waitForOverlayToDisappear();
  }

  async waitForOverlayToDisappear() {
    try {
      await this.locationOverlay.waitFor({ state: 'hidden', timeout: 10000 });
    } catch {
      // overlay was not present or already hidden
    }
  }

  async clickBookFreeInspection() {
    await this.waitForOverlayToDisappear();
    await this.bookFreeInspectionBtn.scrollIntoViewIfNeeded();
    await this.bookFreeInspectionBtn.click();
    await this.page.waitForURL(/.*customer-enquiry.*/, { timeout: 15000 });
    await this.page.waitForLoadState('domcontentloaded');
  }
}
