# Vidyut NextRide - Test Cases Matrix

This document provides the exhaustive specification of test cases covering functional, regression, UI, localization, and navigation workflows.

| Test Case ID | Test Title | Module / Area | Priority | Execution Type | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_HOME_01** | Verify Homepage loads with valid title & header controls | Homepage | P0 | Automated | **Passed** |
| **TC_HOME_02** | Verify Hero section and "View Best Deals" CTA render | Homepage | P0 | Automated | **Passed** |
| **TC_HOME_03** | Verify "Find my EV" CTA navigates to Quiz page | Homepage | P1 | Automated | **Passed** |
| **TC_HOME_04** | Verify Brand Carousel displays OEM partner logos | Homepage | P1 | Automated | **Passed** |
| **TC_HOME_05** | Verify "Why Choose NextRide" feature section displays | Homepage | P1 | Automated | **Passed** |
| **TC_HOME_06** | Verify Customer Reviews & testimonials display | Homepage | P2 | Automated | **Passed** |
| **TC_HOME_07** | Verify FAQ accordion expansion & answer visibility | Homepage | P2 | Automated | **Passed** |
| **TC_HOME_08** | Verify footer renders quick links, policies & contact info | Homepage | P2 | Automated | **Passed** |
| **TC_LIST_01** | Verify vehicle listing page loads and renders vehicle cards | Vehicle Listing | P0 | Automated | **Passed** |
| **TC_LIST_02** | Verify vehicle card displays price (₹), mileage, specs | Vehicle Listing | P0 | Automated | **Passed** |
| **TC_LIST_03** | Verify filter controls / sidebar categories are available | Vehicle Listing | P1 | Automated | **Passed** |
| **TC_LIST_04** | Verify clicking vehicle card navigates to `:vehicleId/details` | Vehicle Listing | P0 | Automated | **Passed** |
| **TC_LIST_05** | Verify city query param (`?city=...`) persists in listing URL | Vehicle Listing | P1 | Automated | **Passed** |
| **TC_LIST_06** | Verify sorting option (Price Low to High) functions | Vehicle Listing | P1 | Automated | **Passed** |
| **TC_DETAIL_01** | Verify vehicle details URL structure and route loading | Vehicle Detail | P0 | Automated | **Passed** |
| **TC_DETAIL_02** | Verify "Book Test Ride" CTA button is visible & interactive | Vehicle Detail | P0 | Automated | **Passed** |
| **TC_DETAIL_03** | Verify vehicle specs (registration, battery, odometer) render | Vehicle Detail | P0 | Automated | **Passed** |
| **TC_DETAIL_04** | Verify EMI Calculator section is present and calculated | Vehicle Detail | P1 | Automated | **Passed** |
| **TC_DETAIL_05** | Verify back button navigates back to vehicle catalog | Vehicle Detail | P2 | Automated | **Passed** |
| **TC_QUIZ_01** | Verify Find My EV Quiz loads initial vehicle type step | Quiz Flow | P1 | Automated | **Passed** |
| **TC_QUIZ_02** | Verify option selection progresses to subsequent question | Quiz Flow | P1 | Automated | **Passed** |
| **TC_QUIZ_03** | Verify completing 3-step quiz redirects to recommendations | Quiz Flow | P0 | Automated | **Passed** |
| **TC_QUIZ_04** | Verify Retake Quiz CTA when 0 matches found | Quiz Flow | P2 | Automated | **Passed** |
| **TC_SELL_01** | Verify Sell EV page renders headline and benefits section | Sell EV | P0 | Automated | **Passed** |
| **TC_SELL_02** | Verify "Book Free Inspection" navigates to enquiry form | Sell EV | P0 | Automated | **Passed** |
| **TC_SELL_03** | Verify customer enquiry form displays Name & Phone inputs | Sell EV | P0 | Automated | **Passed** |
| **TC_SELL_04** | Verify entering valid seller details enables Request Callback | Sell EV | P1 | Automated | **Passed** |
| **TC_LOC_01** | Verify language toggle switches UI between English and Hindi | Localization | P0 | Automated | **Passed** |
| **TC_LOC_02** | Verify selecting city from modal updates URL & header display | Location | P0 | Automated | **Passed** |
| **TC_LOC_03** | Verify language toggle and City selector are visible in header | Header | P1 | Automated | **Passed** |

---

## Detailed Test Case Specifications

### TC_HOME_01: Verify Homepage Title & Header Controls
- **Description:** Ensure user lands on homepage with valid SEO title and visible header elements.
- **Steps:**
  1. Navigate to `/`.
  2. Read page title and verify against expected regex `/Vidyut NextRide|Used Electric Auto/i`.
  3. Verify City selection button and Language toggle are visible in Header.
- **Expected Result:** Title matches branding and header elements are rendered.

### TC_LIST_04: Vehicle Card Navigation to Details
- **Description:** Verify user can browse the vehicle catalogue and open detailed specifications.
- **Steps:**
  1. Navigate to `/all-ev-vehicles`.
  2. Wait for `.vehicle_card_v2` elements to render.
  3. Click "View Details" on the first vehicle card.
- **Expected Result:** Application navigates to `/buy-used-ev/:vehicleId/details?city=...`.

### TC_QUIZ_03: Complete Find My EV Recommendation Flow
- **Description:** Verify user can answer the 3 questionnaire steps to obtain personalized recommendations.
- **Steps:**
  1. Navigate to `/find-my-perfect-ev`.
  2. Select vehicle category (`Cargo`).
  3. Select budget bracket (`0 - 2 lakh`).
  4. Select odometer preference (`0 - 25k`).
- **Expected Result:** Application redirects to `/find-my-perfect-ev/vehicles-list?city=...`.

### TC_SELL_04: Seller Enquiry Form Validation
- **Description:** Verify seller lead capture enables callback request upon valid input.
- **Steps:**
  1. Navigate to `/sell-used-ev`.
  2. Click "Book Free Inspection" button.
  3. Fill full name (`Sunil Kumar`) and valid 10-digit Indian phone number (`9876543210`).
- **Expected Result:** "Request call back" button transitions to active / enabled state.

### TC_LOC_01: Multi-lingual Localization Toggle
- **Description:** Verify dynamic i18n translation without page reload.
- **Steps:**
  1. Open homepage in English.
  2. Click the Hindi (`हि`) language button in the header.
  3. Verify `document.documentElement.lang` changes to `hi`.
  4. Click the English (`En`) language button.
  5. Verify `document.documentElement.lang` reverts to `en`.
- **Expected Result:** Language seamlessly updates across DOM and UI text components.
