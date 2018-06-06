import { Component, OnInit } from '@angular/core';
import { User } from '../objects/user'
import { LoginService } from './login.service';
import { Location } from '@angular/common';

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

  constructor(private loginService: LoginService, private location: Location) {
    // this.user.username = "himans";
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  onLogin(): void {
    console.log(this.user);
    this.loginService.login(this.user)
    .subscribe(user => {
      console.log(user);
    });
  }

}