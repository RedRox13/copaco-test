import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IQuote } from 'src/app/interfaces/quote.interface';

describe('HttpService', () => {
  let service: HttpService;
  let quoteMock: IQuote = {quote: '', author: '', rating: 0};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return IQuote', () => {
    service.getFromQuotable$().subscribe((resp) => {
      expect(resp).toEqual(quoteMock),
      fail
    });
  });

  it('should return IQuote', () => {
    service.getFromDummyJson$().subscribe((resp) => {
      expect(resp).toEqual(quoteMock),
      fail
    });
  });
});
