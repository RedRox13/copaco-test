import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QuoteComponent } from './components/quote/quote.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';
import { fromEvent, map, merge, race } from 'rxjs';
import { IQuote } from './interfaces/quote.interface';
import { QuotesStoreService } from './services/quotes-store/quotes-store.service';

const modules = [
  CommonModule,
  HttpClientModule
];

const components = [
  QuoteComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [modules, components, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentQuote!: IQuote;
  public isOnline: boolean = true;

  constructor(private http: HttpService, private quotesStore: QuotesStoreService) {}

  ngOnInit() {
    this.offlineListner();
    this.getNewQuote();
  }

  public onRateClick(value: number): void {
    this.currentQuote.rating = value;
  }

  public nextQuote(): void {
    const allQuotes: IQuote[] = this.quotesStore.getQuotes();
    const index: number = allQuotes.indexOf(this.currentQuote);

    if (index === allQuotes.length - 1) {
      if (this.isOnline) {
        this.getNewQuote();
      } else {
        this.currentQuote = allQuotes[0];
      }
    } else {
      this.currentQuote = allQuotes[index + 1];
    }
  }

  public prevQuote(): void {
    const allQuotes: IQuote[] = this.quotesStore.getQuotes();
    const index: number = allQuotes.indexOf(this.currentQuote);
  
    if (index > 0) {
      this.currentQuote = allQuotes[index - 1];
    }
  }

  private offlineListner() {
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe((value: boolean) => {
      this.isOnline = value;
    });
  }

  private getNewQuote(): void {
    race(
      this.http.getFromQuotable$(),
      this.http.getFromDummyJson$()
    ).subscribe((quote: IQuote): void => {
      this.currentQuote = quote;
      this.quotesStore.addQuote(this.currentQuote);
    });
  }
}
