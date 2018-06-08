import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  user: UserForgotPassword = {
    email: '',
    question: '',
    answer: ''
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  answer = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : '';
  }

  getAnswerErrorMessage() {
    return this.answer.hasError('required') ? 'You must enter a value' : '';
  }

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
  }

  checkEmail(email): any {
    if(email.length > 0) {
      this.forgotPasswordService.checkEmail(email)
      .subscribe(response => {
        console.log(response);
        if(response.status && response.result != null) {
          this.user.question = response.result.question.q1;
          this.email.setErrors(null);
        } else {
          this.email.setErrors({'incorrect': true});
        }
      });
    }
  }

  onForgot(): any {
    this.forgotPasswordService.forgotPassword(this.user)
    .subscribe(response => {
      console.log(response);
      if(response.status && response.devMsg != null) {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Mail Send',
          text: 'Login to your register email to create new password',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        swal({
          position: 'top-end',
          type: 'error',
          title: 'Failed to send mail',
          text: response.devMsg,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

}

export class  UserForgotPassword {
  email: string;
  question: string;
  answer: string;
}