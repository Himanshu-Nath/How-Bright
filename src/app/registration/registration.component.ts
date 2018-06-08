import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { User } from '../objects/user'
import swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  hide = true;

  questions = [
    'What is birth place?',
    'What is your best friend name?',
    'What is your pet name?',
    'What is your first vehicle number?',
    'What is your 10th marks?'
  ];
  genderOption = [
    'Male',
    'Female',
    'Other'
  ];

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required]);
  question = new FormControl('', [Validators.required]);
  answer = new FormControl('', [Validators.required]);
  
  getFullnameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  getMobileErrorMessage() {
    return this.mobile.hasError('required') ? 'You must enter a value' : '';
  }

  getAnswerErrorMessage() {
    return this.answer.hasError('required') ? 'You must enter a value' : '';
  }

  user: User = {
    name: 'Himanshu',
    email: 'hnath723@gmail.com',
    username: 'hemu',
    password: 'hemu',
    mobile: 9089876756,
    gender: this.genderOption[0],
    question: this.questions[0],
    answer: 'DOS',
    dob: new Date()
  };

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  onRegister(): void {
    console.log(this.user);
    this.registrationService.register(this.user)
    .subscribe(response => {
      console.log(response);
      if(response.status && response.info != null) {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Account succesfully created',
          text: 'Login to your register email to activate your account',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  availabilityCheck(data, type): any {
    this.registrationService.availabilityCheck(data)
    .subscribe(result => {
      console.log(result);
      if(result.status && result.count > 0) {
        if(type == 'email') {
          this.email.setErrors({'incorrect': true});
        } else {
          this.username.setErrors({'incorrect': true});
        }        
      } else {
        this.email.setErrors(null);
        this.username.setErrors(null);
      }
    });
  }

}
