import { Component, OnInit } from '@angular/core';
import {FixerApiService} from "../../services/fixer-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public USDtoUAHRate:number;
  public EURtoUAHRate: number;
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
