class DashboardPage {
  // Locators
  get collectSubmenuArrow() { return $('[data-testid="Collect-submenu-arrow"]'); }
  get connectionsLink() { return $('[data-testid="sub-menu-connections"]'); }
  get sourcesLink() { return $('[data-testid="nav-sources"]'); } // Update with real selector
  get destinationsLink() { return $('[data-testid="nav-destinations"]'); } // Update with real selector
  get dataPlaneUrl() { return $('span.sc-jrkPvW.ebfakN.text-ellipsis'); }
  get writeKey() { return $('//span[contains(@class, "text-ellipsis") and contains(text(), "Write key ")]'); }
  get webhookDestination() { return $('//span[contains(@class, "text-ellipsis") and contains(text(), "DevWebhook")]');}
  
  // Methods

  async getDataPlaneUrl() {
    await this.dataPlaneUrl.waitForDisplayed({ timeout: 5000 });
    return await this.dataPlaneUrl.getText();
  }

  async getWriteKey() {
    await this.writeKey.waitForDisplayed({ timeout: 5000 });
    const elements = await $$('span[class*="text-ellipsis"]');
    console.log(`Found ${elements.length} elements with class containing 'text-ellipsis':`);
    for (const [index, element] of elements.entries()) {
      const text = await element.getText();
      console.log(`Element ${index + 1}: ${text}`);
    }

    // Get the text of the selected element
    const fullText = await this.writeKey.getText();
    console.log(`Selected write key element text: ${fullText}`);

    // Validate the text
    if (!fullText.startsWith('Write key ')) {
      throw new Error(`Expected write key element to start with 'Write key ', but got: ${fullText}`);
    }

    // Extract and return the write key
    return fullText.replace('Write key ', '');
  }

  async clickWebhookDestination() {
    await this.webhookDestination.waitForExist({ timeout: 5000 });
    await this.webhookDestination.click();
  }
}

export default new DashboardPage();