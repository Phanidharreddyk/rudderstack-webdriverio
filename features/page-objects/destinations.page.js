class DestinationsPage {
  // Locators
  
get eventsTab() { 
  return $('//div[contains(@class, "ant-tabs-tab") and normalize-space()="Events"]'); 
}  get deliveredCount() { return $('//span[contains(@class, "sc-jrkPvW") and text()="Delivered"]/following-sibling::div//span'); }
  get failedCount() { return $('//span[contains(@class, "sc-jrkPvW") and text()="Failed"]/following-sibling::div//span'); }
  

  // Methods
  
  async checkEventCounts() {
    await this.eventsTab.click();
    const delivered = await this.deliveredCount.getText();
    const failed = await this.failedCount.getText();
    console.log(`Delivered: ${delivered}, Failed: ${failed}`);
    return { delivered, failed };
  }
}

  

export default new DestinationsPage();