import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;
  readonly cityButton: Locator;
  readonly languageToggleButton: Locator;
  readonly englishBtn: Locator;
  readonly hindiBtn: Locator;
  readonly whatsAppButton: Locator;
  readonly antModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="nextride"]').first();
    this.cityButton = page.locator('button').filter({ hasText: /Bengaluru|Delhi|Hyderabad|Select City|शहर/i }).first();
    this.languageToggleButton = page.locator('.language_btn, .language_switch_container').first();
    this.englishBtn = page.locator('.language_btn').filter({ hasText: 'En' }).first();
    this.hindiBtn = page.locator('.language_btn').filter({ hasText: 'हि' }).first();
    this.whatsAppButton = page.locator('a[href*="whatsapp.com"], a[href*="wa.me"], button:has-text("WhatsApp")').first();
    this.antModal = page.locator('.ant-modal-content');
  }

  async verifyHeaderElements() {
    await expect(this.cityButton).toBeVisible();
  }

  async openCitySelector() {
    try {
      await this.page.removeLocatorHandler(
        this.page.locator('.ant-modal-content').filter({ hasText: /Select city|शहर चुनें/i })
      );
    } catch {}
    await this.cityButton.click();
    await expect(this.antModal).toBeVisible({ timeout: 5000 });
  }

  async selectCity(cityName: string) {
    await this.openCitySelector();
    const cityOption = this.antModal.getByText(cityName, { exact: false }).first();
    await expect(cityOption).toBeVisible({ timeout: 5000 });
    await cityOption.click();
    await this.page.waitForTimeout(1000);
  }

  async switchToHindi() {
    if (await this.hindiBtn.isVisible()) {
      await this.hindiBtn.click();
    } else {
      await this.languageToggleButton.click();
    }
    await this.page.waitForTimeout(600);
  }

  async switchToEnglish() {
    if (await this.englishBtn.isVisible()) {
      await this.englishBtn.click();
    } else {
      await this.languageToggleButton.click();
    }
    await this.page.waitForTimeout(600);
  }
}
