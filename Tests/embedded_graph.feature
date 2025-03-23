Feature: Embedded Graph Creation
  As a developer or tester, I want to ensure that the embedded graph is created successfully

  Background:
    Given the user is in the VR environment
    And there exists a valid local CSV file "indexedData.csv"
    And there exists a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID3/csvTestFiles/indexedData.csv"


  Scenario: Displaying the embedded graph
    Given the user has opened the graph menu / dropdown UI
    And the user has uploaded a valid local CSV file "indexedData.csv"
    And the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID3/csvTestFiles/indexedData.csv"
    And the file appears in the graph menu
    When the user select "1-5" tau using the right or left indicator
    And the user clicks generate
    Then the graph should appear on the screen behind the user
