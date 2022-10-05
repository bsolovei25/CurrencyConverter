import {Component} from '@angular/core';
import {FixerApiService} from "../../services/fixer-api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent {

  constructor(private fixerApiInstance: FixerApiService) {
  }

  public UAH: string = 'UAH'
  public isContentLoaded: boolean = false;
  public options = [
    {name: 'UAH', value: 'UAH'},
    {name: 'USD', value: 'USD'},
    {name: 'EUR', value: 'EUR'}
  ]

  public currencyGroup = new FormGroup({
    inputOptionBox1 : new FormControl('1'),
    selectedOptionBox1 : new FormControl('UAH'),
    inputOptionBox2 : new FormControl('1'),
    selectedOptionBox2 : new FormControl('UAH')
  })

  convertCurrency(event: Event): void {
    const element = event.target as HTMLInputElement
    this.isContentLoaded = true;
    if (this.isFirstOptionChosen(event)) {
      this.fixerApiInstance.getCurrencyExchange(+element.value, this.currencyGroup.value.selectedOptionBox1,this.currencyGroup.value.selectedOptionBox2)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.currencyGroup.get('inputOptionBox2')?.setValue(result)
        })
    } else {
      this.fixerApiInstance.getCurrencyExchange(+element.value,this.currencyGroup.value.selectedOptionBox2,this.currencyGroup.value.selectedOptionBox1)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.currencyGroup.get('inputOptionBox1')?.setValue(result)
        })
    }
  }

  optionDropDownChange(event: Event): void {
    this.isContentLoaded = true;
    if (this.isFirstOptionChosen(event)) {
      this.fixerApiInstance.getCurrencyExchange(this.currencyGroup.value.inputOptionBox1, this.currencyGroup.value.selectedOptionBox1,this.currencyGroup.value.selectedOptionBox2)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.currencyGroup.get('inputOptionBox2')?.setValue(result)
        })
    } else {
      this.fixerApiInstance.getCurrencyExchange(this.currencyGroup.value.inputOptionBox2,this.currencyGroup.value.selectedOptionBox2,this.currencyGroup.value.selectedOptionBox1)
        .subscribe(({result}) => {
          this.isContentLoaded = false;
          this.currencyGroup.get('inputOptionBox1')?.setValue(result)
        })
    }
  }

  isFirstOptionChosen(event: Event): boolean {
    const element = event.currentTarget as HTMLInputElement
    // @ts-ignore
    const [currentInput] = element.classList
    return currentInput.slice(-1) === '1'
  }

}
