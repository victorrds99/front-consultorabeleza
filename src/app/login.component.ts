import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-header">
        <h1>🔐 Login</h1>
        <p>Acesse sua conta para continuar</p>
      </div>

      <div class="login-form-container">
        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="username">Usuário:</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              required
              class="form-control"
              placeholder="Digite seu usuário">
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

          <button type="submit" class="btn-login" [disabled]="!loginForm.form.valid || isLoading">
            <span *ngIf="isLoading">🔄 Fazendo login...</span>
            <span *ngIf="!isLoading">Entrar</span>
          </button>
        </form>

        <div class="login-info">
          <h3>💡 Para testar o sistema:</h3>
          <p><strong>Usuário:</strong> qualquer@email.com</p>
          <p><strong>Senha:</strong> qualquer senha</p>
          <p class="note">* O login é simulado para demonstração</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .login-header {
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

    .login-form-container {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 450px;
    }

    .login-form {
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

    .btn-login {
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

    .login-info {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      border-left: 4px solid #667eea;

      h3 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 1.1rem;
      }

      p {
        margin: 5px 0;
        color: #666;
      }

      .note {
        font-size: 0.9rem;
        color: #888;
        font-style: italic;
      }
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 15px;
      }

      .login-header h1 {
        font-size: 2rem;
      }

      .login-form-container {
        padding: 30px 25px;
      }
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.isLoading = true;

    try {
      console.log('Tentando fazer login...');

      // Simular login para demonstração
      // Em produção, isso seria uma chamada real para o backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular token
      localStorage.setItem('token', 'demo-token-' + Date.now());

      console.log('Login simulado realizado com sucesso, redirecionando...');
      this.router.navigate(['catalogo']);
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Erro no login. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }
}
