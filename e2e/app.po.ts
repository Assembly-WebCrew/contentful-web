import { browser, by, element } from 'protractor';

export class ContentfulWebPage {
  navigateTo() {
    const navigationPromise = browser.get('/');
    browser.driver.sleep(4000);
    return navigationPromise;
  }

  getTitle() {
    return element(by.css('asm-header h1')).getText();
  }
}
