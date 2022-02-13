/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
  _getUrl(pageName) {
      const host = 'http://localhost:3000';
      const path = {
          home: '/'
      }[pageName]
      return host + path;
  }
  
  /**
  * Opens a sub page of the page
  * @param path path of the sub page (e.g. /path/to/page.html)
  */
  async open(pageName) {
      const url = this._getUrl(pageName);
      await browser.url(url);
  }

  async elementsAreDisplayed (elements) {
    let allDisplayed = true;
    for (const element of elements) {
      const displayed = await element.isDisplayed();
      allDisplayed = allDisplayed && displayed;
    }
    return allDisplayed;
  }
}
