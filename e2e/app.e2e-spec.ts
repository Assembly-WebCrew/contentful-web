import { ContentfulWebPage } from './app.po';

describe('contentful-web App', () => {
  let page: ContentfulWebPage;

  beforeEach(() => {
    page = new ContentfulWebPage();
  });

  it('should contain ASSEMBLY title', () => {
    page.navigateTo();
    expect(page.getTitle()).toContain('ASSEMBLY');
  });
});
