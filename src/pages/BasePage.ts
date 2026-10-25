import { Page, Locator, expect } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { waitForNetworkIdleAndStable } from '../utils/helpers.js';

export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = page.locator('footer, [class*="footer"], div:has-text("Need Help ?"), div:has-text("Quick links")').last();
    this.toast = page.locator('[data-sonner-toaster], .toast, [role="status"]').first();
    this.initClientStabilizers();
  }

  private initClientStabilizers() {
    this.page.addInitScript(() => {
      if ((window as any).__vnr_stabilized) return;
      (window as any).__vnr_stabilized = true;
      const origGet = URLSearchParams.prototype.get;
      const origHas = URLSearchParams.prototype.has;
      URLSearchParams.prototype.get = function(name: string) {
        if (name === 'override') return 'false';
        return origGet.apply(this, arguments as any);
      };
      URLSearchParams.prototype.has = function(name: string) {
        if (name === 'override') return false;
        return origHas.apply(this, arguments as any);
      };
    }).catch(() => {});
  }

  async goto(path = '/') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await waitForNetworkIdleAndStable(this.page);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer).toBeVisible();
  }
}
