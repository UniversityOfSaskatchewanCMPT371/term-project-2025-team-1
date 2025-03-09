Feature: Embedded Graph Creation
  As a developer or tester, I want to ensure that the embedded graph is created successfully

  Background:
    Given the user is in the VR environment
    # data visualization isn't implemented yet

  # Background data (assumes that all provided CSV data is valid as per csvLoader.feature)
  Scenario: Loading CSV file
    Given play mode is off
    When the user opens the 3D graph menu
    And the user has uploaded the valid local CSV file "test.csv"
    And the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID3/csvTestFiles/indexedData.csv" 

  # viualizing 3D graph
  Scenario: Finding a loaded local/URL graph in the 3D graph menu
    Given play mode is on
    When the user opens the 3D graph menu
    Then the 3D graph menu should show a list of available graphs to display
    
  Scenario: Displaying the embedded graph
    Given the application is running
    When the user attempts to create an embedded graph
    Then a placeholder box or graph should appear on the screen behind the user

  Scenario: Removing 3D graph from the VR environment
    Given the user has generated a 3D graph
    When the user clicks "delete" button next to the graph
    Then the graph should be cleared from the VR environment
