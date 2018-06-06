import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivationService } from './activation.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor( private route: ActivatedRoute, private activationService: ActivationService, private router: Router ) { }

  key: string;
  status: Boolean;

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.getActivationStatus();
  }

  getActivationStatus() : any {
    this.activationService.getActivationStatus(this.key)
    .subscribe(result => {
      console.log(result);
      this.status = result.activationStatus;
    });
  }

  onActivate(): void {
    this.activationService.activate(this.key)
    .subscribe(result => {
      console.log(result);
      this.router.navigate(['/login']);
    });
  }

}
