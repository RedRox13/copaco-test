import { TestBed } from '@angular/core/testing';

import { QuotesStoreService } from './quotes-store.service';
import { IQuote } from 'src/app/interfaces/quote.interface';

describe('QuotesStoreService', () => {
  let service: QuotesStoreService;
  let quoteMock: IQuote = {quote: '', author: '', rating: 0};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of Quotes', () => {
    service.addQuote(quoteMock);
    expect(service.getQuotes()).toEqual([quoteMock]);
  });
});
