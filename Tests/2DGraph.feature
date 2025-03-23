Feature: 2DGraph
  As a developer or tester, I want to ensure that the 2D graph display functionality meets requirements and properly represents the provided data.

  # Background data (assumes that all provided CSV data is valid as per csvLoader.feature) [need an example URL]
  Background:
    Given the user is in the VR environment
    And the user has uploaded the valid local CSV file "test.csv"
    And the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles/test.csv"

  # This case covers visual confirmation that a 2D graph is loaded and able to be displayed from the 2D graph menu
  Scenario: Finding a loaded local/URL graph in the 2D graph menu
    When the user opens the 2D graph menu
    Then the 2D graph menu should show a list of available graphs to display

  # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a local CSV file
  Scenario: Displaying a 2D graph from a local CSV file
    Given the user has opened the 2D graph menu
    And the local CSV file appears in the 2D graph menu
    When the user clicks generate
    Then the graph should appear on the first red display board

  # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a URL-based CSV file
  Scenario: Displaying a 2D graph from a URL-based CSV file
    Given the user has opened the 2D graph menu
    And the URL-based CSV file appears in the 2D graph menu
    When the user clicks generate
    Then the graph should appear on the first red display board

  # This case covers the action of clicking on any point of the 2D visualization and having the corresponding point in the 3D graph highlighted
  Scenario: Clicking on a point in the 2D graph from the VR environment highlights the corresponding point in the 3D graph
    Given the user has generated a 2D graph
    Given the user has generated a 3D graph
    When the user clicks on a point on the 2D graph
    Then the corresponding point on the 3D graph should be highlighted
