import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyComponent} from "./body.component";
import {BodyRoutingModule} from "./body-routing.module";
import {ExchangeComponent} from "../exchange/exchange.component";
import {HeaderComponent} from "../header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BodyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BodyComponent, ExchangeComponent, HeaderComponent]
})
export class BodyModule {
}
