Feature: Track Details

  Scenario: Show track details of a track found via the search

    Given I am on the home page
    When I enter "Hello" as a general search
    And I see search results of type "tracks"
    And I select the first track found in the search results
    Then I see the details of the track
