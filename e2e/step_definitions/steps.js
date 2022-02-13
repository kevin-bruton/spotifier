const { Given, When, Then } = require('@wdio/cucumber-framework');

const DetailPage = require('../page_objects/detail.page');
const HomePage = require('../page_objects/home.page');

const pages = {
  home: HomePage,
  detail: DetailPage
}

Given(/^I am on the (\w+) page$/, async page => {
  await pages[page].open();
});

When(/^I enter "(\w+)" as a general search$/, async term => {
  await HomePage.doGeneralSearch(term);
});

When(/^I select advanced search$/, async () => {
  await HomePage.showAdvancedSearchOptions();
});

Then(/^I see the options to select media types$/, async () => {
  const elements = [ await HomePage.trackCheckbox, await HomePage.albumCheckbox, await HomePage.artistCheckbox ];
  const areDisplayed = await HomePage.elementsAreDisplayed(elements);
  await expect(areDisplayed).toBeTruthy();
});

Then(/^I see inputs for searching by artists, albums, tracks, year and genre$/, async () => {
  const searchInputs = [
    await HomePage.searchArtistInput,
    await HomePage.searchAlbumInput,
    await HomePage.searchTrackInput,
    await HomePage.searchYearInput,
    await HomePage.searchGenreInput
  ];
  const areDisplayed = await HomePage.elementsAreDisplayed(searchInputs);
  await expect(areDisplayed).toBeTruthy();
});

Then(/^I see search results of type "(\w+)"$/, async mediaType => {
  await HomePage.waitForSearchResults();
  const numberOfResults = await HomePage.getNumberOfResultsOfType(mediaType);
  expect(numberOfResults > 0).toBeTruthy();
});

When(/^I select the first (\w+) found in the search results$/, async type => {
  await HomePage.selectFirstResultOfType(`${type}s`)
});

Then(/^I see the details of the track$/, async () => {
  await DetailPage.waitForDetailPage();
  const trackDetailsShown = await DetailPage.detailsAreShown();
  expect(trackDetailsShown).toBeTruthy();
});
