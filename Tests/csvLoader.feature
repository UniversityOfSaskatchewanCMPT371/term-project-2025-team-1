Feature: csvLoader
  As a developer or tester, I want to ensure that the csvLoader functionality correctly finds and loads a selected file.

  # Will add example information into background  
  # Background:
    
  # These assume I have entered the VR environment in its current state
  Scenario: Using the CSV Loader text entry box
    Given I am in the VR environment
    When I click the "Enter URL" text box
    Then I should be able to enter a URL using the keyboard

  Scenario: Confirming URL CSV entry
    Given I have entered a valid URL into the text entry box
    When I click the "Enter URL" button
    Then a CSV should be added to the "Loaded Graphs" menu

  Scenario: Opening the local CSV selection window
    Given I am in the VR environment
    When I click the "Load Local CSV" button
    Then a file selection window should open

  Scenario: Confirming Local CSV entry
    Given I have opened the file selection window
    When I click on a valid CSV file
    Then a CSV should be added to the "Loaded Graphs" menu

  Scenario: Deleting a loaded CSV file
    Given I have loaded a CSV file
    When I click the "Loaded Graphs" menu
    And click the selection box
    And click delete
    Then the CSV should delete

