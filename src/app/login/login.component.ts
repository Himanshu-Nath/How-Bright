import { Component, OnInit } from '@angular/core';
import { User } from '../objects/user'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = {
    username: 'Sam',
    password: 'Sam@gmail.com'
  };

  constructor(private loginService: LoginService) {
    // this.user.username = "himans";
  }

  ngOnInit() {
  }

  onLogin(): void {
    console.log(this.user);
    this.loginService.login(this.user);
    this.loginService.login(this.user)
    .subscribe(user => {
      console.log(user);
    });
  }

}