import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDummyJson } from 'src/app/interfaces/dummyJson.interface';
import { IQuotable } from 'src/app/interfaces/quotable.interface';
import { IQuote } from 'src/app/interfaces/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private quotable = 'https://api.quotable.io/random';
  private dummyJson = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getFromQuotable$(): Observable<IQuote> {
    return this.http.get<IQuotable>(this.quotable).pipe(
      map(({author, content}: IQuotable): IQuote => {
        return { author, quote: content, rating: 0 }
      })
    );
  }

  getFromDummyJson$(): Observable<IQuote> {
    return this.http.get<IDummyJson>(this.dummyJson).pipe(
      map(({author, quote}: IDummyJson): IQuote => {
        return { author, quote, rating: 0 }
      })
    );
  }
}
