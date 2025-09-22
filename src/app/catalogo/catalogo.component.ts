import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Shampoo Nutritivo',
      descricao: 'Shampoo para cabelos secos e danificados',
      preco: 45.90,
      imagem: 'https://via.placeholder.com/300x200?text=Shampoo',
      categoria: 'Cabelos'
    },
    {
      id: 2,
      nome: 'Creme Hidratante Facial',
      descricao: 'Hidratação intensa para todos os tipos de pele',
      preco: 78.50,
      imagem: 'https://via.placeholder.com/300x200?text=Creme+Facial',
      categoria: 'Rosto'
    },
    {
      id: 3,
      nome: 'Esmalte Vermelho',
      descricao: 'Esmalte de longa duração cor vermelho paixão',
      preco: 12.90,
      imagem: 'https://via.placeholder.com/300x200?text=Esmalte',
      categoria: 'Unhas'
    },
    {
      id: 4,
      nome: 'Perfume Floral',
      descricao: 'Fragrância delicada com notas florais',
      preco: 189.90,
      imagem: 'https://via.placeholder.com/300x200?text=Perfume',
      categoria: 'Perfumes'
    },
    {
      id: 5,
      nome: 'Máscara de Argila',
      descricao: 'Limpeza profunda para pele oleosa',
      preco: 35.70,
      imagem: 'https://via.placeholder.com/300x200?text=Mascara',
      categoria: 'Rosto'
    },
    {
      id: 6,
      nome: 'Óleo Capilar',
      descricao: 'Óleo nutritivo para pontas duplas',
      preco: 52.30,
      imagem: 'https://via.placeholder.com/300x200?text=Oleo+Capilar',
      categoria: 'Cabelos'
    }
  ];

  categorias: string[] = ['Todos', 'Cabelos', 'Rosto', 'Unhas', 'Perfumes'];
  categoriaSelecionada: string = 'Todos';

  get produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
