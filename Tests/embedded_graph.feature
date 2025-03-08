Feature: Embedded Graph Creation
  As a developer or tester, I want to ensure that the embedded graph is created successfully

  Background:
    Given the user is in the VR environment
    # data visualization isn't implemented yet

  Scenario: Displaying the embedded graph
    Given the application is running
    When I attempt to create an embedded graph
    Then a placeholder box or graph should appear on the screen
