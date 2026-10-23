import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly viewBestDealsBtn: Locator;
  readonly findMyEvBtn: Locator;
  readonly brandLogos: Locator;
  readonly whyChooseSection: Locator;
  readonly customerReviewsSection: Locator;
  readonly faqSection: Locator;
  readonly faqItems: Locator;
  readonly callUsBtn: Locator;
  readonly whatsAppBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.locator('text=/Switch to Electric|इलेक्ट्रिक पर स्विच करें/i').first();
    this.viewBestDealsBtn = page.locator('button').filter({ hasText: /View Best Deals|अच्छी डील देखें/i }).first();
    this.findMyEvBtn = page.locator('button').filter({ hasText: /Find my EV|अपनी ईवी खोजें/i }).first();
    this.brandLogos = page.locator('img[alt*="_logo"], img[alt*="logo"]');
    this.whyChooseSection = page.locator('text=/Why choose Nextride|NextRide को क्यों चुनें/i').first();
    this.customerReviewsSection = page.locator('text=/Trusted by India|EV Pioneers|कस्टमर रिव्यू|Real stories/i').first();
    this.faqSection = page.locator('text=/Frequently Asked Questions|अक्सर पूछे जाने वाले सवाल|FAQ/i').first();
    this.faqItems = page.locator('.accordion-item, [class*="faq-item"], [class*="accordion"]');
    this.callUsBtn = page.locator('button, a').filter({ hasText: /Call Us|कॉल करें/i }).first();
    this.whatsAppBtn = page.locator('button, a').filter({ hasText: /WhatsApp/i }).first();
  }

  async navigate(city = '') {
    const path = city ? `/?city=${encodeURIComponent(city)}` : '/';
    await this.goto(path);
  }

  async clickBestDeals() {
    await this.viewBestDealsBtn.scrollIntoViewIfNeeded();
    await this.viewBestDealsBtn.click();
    await this.waitForPageLoad();
  }

  async clickFindMyEV() {
    await this.findMyEvBtn.scrollIntoViewIfNeeded();
    await this.findMyEvBtn.click();
    await this.waitForPageLoad();
  }

  async expandFaq(index = 0) {
    await this.faqSection.scrollIntoViewIfNeeded();
    const item = this.faqItems.nth(index);
    if (await item.isVisible()) {
      await item.click();
      await this.page.waitForTimeout(400);
    }
  }
}
