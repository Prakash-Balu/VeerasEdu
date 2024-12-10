import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isMobile = this.authService.mobileValue;  
    const routeIsMobile = next.data['isMobile']; 
    const token = this.authService.tokenValue; 
    console.log(isMobile)
    console.log(routeIsMobile)
    if (!!token) {
      if (isMobile === 'true' && routeIsMobile === false ) {
        this.router.navigate(['/home']);
        return of(false);
      }
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
