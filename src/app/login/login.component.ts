import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import { Location } from '@angular/common';
import swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../objects/user'
import { LoginService } from './login.service';
import { UtilsService } from '../service/utils.service';

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

  constructor(private loginService: LoginService, 
    private location: Location, 
    private localStorage: LocalStorageService,
    private utils: UtilsService,
    private spinner: NgxSpinnerService) {
    // this.user.username = "himans";
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  onLogin(): void {
    this.spinner.show();
    console.log(this.user);
    this.loginService.login(this.user)
    .subscribe(response => {
      this.spinner.hide();
      console.log(response);
      // swal('Any fool can use a computer')
      if(response.status) {
        this.utils.toast({
          type: 'success',
          title: 'Signed in successfully'
        })
        this.localStorage.set("token", response.result.token, 1000, 'm');
      } else {
        this.utils.toast({
          type: 'error',
          title: 'Signed in failed'
        })
      }
      console.log(this.localStorage.get("token"));
      this.localStorage.remove("token");
      this.localStorage.clear();
    });
  }

}