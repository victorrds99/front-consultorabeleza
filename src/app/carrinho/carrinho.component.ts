import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { CarrinhoItem } from '../models/carrinho-item.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: CarrinhoItem[] = [];
  totalItens: number = 0;
  totalValor: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
    this.carrinhoService.itens$.subscribe(itens => {
      this.carregarCarrinho();
    });
  }

  private carregarCarrinho(): void {
    this.itensCarrinho = this.carrinhoService.getItens();
    this.totalItens = this.carrinhoService.getTotalItens();
    this.totalValor = this.carrinhoService.getTotalValor();
  }

  aumentarQuantidade(produtoId: number): void {
    const item = this.itensCarrinho.find(item => item.produto.id === produtoId);
    if (item) {
      this.carrinhoService.alterarQuantidade(produtoId, item.quantidade + 1);
    }
  }

  diminuirQuantidade(produtoId: number): void {
    const item = this.itensCarrinho.find(item => item.produto.id === produtoId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.alterarQuantidade(produtoId, item.quantidade - 1);
    }
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removerItem(produtoId);
  }

  limparCarrinho(): void {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      this.carrinhoService.limparCarrinho();
    }
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getSubtotal(item: CarrinhoItem): number {
    return item.produto.preco * item.quantidade;
  }

  finalizarCompra(): void {
    if (this.itensCarrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    // Redirecionar para o checkout
    this.router.navigate(['/checkout']);
  }
}
