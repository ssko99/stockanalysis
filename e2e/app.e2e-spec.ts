import { MyLifePage } from './app.po';

describe('my-life App', () => {
  let page: MyLifePage;

  beforeEach(() => {
    page = new MyLifePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
