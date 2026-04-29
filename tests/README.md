# Test Framework Quick Start

This project uses a fixture-based Playwright framework.

Main entrypoint for tests:
- `tests/fixtures/baseTest.js`

## 1) Create A New Page

1. Add a file in `tests/pages`, for example `RewardsPage.js`.
2. Export a class that receives `page` in constructor.
3. Add actions as methods.

Example:

```js
export class RewardsPage {
  constructor(page) {
    this.page = page;
    this.rewardsLink = page.getByRole('link', { name: /Rewards/i });
  }

  async open() {
    await this.rewardsLink.click();
  }
}
```

## 2) Link Page To `baseTest`

In `tests/fixtures/baseTest.js`:

1. Import your page:

```js
import { RewardsPage } from '../pages/RewardsPage.js';
```

2. Register it in `app`:

```js
rewardsPage: new RewardsPage(page),
```

Then in tests you can call:

```js
await app.rewardsPage.open();
```

## 3) Create A New Spec

1. Add file in `tests/specs`, for example `TC-999_New.spec.js`.
2. Import from fixture:

```js
import { test, expect } from '../fixtures/baseTest.js';
```

3. Use `{ app, page }` in test:

```js
test('My Scenario', async ({ app, page }) => {
  await app.signInExisting();
  await app.homePage.homepageMenu();
  await expect(page).toHaveURL(/menu/i);
});
```

## 4) Run Tests

Run one spec:

```bash
npx playwright test tests/specs/TC-999_New.spec.js --project=chromium --reporter=line
```

Run all:

```bash
npm test
```

Stateful tests only:

```bash
npm run test:stateful
```

## 5) Rules For Stable Tests

- Prefer state-based waits (`toBeVisible`, `toHaveURL`, `waitFor`).
- Avoid `waitForTimeout`.
- Reuse fixture helpers (`app.signInExisting`, `app.openSignupProtected`).
- Keep page objects focused and small.
- Use env values instead of hardcoded credentials.

## 6) Where To Look

- Framework fixture: `tests/fixtures/baseTest.js`
- Page objects: `tests/pages`
- Components: `tests/components`
- Specs: `tests/specs`
- Example templates:
  - `e2e/temp/TC-013_Template_New_Framework.spec.js`
  - `tests/specs/TC-914_Template_Signup_Framework.spec.js`
  - `tests/specs/TC-915_Template_Rewards_Framework.spec.js`
