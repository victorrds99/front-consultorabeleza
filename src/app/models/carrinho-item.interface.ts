import { Produto } from '../catalogo/catalogo.component';

export interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}
