// Framework Help
// This file documents practical snippets and instructions for the current framework.

// 1) Create A Page And Link It To baseTest
// Step 1: Create a page file in tests/pages (example: tests/pages/RewardsPage.js).
export const CREATE_PAGE_EXAMPLE = `export class RewardsPage {
  constructor(page) {
    this.page = page;
    this.rewardsLink = page.getByRole('link', { name: /Rewards/i });
  }

  async open() {
    await this.rewardsLink.click();
  }
}`;

// Step 2: Import the page in tests/fixtures/baseTest.js.
export const BASETEST_IMPORT_EXAMPLE = `import { RewardsPage } from '../pages/RewardsPage.js';`;

// Step 3: Register page inside app object in baseTest.
export const BASETEST_REGISTER_EXAMPLE = `const app = {
  // ...
  rewardsPage: new RewardsPage(page),
  // ...
};`;

// Step 4: Use it in specs via app.
export const SPEC_PAGE_USAGE_EXAMPLE = `await app.rewardsPage.open();`;

// Naming convention (recommended):
// File: SomethingPage.js
// Class: SomethingPage
// app key: somethingPage

// 2) Create A Spec/Test And Link It To baseTest
// Step 1: Create a spec in tests/specs (example: tests/specs/TC-999_Template.spec.js).
// Step 2: Import test/expect from fixture (NOT from @playwright/test directly).
export const SPEC_IMPORT_EXAMPLE = `import { test, expect } from '../fixtures/baseTest.js';`;

// Step 3: Use fixture context in test signature and call app helpers.
export const SPEC_TEMPLATE_EXAMPLE = `test('My Scenario', async ({ page, app }) => {
  await app.signInExisting();
  await app.homePage.homepageMenu();
  await expect(page).toHaveURL(/menu/i);
});`;

// Step 4: Use shared helpers from app when possible:
// - app.signInExisting()
// - app.openSignupProtected()
// - app.<pageObject>.<action>()
// Step 5: Keep waits state-based; avoid waitForTimeout.
// Step 6: Run only your spec.
export const RUN_SPEC_EXAMPLE = `npx playwright test tests/specs/TC-999_Template.spec.js --project=chromium --reporter=line`;

// 3) Maintain And Update baseTest
// What belongs in baseTest:
// - Shared setup flows used by many specs
// - Shared page object/component wiring
// - Environment-backed defaults
// What should not grow too much:
// - Test-specific one-off logic
// - Large scenario branching for a single test
// Safe checklist:
// 1. Add/import object
// 2. Register in app with clear key
// 3. Keep helpers small/reusable
// 4. Prefer process.env for unstable values
// 5. Run targeted + smoke tests
// Parallel notes:
// - Prefer worker-safe account pools (TEST_USER_EMAILS)
// - Mark fragile shared-state tests with @stateful
// Refactor notes:
// - If used once, keep in spec
// - If reused 3+ times, promote to page object or fixture helper

export const HELP_VERSION = '1.0.0';
