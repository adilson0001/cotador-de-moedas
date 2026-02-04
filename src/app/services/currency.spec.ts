import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // A URL base da AwesomeAPI
  private apiUrl = 'https://economia.awesomeapi.com.br/last/';

  constructor(private http: HttpClient) { }

  // Esta função vai buscar a cotação
  getExchangeRate(moedas: string): Observable<any> {
    // Exemplo: moedas = "USD-BRL"
    // Adicionamos o ?t= para garantir que o Reverse Proxy nos dê o dado fresco
    return this.http.get(`${this.apiUrl}${moedas}?t=${Date.now()}`);
  }
}