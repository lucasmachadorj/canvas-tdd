Feature: Zoom
  Description: Zoom in and out around the cursor position. The cursor position should remain fixed.

  Scenario: Zoom in
    Given the user is in the whiteboard
    When the user scrolls up the mouse wheel
    Then the whiteboard should zoom in around the cursor position
  
  Scenario: Zoom out
    Given the user is in the whiteboard
    When the user scrolls down the mouse wheel
    Then the whiteboard should zoom out around the cursor position

  Scenario: Zoom in and out
    Given the user is in the whiteboard
    When the user scrolls up the mouse wheel
    And the user scrolls down the mouse wheel at the same position
    Then the whiteboard should zoom out around the cursor position