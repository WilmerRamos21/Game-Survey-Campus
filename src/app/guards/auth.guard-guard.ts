import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);

  const router = inject(Router);

  const logeado =
    await authService.estaLogeado();

  if(logeado){
    return true;
  }

  router.navigate(['/login']);

  return false;
};