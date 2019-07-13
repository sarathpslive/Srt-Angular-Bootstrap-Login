import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  isLoginSuccess = false;
  username = '';
  constructor(private router: Router, private cookies: CookieService) {}

  logout() {
    this.isLoginSuccess = false;
    this.cookies.deleteAll();
    this.router.navigate(['/login']);
  }

  login(username, password) {
    this.username = username;
    if (username === password) {
      this.cookies.set('isLoginSuccess', 'true');
      this.cookies.set('username', username);
      this.loginSuccess();
    } else {
      this.isLoginSuccess = false;
    }
    return this.isLoginSuccess;
  }

  loginSuccess() {
    this.username = this.cookies.get('username');
    this.isLoginSuccess = true;
    this.router.navigate(['/home']);
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
