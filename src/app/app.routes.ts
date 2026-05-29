import { Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth.guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'encuestas',
    loadComponent: () => import('./pages/encuestas/encuestas.page').then( m => m.EncuestasPage)
  },
  {
    path: 'encuesta-form',
    loadComponent: () => import('./pages/encuesta-form/encuesta-form.page').then( m => m.EncuestaFormPage)
  },
    {
    path: 'encuesta-form/:id',
    loadComponent: () => import('./pages/encuesta-form/encuesta-form.page').then( m => m.EncuestaFormPage)
  },
  {
    path: 'encuesta-detalle',
    loadComponent: () => import('./pages/encuesta-detalle/encuesta-detalle.page').then( m => m.EncuestaDetallePage)
  },
    {
    path: 'encuesta-detalle/:id',
    loadComponent: () => import('./pages/encuesta-detalle/encuesta-detalle.page').then( m => m.EncuestaDetallePage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
];
