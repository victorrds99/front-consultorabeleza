import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then(m => m.HomeComponent)
  },
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
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
