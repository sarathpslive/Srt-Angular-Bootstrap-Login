import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginSuccess = null;
  constructor(
    private loginService: LoginService,
    private cookies: CookieService
  ) {}

  ngOnInit() {
    if (this.cookies.get('isLoginSuccess') === 'true') {
      this.loginService.loginSuccess();
    }
  }

  validateUser(e, username, password) {
    e.preventDefault();
    this.isLoginSuccess = this.loginService.login(
      username.value,
      password.value
    );
  }
}
