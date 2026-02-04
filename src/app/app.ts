import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './services/currency.service'; // Importa o serviço que criamos
import { FormsModule } from '@angular/forms'; // Necessário para o input funcionar
import { CommonModule } from '@angular/common'; // Necessário para pipes e diretivas básicas

@Component({
  selector: 'app-root',
  standalone: true, // Garante que o componente funciona sozinho
  imports: [RouterOutlet, FormsModule, CommonModule], // Adicionamos os módulos aqui
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // 1. Variáveis que vão "segurar" os dados na memória
  valorDigitado: number = 0; 
  resultadoFinal: number = 0;
  carregando: boolean = false; // <-- Nova variável

  // 2. Injetamos o serviço no "Construtor" (O entregador de dados)
  constructor(private currencyService: CurrencyService) {}

  // 3. A função que faz a mágica acontecer
  executarConversao() {
    // Chamamos o serviço pedindo Dólar para Real
    this.currencyService.getExchangeRate('USD-BRL').subscribe({
      next: (dados) => {
        // Pegamos a cotação (bid) dentro do objeto que a API enviou
        const cotacao = dados['USDBRL'].bid;
        
        // Fazemos a conta: Valor que você digitou * cotação
        this.resultadoFinal = this.valorDigitado * parseFloat(cotacao);
        
        console.log('Dados recebidos da API:', dados);
      },
      error: (erro) => {
        console.error('Erro ao conectar com a API:', erro);
        alert('O "Porteiro" da API barrou o pedido ou você está sem internet!');
      }
    });
  }
}