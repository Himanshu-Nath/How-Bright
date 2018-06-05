import { Component, OnInit } from '@angular/core';
import { User } from '../objects/user'

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

  constructor() {
    // this.user.username = "himans";
  }

  ngOnInit() {
  }

  onLogin(): void {
    console.log(this.user);
  }

}