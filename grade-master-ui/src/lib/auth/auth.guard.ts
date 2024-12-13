import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Hier prüfen wir, ob der Benutzer authentifiziert ist
  return authService.isAuthenticated$().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        // Umleitung zur Login-Seite, falls nicht authentifiziert
        return router.createUrlTree(['/login']);
      }
    })
  );
};