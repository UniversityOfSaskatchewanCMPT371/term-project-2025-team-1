Feature: Smoke Tests
    As a developer or tester, I want to ensure that the smoke tests function as required and properly covers every important aspect of the system.

  # Background data
  Background:
    Given the user is in the VR environment
    And the user has a local example CSV file "test.csv"
    And the user has a URL-based example CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles/test.csv"

  # Using the local CSV loader
  Scenario: Testing the local CSV Loader functionality
    Given the "Load Local CSV" button is visible
    When the user clicks the "Load Local CSV" button
    And a file selection window opens
    And the user clicks on the valid CSV file "test.csv"
    Then a CSV should be added to the "Loaded Graphs" menu

  # Using the URL CSV loader
  Scenario: Testing the URL CSV Loader functionality
    Given the "Enter URL" text box is visible
    When the user clicks the "Enter URL" text box
    And the user enters a valid URL into the text entry box
    And the user clicks the "Enter URL" button
    Then a CSV should be added to the "Loaded Graphs" menu 

  # Displaying the Time Series Graph
  Scenario: Testing the Time Series Graph functionality
    When the user opens the 2D graph menu
    And a CSV file appears in the menu
    And the user clicks generate
    Then the graph should appear on the display board

  # Displaying the Embedded Graph
  Scenario: Testing the Embedded Graph functionality
    When the user opens the 3D graph menu
    And a CSV file appears in the menu
    And the user selects "1" using the right or left indicator
    And the user clicks generate
    Then a placeholder box or graph should appear on the screen behind the user