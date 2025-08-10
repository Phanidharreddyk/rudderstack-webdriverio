Rudderstack SDET Assignment
Overview
Automation framework for Rudderstack flows using WebdriverIO and CucumberJS with a Page Object Model.
Setup

Clone the repo: git clone https://github.com/Phanidharreddyk/rudderstack-webdriverio.git

Install dependencies: npm install

Create a .env file in the project root with:
DEV_USERNAME=your_dev_email
DEV_PASSWORD=your_dev_password
DEV_BASE_URL=https://dev.app.rudderstack.com
QA_USERNAME=your_qa_email
QA_PASSWORD=your_qa_password
QA_BASE_URL=https://qa.app.rudderstack.com
PROD_USERNAME=your_prod_email
PROD_PASSWORD=your_prod_password
PROD_BASE_URL=https://app.rudderstack.com
WEBHOOK_URL=https://your.requestcatcher.com/test


Run tests locally:
ENV=dev npx wdio config/wdio.conf.js
ENV=qa npx wdio config/wdio.conf.js
ENV=prod npx wdio config/wdio.conf.js



Project Structure

features/: Cucumber feature files defining test scenarios
step-definitions/: Step implementations for Cucumber features
page-objects/: Page Object Model classes for each Rudderstack page
config/wdio.conf.js: WebdriverIO configuration file
allure-results/: Output directory for Allure test reports

CI/CD

Tests run daily at 18:30 UTC (midnight IST) via GitHub Actions.
The workflow tests only the prod environment by default.
The .env file is used for all environment variables (no GitHub Secrets required).

Test Execution

Tests use WebdriverIO with Chrome in headless mode for CI.
Tests timeout after 60 seconds per scenario.

Notes

Ensure Chrome is installed on the CI runner (handled by GitHub Actions).
The .env file dynamically sets the base URL based on the ENV variable (dev, qa, or prod).
Use npm install chromedriver@138.0.0 --save-dev to match the Chrome version if running locally.
Ensure the .env file is included in the CI environment (e.g., via GitHub Actions workflow configuration).
