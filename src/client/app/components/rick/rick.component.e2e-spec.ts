import { t } from '../../frameworks/test/index';

declare const browser: any, element: any, by: any;

t.describe('Rick', function() {

  t.be(function () {
    browser.get('/rick');
  });

  t.it('should have correct feature heading', function() {
    let el = element(by.css('sd-rick h2'));
    t.e(el.getText()).toEqual('Features');
  });
});
