import { defineConfig, devices } from '@playwright/test';
import { loadEnvFile } from './tests/utils/loadEnv.js';

loadEnvFile();

const hasAccountPool = Boolean(process.env.TEST_USER_EMAILS?.trim());

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI || !hasAccountPool ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || undefined,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      grepInvert: /@stateful/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-stateful',
      grep: /@stateful/,
      fullyParallel: false,
      workers: 1,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
