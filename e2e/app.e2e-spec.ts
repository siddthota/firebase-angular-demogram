import { FirebaseAngularPage } from './app.po';

describe('firebase-angular App', () => {
  let page: FirebaseAngularPage;

  beforeEach(() => {
    page = new FirebaseAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
