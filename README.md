# Vidyut NextRide - E2E Automation Testing Framework

An end-to-end test automation framework for the **Vidyut NextRide** application built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern.

---

## ⚡ Features

- **Page Object Model (POM):** Decoupled, reusable page abstractions and UI components.
- **Cross-Browser & Multi-Device:** Pre-configured for Chromium Desktop (1440x900) and Mobile Chrome (Pixel 5).
- **Environment Driven:** Seamlessly toggle between Production (`https://vidyutnextride.com`) and UAT (`https://uat.vidyutnextride.com`).
- **Rich Failure Artifacts:** Automatic screenshots, step-by-step videos, and execution trace viewer zips on retry.
- **Fast Execution:** Fully parallel test runners executing 30 test scenarios in under 40 seconds.
- **Comprehensive Coverage:** Homepage, Vehicle Catalog, Detailed Specs & EMI Calculator, 3-Step Recommendation Quiz, Seller Flow & Lead Capture, Multi-lingual i18n (English/Hindi), and City Selection.

---

## 📁 Project Structure

```
├── playwright.config.ts        # Playwright runner configuration
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration with path aliases
├── .env.example                # Environment template
├── TEST_PLAN.md                # Comprehensive test strategy and architectural scope
├── TEST_CASES.md               # 30-case exhaustive test specification matrix
├── src/
│   ├── components/             # Reusable composite UI components
│   │   └── HeaderComponent.ts  # City selector, language toggle, and logo
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.ts         # Shared navigation, network stability, and footer
│   │   ├── HomePage.ts         # Hero banner, carousel, reviews, and FAQs
│   │   ├── VehicleListingPage.ts # Catalog, card interactions, filter, and sorting
│   │   ├── VehicleDetailPage.ts  # Specs, gallery, EMI calculator, and test ride CTA
│   │   ├── QuizPage.ts         # 3-step "Find My EV" questionnaire
│   │   └── SellEVPage.ts       # Sell landing page and customer enquiry form
│   ├── fixtures/
│   │   └── testData.ts         # Test data constants, routes, and expected values
│   └── utils/
│       └── helpers.ts          # Network synchronization, number extraction helpers
└── tests/                      # Test suites
    ├── home.spec.ts            # Homepage suite (8 tests)
    ├── listing.spec.ts         # Vehicle listing suite (6 tests)
    ├── details.spec.ts         # Vehicle detail suite (5 tests)
    ├── quiz.spec.ts            # Find My EV quiz suite (4 tests)
    ├── sell.spec.ts            # Sell EV and lead enquiry suite (4 tests)
    └── localization-and-location.spec.ts # Language and city suite (3 tests)
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v24 recommended)
- **npm:** v9.0.0 or higher

### 2. Install Dependencies & Browsers
```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install chromium
```

### 3. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `BASE_URL`: `https://vidyutnextride.com`  
To run against UAT: set `BASE_URL=https://uat.vidyutnextride.com` in `.env`.

---

## 🧪 Test Execution Commands

| Command | Description |
| :--- | :--- |
| `npm test` | Run all test suites in headless mode |
| `npm run test:headed` | Run tests with browser UI visible |
| `npm run test:ui` | Open interactive Playwright UI mode (time-travel debugging) |
| `npm run test:report` | Serve and view the HTML execution report |
| `npm run test:home` | Run only the Homepage test suite |
| `npm run test:listing` | Run only the Vehicle Listing test suite |
| `npm run test:details` | Run only the Vehicle Details & EMI test suite |
| `npm run test:quiz` | Run only the "Find My EV" Quiz test suite |
| `npm run test:sell` | Run only the Sell EV and Lead Enquiry test suite |
| `npm run chromatic` | Upload visual test archives to Chromatic |

---

## 🎨 Visual Regression Testing with Chromatic

Tests import `{ test, expect } from '@chromatic-com/playwright'`, capturing full DOM and visual snapshots on test completion into `test-results/chromatic-archives/`.

To publish and review visual baselines on Chromatic:
```bash
# 1. Run tests to capture archives
npx playwright test

# 2. Upload to Chromatic
npx chromatic --playwright -t <YOUR_CHROMATIC_PROJECT_TOKEN>
```


## 📊 Viewing Test Reports
After executing tests, view the interactive HTML report with step timelines and failure media:
```bash
npx playwright show-report
```

---

## 🛠️ Debugging Tests
- **Trace Viewer:** Open any generated trace zip from `test-results/`:
  ```bash
  npx playwright show-trace test-results/<test-run-folder>/trace.zip
  ```
- **Debug Mode:** Step through tests interactively with the Playwright Inspector:
  ```bash
  npx playwright test --debug
  ```
