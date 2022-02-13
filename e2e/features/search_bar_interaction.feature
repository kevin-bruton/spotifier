Feature: Search bar interaction

  Scenario: I can access all advanced search options

    Given I am on the home page
    When I select advanced search
    Then I see the options to select media types
    And I see inputs for searching by artists, albums, tracks, year and genre

