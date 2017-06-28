import { GestionPage } from './app.po';

describe('gestion App', () => {
  let page: GestionPage;

  beforeEach(() => {
    page = new GestionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
