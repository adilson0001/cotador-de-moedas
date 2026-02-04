import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://economia.awesomeapi.com.br/last/';

  constructor(private http: HttpClient) { }

  getExchangeRate(moedas: string): Observable<any> {
    // Usamos o Date.now() para furar o cache do "Porteiro" como aprendemos!
    return this.http.get(`${this.apiUrl}${moedas}?t=${Date.now()}`);
  }
}