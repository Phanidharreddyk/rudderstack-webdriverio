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
  try {
    const env = process.env.ENV || 'dev';
    const username = process.env[`${env.toUpperCase()}_USERNAME`];
    const password = process.env[`${env.toUpperCase()}_PASSWORD`];
    if (!username || !password) {
      throw new Error(`Credentials for ${env} environment not found`);
    }
    await browser.url('/login');
    await LoginPage.login(username, password);
  } catch (error) {
    console.error('Error during login:', error.message);
    throw new Error(`Failed to login to Rudderstack: ${error.message}`);
  }
});

Then('I read and store the data plane URL', async () => {
  try {
    dataPlaneUrl = await DashboardPage.getDataPlaneUrl();
    console.log('Data Plane URL:', dataPlaneUrl);
    global.testContext = global.testContext || {};
    global.testContext.dataPlaneUrl = dataPlaneUrl;
  } catch (error) {
    console.error('Error retrieving data plane URL:', error.message);
    throw new Error(`Failed to retrieve data plane URL: ${error.message}`);
  }
});

Then('I copy and store the write key of the HTTP source', async () => {
  try {
    writeKey = await DashboardPage.getWriteKey();
    console.log('Write Key:', writeKey);
    global.testContext.writeKey = writeKey;
  } catch (error) {
    console.error('Error retrieving write key:', error.message);
    throw new Error(`Failed to retrieve write key: ${error.message}`);
  }
});

Then('I send an event to the HTTP source via API', async () => {
  try {
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
  } catch (error) {
    console.error('Error sending event to HTTP source:', error.message);
    throw new Error(`Failed to send event to HTTP source: ${error.message}`);
  }
});

When('I click on the webhook destination', async () => {
  try {
    await DashboardPage.clickWebhookDestination();
  } catch (error) {
    console.error('Error clicking webhook destination:', error.message);
    throw new Error(`Failed to click webhook destination: ${error.message}`);
  }
});

Then('I check the events tab for delivered and failed counts', async () => {
  try {
    const { delivered, failed } = await DestinationsPage.checkEventCounts();
    expect(typeof delivered).to.equal('number', 'Delivered count should be a number');
    expect(typeof failed).to.equal('number', 'Failed count should be a number');
    console.log('Delivered count:', delivered);
    console.log('Failed count:', failed);
  } catch (error) {
    console.error('Error checking event counts:', error.message);
    throw new Error(`Failed to check event counts: ${error.message}`);
  }
});