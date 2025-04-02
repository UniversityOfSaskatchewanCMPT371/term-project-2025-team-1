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
    When the user clicks generate
    Then the graph should appear on the screen behind the user

  Scenario: Displaying the embedded graph with a URL-based CSV file
    Given the user has opened the graph menu / dropdown UI
    And the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/indexedData.csv"
    And the file appears in the graph menu
    When the user clicks generate
    Then the graph should appear on the screen behind the user

  Scenario: Changing Tau value
    Given the embedded graph is displayed with a valid CSV file
    When the user selects "1-5" tau using the right or left indicator
    Then the position of points in the embedded graph is changed

  Scenario: Selecting a 3D point
    Given the embedded graph is displayed with a valid CSV file
    When the user selects a 3D point
    Then the 3D point is selected
    And the 2D point associated with the 3D point is selected

  Scenario: Selecting a 2D point
    Given the embedded graph is displayed with a valid CSV file
    When the user selects a 2D point
    Then the 2D point is selected
    And the 3D point associated with the 2D point is selected

  Scenario: Changing column header
    Given the embedded graph is displayed with a valid CSV file
    When the user changes column header
    Then the embedded graph updates the new column header

  Scenario: Turning First Differencing On
    Given the embedded graph is displayed with a valid CSV file
    When the user turns First Differencing on
    Then the first differencing feature is activated

  Scenario: Turning First Differencing Off
    Given the embedded graph is displayed with a valid CSV file
    When the user turns First Differencing on
    Then the first differencing feature is deactivated

  Scenario: Setting Point Size
    Given the embedded graph is displayed with a valid CSV file
    When the user selects "1-15" using the right or left indicator
    Then the Point size in the embedded graph is changed
