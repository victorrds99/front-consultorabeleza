import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="register-container">
      <div class="register-header">
        <h1>📝 Cadastro</h1>
        <p>Crie sua conta para continuar</p>
      </div>

      <div class="register-form-container">
        <form (ngSubmit)="onRegister()" #registerForm="ngForm" class="register-form" *ngIf="!showConfirmation">
          <div class="form-group">
            <label for="username">Usuário (Email):</label>
            <input
              type="email"
              id="username"
              [(ngModel)]="username"
              name="username"
              required
              class="form-control"
              placeholder="Digite seu email como usuário">
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="email"
              name="email"
              required
              class="form-control"
              placeholder="Digite seu email">
          </div>

          <div class="form-group">
            <label for="password">Senha:</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              required
              class="form-control"
              placeholder="Digite sua senha">
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              required
              class="form-control"
              placeholder="Confirme sua senha">
          </div>

          <button type="submit" class="btn-register" [disabled]="!registerForm.form.valid || isLoading">
            <span *ngIf="isLoading">🔄 Criando conta...</span>
            <span *ngIf="!isLoading">Cadastrar</span>
          </button>
        </form>

        <form (ngSubmit)="onConfirm()" #confirmForm="ngForm" class="register-form" *ngIf="showConfirmation">
          <div class="form-group">
            <label for="confirmationCode">Código de Confirmação:</label>
            <input
              type="text"
              id="confirmationCode"
              [(ngModel)]="confirmationCode"
              name="confirmationCode"
              required
              class="form-control"
              placeholder="Digite o código do email">
          </div>

          <button type="submit" class="btn-register" [disabled]="!confirmForm.form.valid || isLoading">
            <span *ngIf="isLoading">🔄 Confirmando...</span>
            <span *ngIf="!isLoading">Confirmar</span>
          </button>
        </form>

        <div class="register-info">
          <p *ngIf="!showConfirmation">Já tem uma conta? <a routerLink="/login">Faça login</a></p>
          <p *ngIf="showConfirmation">Código não recebido? <a href="#" (click)="resendCode()">Reenviar código</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .register-header {
      text-align: center;
      color: white;
      margin-bottom: 30px;

      h1 {
        margin: 0 0 10px 0;
        font-size: 2.5rem;
        font-weight: bold;
      }

      p {
        margin: 0;
        font-size: 1.1rem;
        opacity: 0.9;
      }
    }

    .register-form-container {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 450px;
    }

    .register-form {
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 25px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 15px;
      border: 2px solid #e1e8ed;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #667eea;
      }

      &::placeholder {
        color: #a0a0a0;
      }
    }

    .btn-register {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
    }

    .register-info {
      text-align: center;

      a {
        color: #667eea;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 768px) {
      .register-container {
        padding: 15px;
      }

      .register-header h1 {
        font-size: 2rem;
      }

      .register-form-container {
        padding: 30px 25px;
      }
    }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  confirmationCode = '';
  isLoading = false;
  showConfirmation = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    this.isLoading = true;

    try {
      console.log('Tentando registrar...');
      await this.authService.signUp(this.username, this.password, this.email);
      console.log('Registro realizado com sucesso, aguardando confirmação...');
      alert('Conta criada com sucesso! Verifique seu email para o código de confirmação.');
      this.showConfirmation = true;
    } catch (err) {
      console.error('Erro no registro:', err);
      alert('Erro no registro. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

  async onConfirm() {
    if (!this.confirmationCode) {
      alert('Por favor, digite o código de confirmação.');
      return;
    }

    this.isLoading = true;

    try {
      console.log('Tentando confirmar...');
      await this.authService.confirmSignUp(this.username, this.confirmationCode);
      console.log('Confirmação realizada com sucesso, redirecionando para login...');
      alert('Conta confirmada com sucesso! Agora você pode fazer login.');
      this.router.navigate(['login']);
    } catch (err) {
      console.error('Erro na confirmação:', err);
      alert('Erro na confirmação. Verifique o código e tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

  async resendCode() {
    try {
      await this.authService.resendSignUpCode(this.username);
      alert('Código reenviado para seu email.');
    } catch (err) {
      console.error('Erro ao reenviar código:', err);
      alert('Erro ao reenviar código. Tente novamente.');
    }
  }
}
