Feature: General Search

  Scenario: A search for a common term gives track, album and artist results

    Given I am on the home page
    When I enter "INXS" as a general search
    Then I see search results of type "tracks"
    And I see search results of type "albums"
    And I see search results of type "artists"
