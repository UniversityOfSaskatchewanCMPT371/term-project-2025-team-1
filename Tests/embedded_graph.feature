Feature: Embedded Graph Creation
  As a developer or tester, I want to ensure that the embedded graph is created successfully

  Background:
    Given the user is in the VR environment
    And there exists a valid local CSV file "indexedData.csv"
    And there exists a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/indexedData.csv"

  Scenario: Displaying the embedded graph with a local CSV file
    Given the user has opened the graph menu / dropdown UI
    And the user has uploaded a valid local CSV file "indexedData.csv"
    And the file appears in the graph menu
    When the user selects "1-5" tau using the right or left indicator
    And the user clicks generate
    Then the graph should appear on the screen behind the user

  Scenario: Displaying the embedded graph with a URL-based CSV file
    Given the user has opened the graph menu / dropdown UI
    And the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/indexedData.csv"
    And the file appears in the graph menu
    When the user selects "1-5" tau using the right or left indicator
    And the user clicks generate
    Then the graph should appear on the screen behind the user

  Scenario: Selecting a 3D point
    Given the embedded graph is displayed with either a URL-based CSV file or local CSV file
    When the user selects a 3D point
    Then 3D point is selected
    And the 2D point associated with the 3D point is selected
  

  Scenario: Selecting a 2D point
    Given the embedded graph is displayed with either a URL-based CSV file or local CSV file
    When the user selects a 2D point
    Then 2D point is selected
    And the 3D point associated with the 2D point is selected
