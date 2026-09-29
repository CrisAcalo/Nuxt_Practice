import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3056',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'node tests/fixtures/dummyjson.mjs',
      url: 'http://127.0.0.1:3057/health',
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 3056',
      url: 'http://127.0.0.1:3056',
      env: { DUMMYJSON_BASE_URL: 'http://127.0.0.1:3057' },
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
})
