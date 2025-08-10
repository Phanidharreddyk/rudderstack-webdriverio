// features/support/hooks.js
import { Before, After } from '@wdio/cucumber-framework';

Before(async function () {
  console.log('Before hook: Setting up test');
});

After(async function () {
  console.log('After hook: Cleaning up test');
});

export default {};