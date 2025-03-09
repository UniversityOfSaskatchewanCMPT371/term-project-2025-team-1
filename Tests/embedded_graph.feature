Feature: Embedded Graph Creation
  As a developer or tester, I want to ensure that the embedded graph is created successfully

  Background:
    Given the user is in the VR environment
    # data visualization isn't implemented yet

  # viualizing 3D graph
  Scenario: Finding a loaded local/URL graph in the 3D graph menu
    Given play mode is on
    When the user opens the 3D graph menu
    Then the 3D graph menu should show a list of available graphs to display
    
  Scenario: Displaying the embedded graph
    Given the user has opened the 3D graph menu
    And the local CSV file appears in the 2D graph menu
    When the user clicks generate
    Then a placeholder box or graph should appear on the screen behind the user
