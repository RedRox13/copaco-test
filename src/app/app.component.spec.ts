import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuotesStoreService } from './services/quotes-store/quotes-store.service';
import { IQuote } from './interfaces/quote.interface';
import { HttpService } from './services/http/http.service';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: QuotesStoreService;
  let newQuoteMock: IQuote = {author: '4', quote: '4', rating: 0};
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        QuotesStoreService,
        {
          provide: HttpService,
          useValue: {
            getFromQuotable$() {
              return of(newQuoteMock)
            },
            getFromDummyJson$() {
              return of(newQuoteMock)
            }
          }
        }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });

    httpService = TestBed.inject(HttpService);
    service = TestBed.inject(QuotesStoreService);
    service['_quotes'] = [
      {author: '1', quote: '1', rating: 0},
      {author: '2', quote: '2', rating: 0},
      {author: '3', quote: '3', rating: 0},
    ];
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call functions on init', () => {
    let spy = spyOn(app, 'offlineListner' as never);
    app.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set rating', () => {
    app.currentQuote = service.getQuotes()[0];
    app.onRateClick(5);
    expect(app.currentQuote.rating).toBe(5);
  });

  it('should set new quote', () => {
    app.currentQuote = service.getQuotes()[2];
    app['getNewQuote']();
    expect(app.currentQuote).not.toEqual(service.getQuotes()[2]);
  });

  describe('nextQuote', () => {
    it('should switch to next quote', () => {
      app.currentQuote = service.getQuotes()[0];    
      app.nextQuote();
      expect(app.currentQuote).toEqual(service.getQuotes()[1]);
    });

    it('should fallback on first quote if no internet', () => {
      app.currentQuote = service.getQuotes()[3];
      app.isOnline = false;    
      app.nextQuote();
      expect(app.currentQuote).toEqual(service.getQuotes()[0]);
    });

    it('should request new quote if last in list', () => {
      app.currentQuote = service.getQuotes()[3];
      app.isOnline = true;
      let call = spyOn(app, 'getNewQuote' as never);
      app.nextQuote();
      expect(call).toHaveBeenCalled();
    });
  });

  it('should switch to previous quote', () => {
    app.currentQuote = service.getQuotes()[1];    
    app.prevQuote();
    expect(app.currentQuote).toEqual(service.getQuotes()[0]);
  });
});
