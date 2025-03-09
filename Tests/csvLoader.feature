Feature: csvLoader
  As a developer or tester, I want to ensure that the csvLoader functionality correctly finds and loads a selected file, and also properly reacts to an invalid selection.

  # Will add example information into background
  Background:
    Given the user has a local example CSV file "test.csv"
    And the user has a URL-based example CSV file with address "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles/test.csv"
    And the user is in the VR environment

  # These assume I have entered the VR environment in its current state, and that a popup vr keyboard is utilized
  Scenario: Using the CSV Loader text entry box
    Given the "Enter URL" text box is visible
    When the user clicks the "Enter URL" text box
    Then they should be able to enter a URL using the keyboard

  # In the case we want to display a valid URL based CSV file
  Scenario: Confirming URL CSV entry
    Given the user has entered a valid URL into the text entry box
    When the user clicks the "Enter URL" button
    Then a CSV should be added to the "Loaded Graphs" menu

  # In the case we want to display an invalid URL based CSV file
  Scenario: Confirming invalid URL CSV entry
    Given the user has entered an invalid URL into the text entry box
    When the user clicks the "Enter URL" button
    Then an error dialog box should appear

  # In the case I want to find a local CSV file
  Scenario: Opening the local CSV selection window
    Given the "Load Local CSV" button is visible
    When the user clicks the "Load Local CSV" button
    Then a file selection window should open

  # In the case I want to display the local CSV file
  Scenario: Confirming Local CSV entry
    Given the user has opened the file selection window
    When the user clicks on the valid CSV file "test.csv"
    Then a CSV should be added to the "Loaded Graphs" menu

  # In the case I want to display an invalid local file (incorrect file type etc.)
  Scenario: Confirming an invalid Local CSV entry
    Given the user has opened the file selection window
    When the user clicks on an invalid CSV file
    Then an error dialog box should appear


