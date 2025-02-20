Feature: csvLoader
  As a developer or tester, I want to ensure that the csvLoader functionality correctly finds and loads a selected file, and also properly reacts to an invalid selection.

  # Will add example information into background  
  Background:
    Given an account username named "team1cmpt371@gmail.com"
    And a password "Osgoodstudents371"
    And a Meta Link 4-digit pin (if needed) "6566"
    And I am in the VR environment
    And the example CSV file "test.csv"
    
  # These assume I have entered the VR environment in its current state, and that a popup vr keyboard is utilized 
  Scenario: Using the CSV Loader text entry box
    Given I am in the VR environment
    When I click the "Enter URL" text box
    Then I should be able to enter a URL using the keyboard

  # In the case we want to display a valid URL based CSV file
  Scenario: Confirming URL CSV entry
    Given I have entered a valid URL into the text entry box
    When I click the "Enter URL" button
    Then a CSV should be added to the "Loaded Graphs" menu

  # In the case we want to display an invalid URL based CSV file
  Scenario: Confirming invalid URL CSV entry
    Given I have entered an invalid URL into the text entry box
    When I click the "Enter URL" button
    Then an error dialog box should appear

  # In the case I want to find a local CSV file
  Scenario: Opening the local CSV selection window
    Given I am in the VR environment
    When I click the "Load Local CSV" button
    Then a file selection window should open

  # In the case I want to display the local CSV file
  Scenario: Confirming Local CSV entry
    Given I have opened the file selection window
    When I click on the valid CSV file "test.csv"
    Then a CSV should be added to the "Loaded Graphs" menu

  # In the case I want to display an invalid local CSV file (incorrect file type etc.)
  Scenario: Confirming an invalid Local CSV entry
    Given I have opened the file selection window
    When I click on an invalid CSV file
    Then an error dialog box should appear 

  # In the case I want to delete a manually loaded CSV file
  Scenario: Deleting a loaded CSV file
    Given I have loaded a CSV file
    When I click the "Loaded Graphs" menu
    And click the selection box
    And click delete
    Then the CSV should delete

