import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from './services/carrinho.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-consultorabeleza';
  totalItensCarrinho: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.atualizarContadorCarrinho();
    this.subscription.add(
      this.carrinhoService.itens$.subscribe(() => {
        this.atualizarContadorCarrinho();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private atualizarContadorCarrinho(): void {
    this.totalItensCarrinho = this.carrinhoService.getTotalItens();
  }
}
