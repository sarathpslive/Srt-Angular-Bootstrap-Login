import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  isLoginSuccess = false;
  constructor(private router: Router) {}

  logout() {
    this.isLoginSuccess = false;
    this.router.navigate(['/login']);
  }

  login(userName, password) {
    if (userName === 'htaras' && password === 'htaras') {
      this.isLoginSuccess = true;
      this.router.navigate(['/home']);
    } else {
      this.isLoginSuccess = false;
    }
    return this.isLoginSuccess;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoginSuccess) {
      return true;
    }
    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
