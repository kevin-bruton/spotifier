const Page = require('./page');

class DetailPage extends Page {

  get detailPage() {
    return $('.detail');
  }

  get detailImage() {
    return $('img[alt="Track detail"]')
  }

  get detailHeading() {
    return $('div.detail__heading');
  }

  get detailData() {
    return $('div[data-testid="detail_data"]');
  }

  get detailMusicPlayer() {
    return $('iframe[title="Spotify Player"]');
  }

  waitForDetailPage() {
    return this.detailPage.waitForDisplayed();
  }

  async detailsAreShown() {
    return (await this.detailImage.isDisplayed()
      && await this.detailHeading.isDisplayed()
      && await this.detailData.isDisplayed()
      && await this.detailMusicPlayer.isDisplayed());
  }
}

module.exports = new DetailPage();
