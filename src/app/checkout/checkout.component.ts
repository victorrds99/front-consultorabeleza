import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { PedidoService } from '../services/pedido.service';
import { CarrinhoItem } from '../models/carrinho-item.interface';
import { Pedido } from '../models/pedido.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  itensCarrinho: CarrinhoItem[] = [];
  pedido: Pedido | null = null;

  // Opções de pagamento
  metodosPagamento = [
    { value: 'cartao', label: 'Cartão de Crédito/Débito' },
    { value: 'pix', label: 'PIX' },
    { value: 'boleto', label: 'Boleto Bancário' }
  ];

  // Estados brasileiros
  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private carrinhoService: CarrinhoService,
    public pedidoService: PedidoService
  ) {
    this.checkoutForm = this.fb.group({
      // Dados do cliente
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],

      // Endereço
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],

      // Pagamento
      metodoPagamento: ['cartao', [Validators.required]],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    this.itensCarrinho = this.carrinhoService.getItens();

    if (this.itensCarrinho.length === 0) {
      this.router.navigate(['/catalogo']);
      return;
    }
  }

  get subtotal(): number {
    return this.itensCarrinho.reduce((total, item) =>
      total + (item.produto.preco * item.quantidade), 0
    );
  }

  get frete(): number {
    // Se o formulário tem estado preenchido, usa cálculo por endereço
    const estado = this.checkoutForm.get('estado')?.value;
    if (estado) {
      return this.pedidoService.calcularFretePorEndereco(this.subtotal, { estado });
    }
    // Caso contrário, usa cálculo padrão
    return this.pedidoService['calcularFrete'](this.subtotal);
  }

  get total(): number {
    return this.subtotal + this.frete;
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

  onSubmit(): void {
    if (this.checkoutForm.valid && this.itensCarrinho.length > 0) {
      const formValue = this.checkoutForm.value;

      this.pedido = this.pedidoService.criarPedido(
        {
          nome: formValue.nome,
          email: formValue.email,
          telefone: formValue.telefone
        },
        {
          cep: formValue.cep,
          rua: formValue.rua,
          numero: formValue.numero,
          complemento: formValue.complemento,
          bairro: formValue.bairro,
          cidade: formValue.cidade,
          estado: formValue.estado
        },
        this.itensCarrinho,
        formValue.metodoPagamento,
        formValue.observacoes
      );

      // Limpar carrinho após criar pedido
      this.carrinhoService.limparCarrinho();

      // Redirecionar para confirmação
      this.router.navigate(['/checkout/confirmacao'], {
        state: { pedido: this.pedido }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);

    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} é obrigatório`;
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }

    return '';
  }

  voltarAoCarrinho(): void {
    this.router.navigate(['/carrinho']);
  }
}
