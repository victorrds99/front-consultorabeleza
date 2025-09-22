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
