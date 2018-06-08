import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivationService } from './activation.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor( private route: ActivatedRoute, private activationService: ActivationService, private router: Router ) { }

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
        this.status = true;
      }
    });
  }

  onActivate(): void {
    this.activationService.activate(this.key)
    .subscribe(response => {
      console.log(response);
      if(response.status) {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Account Activated',
          text: 'Login to How-Brigth',
          showConfirmButton: false,
          timer: 1500
        })
      }      
      this.router.navigate(['/login']);
    });
  }

}
