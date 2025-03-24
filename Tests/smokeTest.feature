Feature: Smoke Tests
    As a developer or tester, I want to ensure that the smoke tests function as required and properly covers every important aspect of the system.

  # Background data
  Background:
    Given the user is in the VR environment
    And the user has a local example CSV file "indexedData.csv"
    And the user has a URL-based example CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/indexedData.csv"

  # Using the local CSV loader
  Scenario: Testing the local CSV Loader functionality
    Given the "Load Local CSV" button is visible
    When the user clicks the "Load Local CSV" button
    And a file selection window opens
    And the user clicks on the valid CSV file "indexedData.csv"
    And the CSV is added to the "Loaded Graphs" menu
    And the user opens the graph menu
    And a named CSV file indexedData.csv appears in the menu
    And the user clicks generate
    Then the 2D graph should appear on the display board and the 3D graph should appear behind the user

  # Using the URL CSV loader
  Scenario: Testing the URL CSV Loader functionality
    Given the "Enter URL" text box is visible
    When the user clicks the "Enter URL" text box
    And the user enters a valid URL into the text entry box
    And the user clicks the "Enter URL" button
    And the CSV is added to the "Loaded Graphs" menu
    And the user opens the graph menu
    And a named CSV file indexedData.csv appears in the menu
    And the user clicks generate
    Then the 2D graph should appear on the display board and the 3D graph should appear behind the user