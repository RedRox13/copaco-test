import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuote } from 'src/app/interfaces/quote.interface';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {
  public stars: boolean[] = Array(5).fill(false);
  private _quote!: IQuote;

  @Input() set quote(value: IQuote) {
    if (!value) return;
    this._quote = value;
    value.rating ? this.fillStars(value.rating) : this.stars.fill(false, 0);
  };
  get quote(): IQuote {
    return this._quote;
  }

  @Output() onRate: EventEmitter<number> = new EventEmitter();

  public onRateClick(value: number): void {
    this.fillStars(value);
    this.onRate.emit(value);
  }

  private fillStars(value: number): void {
    this.stars.fill(true, 0, value)
    this.stars.fill(false, value);
  }
}
