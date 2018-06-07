import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../objects/user'
import { LoginService } from './login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  hide = true;
  
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  user: User = {
    name: '',
    email: '',
    username: 'hemu',
    password: 'hemu',
    mobile: 0,
    gender: '',
    question: '',
    answer: '',
    dob: new Date()
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