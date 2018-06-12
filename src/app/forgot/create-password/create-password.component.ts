import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CreatePasswordService } from './create-password.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  key: string;
  status: Boolean;
  name: string;
  hide1 = true;
  hide2 = true;
  user: UserForgotPassword = {
    id: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'You must enter a value' : '';
  }

  constructor(private createPasswordService: CreatePasswordService, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.getCreatePasswordStatus(this.key);
  }

  getCreatePasswordStatus(key): any {
      this.createPasswordService.getCreatePasswordStatus(key)
      .subscribe(response => {
        console.log(response);
        if(response.status) {
          this.status = response.activationStatus;
          this.name = response.name;
          this.user.id = response.id;
          this.user.email = response.email; 
        } else {
          this.status = true;
        }
      });
  }

  checkPassword(): any {
    if(this.user.password == this.user.confirmPassword) {
      this.confirmPassword.setErrors(null);
    } else {
      this.confirmPassword.setErrors({'incorrect': true});
    }
  }

  onCreatePassword(): any {
    this.spinner.show();
      this.createPasswordService.createPassword(this.user)
      .subscribe(response => {
        this.spinner.hide();
        console.log(response);
        if(response.status) {
          swal({
            position: 'top-end',
            type: 'success',
            title: 'New Password Created',
            text: 'Login to How-Brigth',
            showConfirmButton: false,
            timer: 3000
          })
        } else {
          swal({
            position: 'top-end',
            type: 'error',
            title: 'Failed to create new password',
            text: response.devMsg,
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
  }

}

export class  UserForgotPassword {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
}
