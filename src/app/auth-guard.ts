import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    // Verificar se há token no localStorage (login simulado)
    const token = authService.getToken();

    if (!token) {
      router.navigate(['login']);
      return false;
    }

    // Se já estiver autenticado e tentar acessar login, redireciona para catalogo
    if (state.url === '/login') {
      router.navigate(['catalogo']);
      return false;
    }

    // Permite acesso à rota solicitada
    return true;
  } catch (error) {
    console.error('Erro no AuthGuard:', error);
    router.navigate(['login']);
    return false;
  }
};
