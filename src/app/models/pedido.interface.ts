import { CarrinhoItem } from './carrinho-item.interface';

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Pedido {
  id: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  endereco: Endereco;
  itens: CarrinhoItem[];
  subtotal: number;
  frete: number;
  total: number;
  metodoPagamento: 'cartao' | 'pix' | 'boleto';
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado';
  dataCriacao: Date;
  observacoes?: string;
}
