import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
@Component({
  templateUrl: './login.component.html',
  styles: [`
  .form-group{margin:10px;}
  `]
})
export class LoginComponent implements OnInit {
  message: string;
  constructor(private router: Router, public authService: AuthService) {
    this.message = '';
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.message = 'Logout Successfully';
      this.logout();
    }
  }

  // login() {
  //   this.router.navigate(['/products']);
  // }
  login(username: string, password: string): boolean {
    this.message = '';
    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(function () {
        this.message = '';
      }.bind(this), 2500);
    } else {
      this.router.navigate(['/products']);
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
