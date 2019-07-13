import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginSuccess = null;
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  validateUser(e, username, password) {
    e.preventDefault();
    this.isLoginSuccess = this.loginService.login(
      username.value,
      password.value
    );
  }
}
