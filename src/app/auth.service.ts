import { Injectable } from '@angular/core';
import { fetchAuthSession } from 'aws-amplify/auth';

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
}