import { browser, by, element } from 'protractor';

export class ContentfulWebPage {
  navigateTo() {
    const navigationPromise = browser.get('/');
    browser.driver.sleep(5000);
    return navigationPromise;
  }

  hasLogo() {
    return element(by.css('asm-header .logo')).isPresent();
  }
}
