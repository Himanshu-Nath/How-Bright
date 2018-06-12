import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivationService } from './activation.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor( private route: ActivatedRoute, private activationService: ActivationService, 
    private router: Router,
    private spinner: NgxSpinnerService ) { }

  key: string;
  status: Boolean;
  name: string;

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.getActivationStatus();
  }

  getActivationStatus() : any {
    this.activationService.getActivationStatus(this.key)
    .subscribe(response => {
      console.log(response);
      if(response.status) {
        this.status = response.activationStatus;
        this.name = response.name;
      } else {
        swal({
          position: 'top-end',
          type: 'error',
          title: 'Account not found',
          text: 'Contact to admin not able to find your account! Sorry',
          showConfirmButton: false,
          timer: 4000
        })
        this.router.navigate(['/login']);
      }
    });
  }

  onActivate(): void {
    this.spinner.show();
    this.activationService.activate(this.key)
    .subscribe(response => {
      this.spinner.hide();
      console.log(response);
      if(response.status) {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Account Activated',
          text: 'Login to How-Brigth',
          showConfirmButton: false,
          timer: 4000
        })
      }      
      this.router.navigate(['/login']);
    });
  }

}
