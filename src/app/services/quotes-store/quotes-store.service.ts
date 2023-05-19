import { Injectable } from '@angular/core';
import { IQuote } from 'src/app/interfaces/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuotesStoreService {
  private _quotes: IQuote[] = [];

  constructor() {}

  getQuotes(): IQuote[] {
    return this._quotes;
  }

  addQuote(quote: IQuote): void {
    this._quotes.push(quote);
  }
}
