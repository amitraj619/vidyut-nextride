# Test Plan: Vidyut NextRide Test Automation Framework

## 1. Introduction
This document defines the comprehensive test automation strategy and test plan for **Vidyut NextRide**, India's trusted digital marketplace for commercial and passenger electric vehicles (EVs).

The primary objective is to guarantee application stability, reliable vehicle exploration and filtering, lead funnel accuracy, seamless multi-lingual localization (English & Hindi), dynamic city switching, and responsive user experience across desktop and mobile devices.

---

## 2. Scope

### In-Scope
- **Homepage:** Hero banner, OEM Brand Carousel, "Why Choose NextRide", Customer Testimonials, FAQ accordion, Footer contact links.
- **Vehicle Catalog (Buy EV):** Search & listing display, vehicle cards, pricing, battery specs, filter controls (Cargo/Passenger, OEM brands, Price range, Odometer, Reg Year), sorting (Price low-to-high, high-to-low, newly added).
- **Vehicle Details:** High-resolution vehicle gallery, technical specifications (registration, battery capacity, RTO, ownership), EMI Calculator widget, and "Book Test Ride" lead action.
- **Find My EV Quiz:** 3-step interactive lifestyle & usage questionnaire leading to curated inventory recommendations.
- **Sell Used EV Flow:** Value proposition, "Book Free Inspection" trigger, customer enquiry submission form (Name & Phone number validation).
- **Localization (i18n):** Real-time switching between English (`en`) and Hindi (`hi`), verifying UI text translation and attribute synchronization.
- **City & Geolocation:** Dynamic city selector modal (Ant Design integration), URL query param reflection (`?city=...`), and automatic regional handling.

### Out-of-Scope (Automated Mock / Sandbox Only)
- End-to-end OTP submission with third-party SMS gateways.
- Production payment gateway processing.

---

## 3. Test Automation Architecture

The framework is implemented using **Playwright with TypeScript**, adhering to the **Page Object Model (POM)** architectural design pattern:

```
├── playwright.config.ts        # Runner configuration (browsers, timeouts, reporters)
├── src/
│   ├── components/             # Reusable composite UI locators (Header, City Modal)
│   │   └── HeaderComponent.ts
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.ts         # Shared base methods (navigation, toasts, footer)
│   │   ├── HomePage.ts         # Landing page interactions
│   │   ├── VehicleListingPage.ts # Catalog, filtering, and sorting
│   │   ├── VehicleDetailPage.ts  # Specs, gallery, EMI calculator
│   │   ├── QuizPage.ts         # "Find My EV" questionnaire steps
│   │   └── SellEVPage.ts       # Seller lead capture & form validations
│   ├── fixtures/
│   │   └── testData.ts         # Master test data, routes, and expected constants
│   └── utils/
│       └── helpers.ts          # Network synchronization, DOM utilities, parsers
└── tests/                      # Test suites
    ├── home.spec.ts            # TC_HOME_01 to TC_HOME_08
    ├── listing.spec.ts         # TC_LIST_01 to TC_LIST_06
    ├── details.spec.ts         # TC_DETAIL_01 to TC_DETAIL_05
    ├── quiz.spec.ts            # TC_QUIZ_01 to TC_QUIZ_04
    ├── sell.spec.ts            # TC_SELL_01 to TC_SELL_04
    └── localization-and-location.spec.ts # TC_LOC_01 to TC_LOC_03
```

---

## 4. Test Environments

| Environment | Base URL | Purpose |
| :--- | :--- | :--- |
| **Production** | `https://vidyutnextride.com` | Sanity, smoke testing, and regression verification |
| **UAT / Staging** | `https://uat.vidyutnextride.com` | Feature branch testing and release candidate sign-off |

---

## 5. Execution Strategy & Reporting
- **Parallel Workers:** Configured for 4 parallel workers on desktop for fast feedback (~40 seconds full execution).
- **Headless & Headed Modes:** Headless execution enabled by default for CI/CD pipelines; headed and UI mode supported for local debugging.
- **Artifacts on Failure:** Automatic capture of screenshot, video recording, and Playwright execution trace zip for any failing test.
- **Reporting:** HTML report with searchable results, step timelines, and captured media (`npx playwright show-report`).
