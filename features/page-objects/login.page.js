class LoginPage {
  // Locators
  get emailInput() { return $('[data-testid="Email"]'); }
  get passwordInput() { return $('[data-testid="Password"'); }
  get submitButton() { return $('button[type="button"]'); }
  get addMfaLaterLink() { return $('a[href="/addmfalater"]'); }
  get goToDashboardButton() { return $('button.sc-cwKhYV.fRUAnS'); }
  get connectionsHeading() { return $('h3.sc-iBAcGC.fJpLL'); }
  get closeModalButton() { return $('svg[width="10px"][height="10px"]'); }

  // Methods
  async login(username, password) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
    // Click "I'll do this later" link
    await this.addMfaLaterLink.click();
    // Click "Go to dashboard" button
    await this.goToDashboardButton.click();
    // Close the modal by clicking the SVG close button
    await this.closeModalButton.click();
    // Wait for the Connections heading to ensure the dashboard is fully loaded
    await this.connectionsHeading.waitForDisplayed();
  }
}

export default new LoginPage();