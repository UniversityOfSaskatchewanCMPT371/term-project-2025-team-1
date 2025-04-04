Feature: 2DGraph
  As a developer or tester, I want to ensure that the 2D graph display functionality meets requirements and properly represents the provided data.

  # Background data (assumes that all provided CSV data is valid as per csvLoader.feature)
  Background:
    Given the user is in the VR environment
    And there exists a valid local CSV file "indexedData.csv"
    And there exists a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles/indexedData.csv"

  # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a local CSV file
  Scenario: Displaying a 2D graph from a local CSV file
    Given the user has uploaded a valid local CSV file "indexedData.csv"
    And the user has opened the 2D graph menu
    And the local CSV file appears in the 2D graph menu
    When the user clicks generate
    Then the graph should appear on the display panel

  # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a URL-based CSV file
  Scenario: Displaying a 2D graph from a URL-based CSV file
    Given the user has uploaded a valid URL-based CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles/indexedData.csv"
    And the user has opened the 2D graph menu
    And the URL-based CSV file appears in the 2D graph menu
    When the user clicks generate
    Then the graph should appear on the display panel

  # This case covers the action of clicking on any point of the 2D visualization and having the corresponding point in the 3D graph highlighted
  Scenario: Clicking on a point in the 2D graph from the VR environment highlights the corresponding point in the 3D graph
    Given the user has generated a 2D graph
    Given the user has generated a 3D graph
    When the user clicks on a point on the 2D graph
    Then the corresponding point on the 3D graph should change color

  # This case covers the action of turning first differencing on and having data values of points change accordingly
  Scenario: Turning First Differencing On
    Given the time series graph is displayed with a valid CSV file
    When the user turns First Differencing on
    Then the first differencing feature is activated and changes data values of points

  # This case covers the action of turning first differencing of and reverting the data values of points
  Scenario: Turning First Differencing Off
    Given the time series graph is displayed with a valid CSV file
    When the user turns First Differencing off
    Then the first differencing feature is deactivated and reverts the data values of points

  # This case covers the action of changing the size of points in the time series graph
  Scenario: Setting Point Size
    Given the time series graph is displayed with a valid CSV file
    When the user selects "1-15" using the right or left button
    Then the point size of the time series graph is changed according to the users selection