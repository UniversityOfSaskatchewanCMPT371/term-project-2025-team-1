Feature: 2DGraph
    As a developer or tester, I want to ensure that the 2D graph display functionality meets requirements and properly represents the provided data.

    # Background data (assumes that all provided CSV data is valid as per csvLoader.feature) [need an example URL]
    Background:
      Given the user is in the VR environment
      And the user has uploaded the valid local CSV file "test.csv"
      And the user has uploaded a valid URL-based CSV file with address "testcsvfile.com" 

    # This case covers visual confirmation that a 2D graph is loaded and able to be displayed from the 2D graph menu
    Scenario: Finding a loaded local/URL graph in the 2D graph menu

    # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a local CSV file
    Scenario: Displaying a 2D graph from a local CSV file

    # This case covers the action of using the 2D graph menu to display a 2D graph sourced from a URL-based CSV file
    Scenario: Displaying a 2D graph from a URL-based CSV file

    # This case covers the action of moving a visible graph between the (currently red in colour) display boards
    Scenario: Moving a 2D graph to and from the display board

    # This case covers the action of removing any visual representation of the 2D graph from the VR environment
    Scenario: Removing 2D graph from the VR environment (clearing)