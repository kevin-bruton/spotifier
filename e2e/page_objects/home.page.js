const Page = require('./page');

class HomePage extends Page {

  get advancedSearchBtn() {
    return $('[data-testid="advanced-search"]');
  }
  
  get inputTexts() {
    return $$('[data-testid="inputtext');
  }

  get searchMainInput() {
    return $('input[alt="search main"]');
  }

  get searchArtistInput() {
    return $('input[alt="search artist"]');
  }

  get searchAlbumInput() {
    return $('input[alt="search album"]');
  }

  get searchTrackInput() {
    return $('input[alt="search track"]');
  }

  get searchYearInput() {
    return $('input[alt="search year"]');
  }

  get searchGenreInput() {
    return $('input[alt="search genre"]');
  }

  get trackCheckbox() {
    return $('input[alt="Track checkbox"]');
  }

  get albumCheckbox() {
    return $('input[alt="Album checkbox"]');
  }

  get artistCheckbox() {
    return $('input[alt="Artist checkbox"]');
  }

  async showAdvancedSearchOptions () {
    await this.advancedSearchBtn.click();
    await this.searchArtistInput.waitForDisplayed({ timeout: 3000 });
  }

  async doGeneralSearch (term) {
    const mainSearchInput = await this.searchMainInput;
    return mainSearchInput.setValue(term);
  }

  async waitForSearchResults () {
    return browser.waitUntil(async () => {
        const searchResultsExist =
          (await $('.searchresults__col-1').isExisting())
          || (await $('.searchresults__col-2').isExisting())
          || (await $('.searchresults__col-3').isExisting());
        return searchResultsExist;
      },
      { timout: 3000, timeoutMsg: 'Search results not shown in time' }
    );
  }

  getElementResultsOfMediaType (type) {
    return $$(`[data-testid="searchresults-${type}"] a`);
  }

  async getNumberOfResultsOfType (type) {
    const results = await this.getElementResultsOfMediaType(type);
    return results.length;
  }
  
  async selectFirstResultOfType(type) {
    const elements = await this.getElementResultsOfMediaType(type);
    await elements[0].click();
  }

  open() {
    return super.open('home');
  }
}

module.exports = new HomePage();
