import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import request from 'supertest';
import { Buffer } from 'buffer';
import LoginPage from '../page-objects/login.page.js';
import DashboardPage from '../page-objects/dashboard.page.js';
import DestinationsPage from '../page-objects/destinations.page.js';

let dataPlaneUrl = '';
let writeKey = '';

Given('I login to Rudderstack', async () => {
  const env = process.env.ENV || 'dev';
  const username = process.env[`${env.toUpperCase()}_USERNAME`];
  const password = process.env[`${env.toUpperCase()}_PASSWORD`];
  if (!username || !password) {
    throw new Error(`Credentials for ${env} environment not found`);
  }
  await browser.url('/login');
  await LoginPage.login(username, password);
});

Then('I read and store the data plane URL', async () => {
  dataPlaneUrl = await DashboardPage.getDataPlaneUrl();
  console.log('Data Plane URL:', dataPlaneUrl);
  global.testContext = global.testContext || {};
  global.testContext.dataPlaneUrl = dataPlaneUrl;
});

Then('I copy and store the write key of the HTTP source', async () => {
  writeKey = await DashboardPage.getWriteKey();
  console.log('Write Key:', writeKey);
  global.testContext.writeKey = writeKey;
});

Then('I send an event to the HTTP source via API', async () => {
  const eventPayload = {
    userId: 'test-user',
    anonymousId: 'test-anon-id',
    event: 'test-event',
    context: {
      traits: {
        trait1: 'test-value'
      },
      ip: '14.5.67.21',
      library: {
        name: 'http'
      }
    },
    timestamp: new Date().toISOString(),
    properties: { key: 'value' }
  };
  const authHeader = `Basic ${Buffer.from(global.testContext.writeKey + ':').toString('base64')}`;
  const response = await request(global.testContext.dataPlaneUrl)
    .post('/v1/track')
    .set('Authorization', authHeader)
    .set('Content-Type', 'application/json')
    .send(eventPayload);
  if (response.status !== 200) {
    throw new Error(`API request failed with status ${response.status}: ${response.body}`);
  }
});

When('I click on the webhook destination', async () => {
  await DashboardPage.clickWebhookDestination();
});

Then('I check the events tab for delivered and failed counts', async () => {
  const { delivered, failed } = await DestinationsPage.checkEventCounts();
  expect(parseInt(delivered)).to.be.greaterThan(0);
});