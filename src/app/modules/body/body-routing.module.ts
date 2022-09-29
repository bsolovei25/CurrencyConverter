import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExchangeComponent} from "../exchange/exchange.component";
import {HeaderComponent} from "../header/header.component";

const routes: Routes = [
  {
    path: 'exchange',
    component: ExchangeComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
