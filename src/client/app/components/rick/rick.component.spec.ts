// angular
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

// app
import {t} from '../../frameworks/test/index';
import {RickComponent} from './rick.component';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    declarations: [RickComponent, TestComponent]
  });
};

export function main() {
  t.describe('@Component: RickComponent', () => {

    t.be(testModuleConfig);

    t.it('should work',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            let rickDOMEl = fixture.debugElement.children[0].nativeElement;

            t.e(rickDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-rick></sd-rick>'
})
class TestComponent {
}
