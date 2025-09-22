import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pedido } from '../models/pedido.interface';
import { CarrinhoItem } from '../models/carrinho-item.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly STORAGE_KEY = 'pedidos_beleza';
  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);
  public pedidos$ = this.pedidosSubject.asObservable();

  constructor() {
    this.carregarPedidos();
  }

  private carregarPedidos(): void {
    const pedidosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (pedidosSalvos) {
      try {
        const pedidos = JSON.parse(pedidosSalvos).map((pedido: any) => ({
          ...pedido,
          dataCriacao: new Date(pedido.dataCriacao)
        }));
        this.pedidosSubject.next(pedidos);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        this.pedidosSubject.next([]);
      }
    }
  }

  private salvarPedidos(pedidos: Pedido[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pedidos));
    this.pedidosSubject.next(pedidos);
  }

  criarPedido(
    cliente: { nome: string; email: string; telefone: string },
    endereco: any,
    itens: CarrinhoItem[],
    metodoPagamento: 'cartao' | 'pix' | 'boleto',
    observacoes?: string
  ): Pedido {
    const subtotal = itens.reduce((total, item) =>
      total + (item.produto.preco * item.quantidade), 0
    );

    const frete = this.calcularFrete(subtotal);
    const total = subtotal + frete;

    const pedido: Pedido = {
      id: this.gerarId(),
      cliente,
      endereco,
      itens,
      subtotal,
      frete,
      total,
      metodoPagamento,
      status: 'pendente',
      dataCriacao: new Date(),
      observacoes
    };

    const pedidosAtuais = this.pedidosSubject.value;
    const novosPedidos = [...pedidosAtuais, pedido];
    this.salvarPedidos(novosPedidos);

    return pedido;
  }

  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private calcularFrete(subtotal: number, endereco?: any): number {
    // Se não tem endereço, usa cálculo antigo baseado apenas no subtotal
    if (!endereco || !endereco.estado) {
      return this.calcularFretePorValor(subtotal);
    }

    // Cálculo baseado no estado/região
    const freteBase = this.calcularFretePorRegiao(endereco.estado);

    // Frete grátis para compras acima de R$ 200 (independentemente da região)
    if (subtotal >= 200) {
      return 0;
    }

    // Adicional para compras menores baseado no subtotal
    let adicional = 0;
    if (subtotal < 100) {
      adicional = 10;
    } else if (subtotal < 150) {
      adicional = 5;
    }

    return freteBase + adicional;
  }

  private calcularFretePorValor(subtotal: number): number {
    // Frete grátis para compras acima de R$ 150
    if (subtotal >= 150) {
      return 0;
    }
    // Frete fixo de R$ 15 para compras menores
    return 15;
  }

  private calcularFretePorRegiao(estado: string): number {
    // Tabela de fretes por região (valores em R$)
    const tabelaFrete: { [key: string]: number } = {
      // Região Sudeste (mais próxima)
      'SP': 12,
      'RJ': 15,
      'MG': 18,
      'ES': 20,

      // Região Sul
      'RS': 22,
      'SC': 20,
      'PR': 18,

      // Região Centro-Oeste
      'MT': 25,
      'MS': 23,
      'GO': 22,
      'DF': 20,

      // Região Nordeste
      'BA': 28,
      'PE': 30,
      'CE': 32,
      'MA': 35,
      'PI': 33,
      'RN': 30,
      'PB': 29,
      'AL': 31,
      'SE': 28,

      // Região Norte
      'AM': 40,
      'PA': 38,
      'AC': 45,
      'RO': 42,
      'RR': 44,
      'AP': 43,
      'TO': 35
    };

    return tabelaFrete[estado] || 25; // Valor padrão para estados não mapeados
  }

  getPedidos(): Pedido[] {
    return this.pedidosSubject.value;
  }

  getPedidoPorId(id: string): Pedido | undefined {
    return this.pedidosSubject.value.find(pedido => pedido.id === id);
  }

  atualizarStatusPedido(id: string, status: Pedido['status']): void {
    const pedidos = this.pedidosSubject.value;
    const pedidoIndex = pedidos.findIndex(p => p.id === id);

    if (pedidoIndex !== -1) {
      pedidos[pedidoIndex].status = status;
      this.salvarPedidos(pedidos);
    }
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getTotalPedidos(): number {
    return this.pedidosSubject.value.length;
  }

  getPedidosPorStatus(status: Pedido['status']): Pedido[] {
    return this.pedidosSubject.value.filter(pedido => pedido.status === status);
  }

  // Método público para calcular frete baseado no endereço (para uso em tempo real no checkout)
  calcularFretePorEndereco(subtotal: number, endereco: any): number {
    return this.calcularFrete(subtotal, endereco);
  }

  // Método para obter o nome da região baseado no estado
  getRegiaoPorEstado(estado: string): string {
    const regioes: { [key: string]: string } = {
      'SP': 'Sudeste', 'RJ': 'Sudeste', 'MG': 'Sudeste', 'ES': 'Sudeste',
      'RS': 'Sul', 'SC': 'Sul', 'PR': 'Sul',
      'MT': 'Centro-Oeste', 'MS': 'Centro-Oeste', 'GO': 'Centro-Oeste', 'DF': 'Centro-Oeste',
      'BA': 'Nordeste', 'PE': 'Nordeste', 'CE': 'Nordeste', 'MA': 'Nordeste',
      'PI': 'Nordeste', 'RN': 'Nordeste', 'PB': 'Nordeste', 'AL': 'Nordeste', 'SE': 'Nordeste',
      'AM': 'Norte', 'PA': 'Norte', 'AC': 'Norte', 'RO': 'Norte',
      'RR': 'Norte', 'AP': 'Norte', 'TO': 'Norte'
    };

    return regioes[estado] || 'Região não identificada';
  }
}
