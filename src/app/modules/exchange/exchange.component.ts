import {Component, OnInit} from '@angular/core';
import {FixerApiService} from "../../services/fixer-api.service";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  constructor(private fixerApiInstance: FixerApiService) {
  }

  public selectedOptionBox1: string = 'UAH';
  public selectedOptionBox2: string = 'UAH';
  public inputOptionBox1: number = 1;
  public inputOptionBox2: number = 1;
  public printedOption: any;
  public UAH: string = 'UAH'
  public isContentLoaded: boolean = false;
  public options = [
    {name: 'UAH', value: 'UAH'},
    {name: 'USD', value: 'USD'},
    {name: 'EUR', value: 'EUR'}
  ]

  ngOnInit(): void {

  }

  convertCurrency(event: any): void {
    this.isContentLoaded = true;
    if (this.isFirstOptionChosen(event)) {
      this.fixerApiInstance.getCurrencyExchange(event.target.value, this.selectedOptionBox1, this.selectedOptionBox2)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.inputOptionBox2 = result
        })
    } else {
      this.fixerApiInstance.getCurrencyExchange(event.target.value, this.selectedOptionBox2, this.selectedOptionBox1)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.inputOptionBox1 = result
        })
    }
  }

  optionDropDownChange(event: any): void {
    this.isContentLoaded = true;
    if (this.isFirstOptionChosen(event)) {
      this.fixerApiInstance.getCurrencyExchange(this.inputOptionBox1, this.selectedOptionBox1, this.selectedOptionBox2)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.inputOptionBox2 = result
        })
    } else {
      this.fixerApiInstance.getCurrencyExchange(this.inputOptionBox2, this.selectedOptionBox2, this.selectedOptionBox1)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.inputOptionBox1 = result
        })
    }
  }

  isFirstOptionChosen(event: any): boolean {
    const [currentInput] = event.currentTarget.classList
    return currentInput.slice(-1) === '1'
  }

}
