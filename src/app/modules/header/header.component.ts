import { Component, OnInit } from '@angular/core';
import {FixerApiService} from "../../services/fixer-api.service";
import {IGetToUAHCourse} from "../../interfaces/exchange-course";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public USDtoUAHRate:IGetToUAHCourse;
  public EURtoUAHRate: IGetToUAHCourse;
  public currentDate:number = Date.now();

  constructor(private fixerApiInstance : FixerApiService) {
  }

  ngOnInit(): void {
    this.showCurrentUAHCourse();
  }

  showCurrentUAHCourse(): void {
    this.fixerApiInstance.getAllExchangeToUAH().subscribe(
      ([USDtoUAH, EURtoUAH]) => {
        this.USDtoUAHRate = USDtoUAH.rates.UAH;
        this.EURtoUAHRate = EURtoUAH.rates.UAH;
      })
  }

}
