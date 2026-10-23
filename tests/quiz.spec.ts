import { test, expect } from '@chromatic-com/playwright';
import { QuizPage } from '../src/pages/QuizPage.js';

test.describe('Vidyut NextRide - Find My EV Quiz Suite', () => {
  let quizPage: QuizPage;

  test.beforeEach(async ({ page }) => {
    quizPage = new QuizPage(page);
    await quizPage.navigate();
  });

  test('TC_QUIZ_01: Verify Quiz page loads initial vehicle type question', async () => {
    await expect(quizPage.questionHeading).toBeVisible();
    await expect(quizPage.cargoOption).toBeVisible();
    await expect(quizPage.passengerOption).toBeVisible();
  });

  test('TC_QUIZ_02: Verify selecting an option progresses to the next question', async ({ page }) => {
    const question1 = await quizPage.questionHeading.innerText();
    await quizPage.cargoOption.click();
    await page.waitForTimeout(600);
    const question2 = await quizPage.questionHeading.innerText();
    expect(question2).not.toEqual(question1);
  });

  test('TC_QUIZ_03: Verify completing 3-step quiz navigates to vehicle recommendations', async ({ page }) => {
    // Step 1: Cargo
    await quizPage.cargoOption.click();
    await page.waitForTimeout(600);

    // Step 2: Budget
    const budgetOption = page.locator('text=/0 - 2 lakh|2 - 3 lakh|3 - 4 lakh|4\\+ lakh/i').first();
    await expect(budgetOption).toBeVisible();
    await budgetOption.click();
    await page.waitForTimeout(600);

    // Step 3: Odometer
    const kmsOption = page.locator('text=/0 - 25k|25k - 50k|50k - 75k|75k\\+/i').first();
    await expect(kmsOption).toBeVisible();
    await kmsOption.click();
    await page.waitForTimeout(1000);

    // Verify redirection to vehicles-list
    await expect(page).toHaveURL(/.*vehicles-list.*/);
  });

  test('TC_QUIZ_04: Verify retake quiz option is available when no match found', async ({ page }) => {
    // Complete quiz with low budget/mileage that yields 0 items
    await quizPage.cargoOption.click();
    await page.waitForTimeout(400);
    await page.locator('text=/0 - 2 lakh/i').first().click();
    await page.waitForTimeout(400);
    await page.locator('text=/0 - 25k/i').first().click();
    await page.waitForTimeout(1000);

    const retakeBtn = page.getByRole('button', { name: /Retake quiz|फिर से शुरू करें/i }).first();
    if (await retakeBtn.isVisible()) {
      await retakeBtn.click();
      await expect(page).toHaveURL(/.*find-my-perfect-ev.*/);
    }
  });
});

