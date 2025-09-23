import { Injectable } from '@angular/core';
import { fetchAuthSession, signIn, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async salvarToken(): Promise<void> {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken;

    if (token) {
      localStorage.setItem('token', token.toString());
      console.log('Token salvo:', token.toString());
    } else {
      console.warn('Token não encontrado');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async isAuthenticatedAsync(): Promise<boolean> {
    try {
      const session = await fetchAuthSession();
      return !!session.tokens?.accessToken;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const result = await signIn({ username, password });
      await this.salvarToken(); // Salvar token após login
      return result;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async signUp(username: string, password: string, email: string): Promise<any> {
    try {
      // Se o username for um email, não inclua o atributo email separadamente
      const userAttributes: any = {};
      if (email && !username.includes('@')) {
        userAttributes.email = email;
      }

      const result = await signUp({
        username,
        password,
        options: {
          userAttributes,
        },
      });
      return result;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  async confirmSignUp(username: string, confirmationCode: string): Promise<any> {
    try {
      const result = await confirmSignUp({ username, confirmationCode });
      return result;
    } catch (error) {
      console.error('Erro na confirmação:', error);
      throw error;
    }
  }

  async resendSignUpCode(username: string): Promise<any> {
    try {
      const result = await resendSignUpCode({ username });
      return result;
    } catch (error) {
      console.error('Erro ao reenviar código:', error);
      throw error;
    }
  }
}
