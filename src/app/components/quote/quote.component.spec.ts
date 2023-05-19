import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComponent } from './quote.component';
import { IQuote } from 'src/app/interfaces/quote.interface';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuoteComponent]
    });
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    component.stars = Array(5).fill(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fill stars array', () => {
    component.stars = Array(5).fill(false);
    component['fillStars'](5);
    expect(component.stars).toEqual(Array(5).fill(true));
  });

  it('should call fillStars', () => {
    let spy = spyOn<QuoteComponent>(component, 'fillStars' as never);
    component.onRateClick(5);
    expect(spy).toHaveBeenCalled();
  });

  describe('quote input', () => {
    it('should return if no value', () => {
      component.quote = {} as IQuote;
      component.quote = null as any;
      expect(component.quote).not.toEqual(null as any);
    })
  });
});
