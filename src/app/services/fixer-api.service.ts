import {Injectable} from '@angular/core';
import {IExchangeCourse, IGetToUAHCourse} from "../interfaces/exchange-course";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FixerApiService {

  constructor(private http: HttpClient) {
  }

  private tokenId: string = '';
  private headers: HttpHeaders;
  private USDtoUAH: string = "https://api.apilayer.com/fixer/latest?symbols=UAH&base=USD"
  private EURtoUAH: string = "https://api.apilayer.com/fixer/latest?symbols=UAH&base=EUR"

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCurrencyExchange(amount: number, fromCurrency: string, toCurrency: string): Observable<IExchangeCourse> {
    this.initializeToken();
    const currencyUri = `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`;
    return this.http.get<IExchangeCourse>(currencyUri, {headers: this.headers}).pipe(
      catchError(this.handleError<IExchangeCourse>('getCurrencyExchange'))
    )
  }

  getAllExchangeToUAH(): Observable<IGetToUAHCourse[]> {
    this.initializeToken();
    return combineLatest(
      this.http.get<IGetToUAHCourse>(this.USDtoUAH, {headers: this.headers}),
      this.http.get<IGetToUAHCourse>(this.EURtoUAH, {headers: this.headers})
    )
  }

  initializeToken(): void {
    this.tokenId = 'lSxHb82KxiHDvyfoAD1AnxGtmJMNnUai';
    this.headers = new HttpHeaders().set('apikey', this.tokenId);
  }

}
