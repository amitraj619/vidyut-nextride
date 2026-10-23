import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class QuizPage extends BasePage {
  readonly quizHeader: Locator;
  readonly questionHeading: Locator;
  readonly optionsList: Locator;
  readonly cargoOption: Locator;
  readonly passengerOption: Locator;
  readonly nextButton: Locator;
  readonly restartQuizBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.quizHeader = page.locator('text=/Find my perfect EV|परफेक्ट ईवी खोजें/i').first();
    this.questionHeading = page.locator('h1, h2, h3, [class*="question"]').first();
    this.optionsList = page.locator('.quiz-option, [class*="option"], [class*="quiz"] button, [class*="quiz"] div[role="button"]');
    this.cargoOption = page.locator('text=/Cargo|कार्गो/i').first();
    this.passengerOption = page.locator('text=/Passenger|पैसेंजर/i').first();
    this.nextButton = page.getByRole('button', { name: /Next|आगे|Submit/i }).first();
    this.restartQuizBtn = page.getByRole('button', { name: /Restart|फिर से शुरू करें/i }).first();
  }

  async navigate() {
    await this.goto('/find-my-perfect-ev');
  }

  async selectFirstOption() {
    // Select first clickable choice
    const option = pageLocatorOption(this.page);
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await this.page.waitForTimeout(600);
  }

  async completeQuizFlow() {
    // Answer up to 3 quiz steps
    for (let step = 0; step < 3; step++) {
      const option = pageLocatorOption(this.page);
      if (await option.isVisible()) {
        await option.click();
        await this.page.waitForTimeout(600);
      } else {
        break;
      }
    }
  }
}

function pageLocatorOption(page: Page): Locator {
  return page.locator('[class*="card"], [class*="option"], button, [role="button"]')
    .filter({ hasText: /Cargo|Passenger|0-2|2-3|3-4|4\+|25,000|50,000|75,000|Lakh|लाख/i })
    .first();
}
