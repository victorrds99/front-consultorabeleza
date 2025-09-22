import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pedido } from '../models/pedido.interface';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-checkout-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-confirmacao.component.html',
  styleUrl: './checkout-confirmacao.component.scss'
})
export class CheckoutConfirmacaoComponent implements OnInit {
  pedido: Pedido | null = null;

  constructor(
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // Tentar obter o pedido do state da navegação
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['pedido']) {
      this.pedido = navigation.extras.state['pedido'];
    } else {
      // Se não encontrou no state, redirecionar para o catálogo
      this.router.navigate(['/catalogo']);
    }
  }

  formatarPreco(preco: number): string {
    return this.pedidoService.formatarMoeda(preco);
  }

  getSubtotal(item: any): number {
    return item.produto.preco * item.quantidade;
  }

  voltarAoCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }

  fazerNovoPedido(): void {
    this.router.navigate(['/catalogo']);
  }

  imprimirPedido(): void {
    window.print();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pendente': return '#ffa500';
      case 'confirmado': return '#007bff';
      case 'enviado': return '#28a745';
      case 'entregue': return '#20c997';
      case 'cancelado': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'confirmado': return 'Confirmado';
      case 'enviado': return 'Enviado';
      case 'entregue': return 'Entregue';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }
}
