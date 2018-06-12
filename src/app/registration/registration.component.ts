import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { ngfModule, ngf } from "angular-file";
import { RegistrationService } from './registration.service';
import { Subscription } from 'rxjs';
import { User } from '../objects/user'
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Directive } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  hide = true;

  registerURL = 'http://'+ location.host +'/api/register';
  form: FormData = new FormData();

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

  constructor(private registrationService: RegistrationService,
    private spinner: NgxSpinnerService,
    private HttpClient:HttpClient) { }

  ngOnInit() {
  }

  onRegister(files): any {
    console.log(files);
    if(files != undefined && files.length > 0) {
      this.form.append("name", this.user.name);
      this.form.append("email", this.user.email);
      this.form.append("username", this.user.username);
      this.form.append("password", this.user.password);
      this.form.append("mobile", String(this.user.mobile));
      this.form.append("gender", this.user.gender);
      this.form.append("question", this.user.question);
      this.form.append("answer", this.user.answer);
      this.form.append("dob", String(this.user.dob));
      this.form.append("file", files[0], files[0].name);
      const config = new HttpRequest<FormData>('POST', this.registerURL, this.form);
      return this.HttpClient.request( config )
      .subscribe(response => {
        console.log(response)
      }, error=>{
        alert('!failure beyond compare cause:' + error.toString())
      })
    } else {
      swal({
        position: 'top-end',
        type: 'warning',
        title: 'Image not found',
        text: 'Please try again! select one image',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  // onRegister(files): void {
  //   console.log(files);
  //   if(files != undefined && files.length > 0) {      
  //     // this.spinner.show();
  //     // console.log(this.user);
  //     // this.registrationService.register(this.user)
  //     // .subscribe(response => {
  //     //   this.spinner.hide();
  //     //   console.log(response);
  //     //   if(response.status && response.info != null) {
  //     //     swal({
  //     //       position: 'top-end',
  //     //       type: 'success',
  //     //       title: 'Account succesfully created',
  //     //       text: 'Login to your register email to activate your account',
  //     //       showConfirmButton: false,
  //     //       timer: 3000
  //     //     })
  //     //   }
  //     // });
  //   } else {
  //     swal({
  //       position: 'top-end',
  //       type: 'warning',
  //       title: 'Image not found',
  //       text: 'Please try again! select one image',
  //       showConfirmButton: false,
  //       timer: 3000
  //     })
  //   }
  // }

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
