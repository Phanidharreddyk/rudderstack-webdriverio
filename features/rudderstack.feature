Feature: Rudderstack Flows

Scenario: Automate Rudderstack event flow
  Given I login to Rudderstack
  Then I read and store the data plane URL
  And I copy and store the write key of the HTTP source
  And I send an event to the HTTP source via API
  When I click on the webhook destination
  Then I check the events tab for delivered and failed counts