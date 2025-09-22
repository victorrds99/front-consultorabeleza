import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../catalogo/catalogo.component';
import { CarrinhoItem } from '../models/carrinho-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly STORAGE_KEY = 'carrinho_beleza';
  private itensSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  public itens$ = this.itensSubject.asObservable();

  constructor() {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    const carrinhoSalvo = localStorage.getItem(this.STORAGE_KEY);
    if (carrinhoSalvo) {
      try {
        const itens = JSON.parse(carrinhoSalvo);
        this.itensSubject.next(itens);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        this.itensSubject.next([]);
      }
    }
  }

  private salvarCarrinho(itens: CarrinhoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
    this.itensSubject.next(itens);
  }

  adicionarProduto(produto: Produto, quantidade: number = 1): void {
    const itensAtuais = this.itensSubject.value;
    const itemExistente = itensAtuais.find(item => item.produto.id === produto.id);

    let novosItens: CarrinhoItem[];

    if (itemExistente) {
      novosItens = itensAtuais.map(item =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      );
    } else {
      novosItens = [...itensAtuais, { produto, quantidade }];
    }

    this.salvarCarrinho(novosItens);
  }

  alterarQuantidade(produtoId: number, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      this.removerItem(produtoId);
      return;
    }

    const itensAtuais = this.itensSubject.value;
    const novosItens = itensAtuais.map(item =>
      item.produto.id === produtoId
        ? { ...item, quantidade: novaQuantidade }
        : item
    );

    this.salvarCarrinho(novosItens);
  }

  removerItem(produtoId: number): void {
    const itensAtuais = this.itensSubject.value;
    const novosItens = itensAtuais.filter(item => item.produto.id !== produtoId);
    this.salvarCarrinho(novosItens);
  }

  limparCarrinho(): void {
    this.salvarCarrinho([]);
  }

  getItens(): CarrinhoItem[] {
    return this.itensSubject.value;
  }

  getTotalItens(): number {
    return this.itensSubject.value.reduce((total, item) => total + item.quantidade, 0);
  }

  getTotalValor(): number {
    return this.itensSubject.value.reduce((total, item) =>
      total + (item.produto.preco * item.quantidade), 0
    );
  }

  formatarTotal(): string {
    return this.getTotalValor().toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
