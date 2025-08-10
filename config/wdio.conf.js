// wdio.conf.js
import dotenv from "dotenv";
import path from "path";

const env = process.env.ENV || 'dev';
// Load the single .env file
const envFilePath = path.resolve(process.cwd(), '.env');
// Fallback to default URL if not specified in .env
const baseUrl = process.env[`${env.toUpperCase()}_BASE_URL`] || 'https://app.rudderstack.com';
dotenv.config({ path: envFilePath });

export const config = {
  // ... rest of the configuration remains unchanged
  runner: 'local',
  specs: ['../features/**/*.feature'],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless', // Assuming headless for CI
        '--no-sandbox',
        '--disable-dev-shm-usage', // Common for CI environments
        `--user-data-dir=/tmp/chrome-user-data-${process.pid}-${Date.now()}` // Unique directory
      ]
    }
  }],
  logLevel: 'debug',
  baseUrl,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'cucumber',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  cucumberOpts: {
    require: [
      "./features/step-definitions/steps.js",
      "./features/support/hooks.js"
    ],
    requireModule: [],
    backtrace: true,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: true,
    timeout: 60000,
    ignoreUndefinedDefinitions: false
  },
  onPrepare() {
    console.log(`Starting WebdriverIO tests for ${env} environment with base URL: ${baseUrl}`);
  },
  after() {
    console.log('Tests completed.');
  }
};