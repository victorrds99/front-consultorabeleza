import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./catalogo/catalogo.component').then(m => m.CatalogoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'checkout/confirmacao',
    loadComponent: () =>
      import('./checkout/checkout-confirmacao.component').then(m => m.CheckoutConfirmacaoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: '/catalogo',
    pathMatch: 'full'
  }
];
