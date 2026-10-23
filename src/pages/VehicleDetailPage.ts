import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class VehicleDetailPage extends BasePage {
  readonly backButton: Locator;
  readonly vehicleTitle: Locator;
  readonly vehiclePrice: Locator;
  readonly emiCalculatorSection: Locator;
  readonly bookTestRideBtn: Locator;
  readonly viewInspectionReportBtn: Locator;
  readonly specsContainer: Locator;
  readonly callUsBtn: Locator;
  readonly whatsAppBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.locator('button:has-text("←"), button[aria-label*="back"]').first();
    this.vehicleTitle = page.locator('h1, h2').first();
    this.vehiclePrice = page.locator('text=/₹/').first();
    this.emiCalculatorSection = page.locator('text=/EMI/i').locator('visible=true').first();
    this.bookTestRideBtn = page.getByRole('button', { name: /Book Test Ride|टेस्ट राइड बुक करें|बुक टेस्ट राइड/i }).first();
    this.viewInspectionReportBtn = page.getByRole('button', { name: /View Report|रिपोर्ट देखें|अमाउंट देखें/i }).first();
    this.specsContainer = page.getByText(/रजिस्ट्रेशन|Registration|KA02|DL|HR|Odometer|Battery/i).first();
    this.callUsBtn = page.locator('button, a').filter({ hasText: /Call|कॉल/i }).first();
    this.whatsAppBtn = page.locator('button, a').filter({ hasText: /WhatsApp/i }).first();
  }

  async verifyDetailsLoaded() {
    await expect(this.bookTestRideBtn).toBeVisible({ timeout: 15000 });
  }

  async clickBookTestRide() {
    await this.bookTestRideBtn.scrollIntoViewIfNeeded();
    await this.bookTestRideBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickBack() {
    await this.backButton.click();
    await this.waitForPageLoad();
  }
}
