# Rudderstack SDET Assignment

## Overview
Automation framework for Rudderstack flows using WebdriverIO and CucumberJS with a Page Object Model.

## Setup
1. Clone the repo: `git clone https://github.com/yourusername/rudderstack-sdet-assignment.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the project root with:

   DEV_USERNAME=your_dev_email   DEV_PASSWORD=your_dev_password   QA_USERNAME=your_qa_email   QA_PASSWORD=your_qa_password   PROD_USERNAME=your_prod_email   PROD_PASSWORD=your_prod_password   WEBHOOK_URL=https://your.requestcatcher.com/test
4. Run tests locally:
```bash
ENV=dev npx wdio config/wdio.conf.js
ENV=qa npx wdio config/wdio.conf.js
ENV=prod npx wdio config/wdio.conf.js

Structure

features: Cucumber feature files
step-definitions: Step implementations
page-objects: Page Object Model classes for each Rudderstack page
config/wdio.conf.js: WebdriverIO configuration
allure-results: Test reports

CI/CD

Tests run daily for dev, qa, and prod via GitHub Actions.
Set GitHub Secrets: DEV_USERNAME, DEV_PASSWORD, QA_USERNAME, QA_PASSWORD, PROD_USERNAME, PROD_PASSWORD, WEBHOOK_URL in repository settings.


