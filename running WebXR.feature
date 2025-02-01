Feature: WebXR Vite Spike Manual Test Cases
  As a developer or tester, I want to ensure the WebXR Vite Spike runs correctly,
  on the Meta Quest and browser emulator to verify the functionality and controls work as expected.

  Background:
    Given an account username named "team1cmpt371@gmail.com"
    And a password "Osgoodstudents371"
    And a Meta Link 4-digit pin (if needed) "6566"

  Scenario: Starting the Program
    Given I have opened a terminal in Visual Studio Code
    When I run the command "npm run dev"
    Then I should see two URLs in the terminal
    And the first URL should be for localhost
    And the second URL should be for hosting over the network


  Scenario: Verifying Controls in the Browser emulator
    Given I am in the WebXR environment in the browser emulator
    When I use my mouse and keyboard
    Then I should be able to navigate and interact with the environment
    And the controls should mimic the functionality of the Meta Quest controllers
  

  Scenario: Running the Program on the Meta Quest
    Given I have started the program using "npm run dev"
    And I have the network URL from the terminal
    When I open the browser on the Meta Quest
    And I type in the network URL
    And I click the "Enter VR" button in the address bar
    Then I should be able to see the WebXR environment in VR


  Scenario: Running the Program on the browser emulator
    Given I am in the WebXR environment in the browser emulator
    When I use my mouse and keyboard
    Then I should be able to navigate and interact with the environment
    And the controls should mimic the functionality of the Meta Quest controllers


  Scenario: Using the Oculus Browser Tabs
    Given I am in the Oculus browser on the WebXR page
    When I look at the bottom right of the open tabs
    Then I should see a keyboard option
    And I should see a "-" button to minimize the tab
    And I should see an "x" button to close the tab in VR
    And I should see an "x" button on the top right to close the tab in both VR and PC


  Scenario: Using the Right Controller in VR
    Given I am in the WebXR environment on the Meta Quest
    When I use the right controller
    Then the Meta button should open a menu pop-up
    And the "A" button should act as a select button (left click)
    And the "B" button should open a pop-up for the selected tab
    And the handle button should move the tab it is pointing at when the button is held
    And while the handle button is held, the analog stick should minimize or maximize the tab
    And the back bumper should be used for scrolling when held and moved up or down


# Looking left, right, up, and down.
# Implicit Signifier: an average user should automatically know that they will need to move their head to look anywhere in a VR.
  Scenario: Looking to the left in VR
    Given I am in the VR environment
    When I move my head to the left
    Then the camera orientation should change to face left
    And the change in orientation should be detectable by the emulator


  Scenario: Looking to the right in VR
    Given I am in the VR environment
    When I move my head to the right
    Then the camera orientation should change to face right
    And the change in orientation should be detectable by the emulator


  Scenario: Looking up in VR
    Given I am in the VR environment
    When I move my head up
    Then the camera orientation should change to face upward
    And the change in orientation should be detectable by the emulator

  Scenario: Looking down in VR
    Given I am in the VR environment
    When I move my head down
    Then the camera orientation should change to face downward
    And the change in orientation should be detectable by the emulator


  Scenario: Moving in VR
    Given I am in the VR environment
    When I move using the thumbstick
    Then the camera position should change to reflect movement
    And the change in position should be detectable by the emulator
