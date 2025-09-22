import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { signIn } from 'aws-amplify/auth';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, AmplifyAuthenticatorModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <amplify-authenticator>
        <ng-template amplifyAuthContainer>
          <div class="auth-container">
            <h3>Entre na sua conta</h3>
            <form (ngSubmit)="onLogin()" #loginForm="ngForm">
              <div class="form-group">
                <label for="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  [(ngModel)]="username"
                  name="username"
                  required
                  class="form-control">
              </div>

              <div class="form-group">
                <label for="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  class="form-control">
              </div>

              <button type="submit" class="btn-login" [disabled]="!loginForm.form.valid">
                Entrar
              </button>
            </form>
          </div>
        </ng-template>
      </amplify-authenticator>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .auth-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .btn-login {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
    }

    .btn-login:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-login:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      console.log('Tentando fazer login...');
      await signIn({ username: this.username, password: this.password });
      await this.authService.salvarToken();
      console.log('Login realizado com sucesso, redirecionando...');
      this.router.navigate(['catalogo']);
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Erro no login. Verifique suas credenciais.');
    }
  }
}
