import { CyclingClubPage } from './app.po';

describe('cycling-club App', () => {
  let page: CyclingClubPage;

  beforeEach(() => {
    page = new CyclingClubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
