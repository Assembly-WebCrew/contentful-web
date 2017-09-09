import { ContentfulWebPage } from './app.po';

describe('contentful-web App', () => {
  let page: ContentfulWebPage;

  beforeEach(() => {
    page = new ContentfulWebPage();
  });

  it('should contain ASSEMBLY logo', () => {
    page.navigateTo();
    expect(page.hasLogo()).toBeTruthy();
  });
});
