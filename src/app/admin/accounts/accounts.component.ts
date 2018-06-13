import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  searchByName = '';
  sortBy = new FormControl('', [Validators.required]);

  sortOptions = [
    {
      name: 'Name',
      section: [
        {value: 'name0', view: 'Ascending'},
        {value: 'name1', view: 'Descending'}
      ]
    },
    {
      name: 'Login',
      section: [
        {value: 'login0', view: 'Ascending'},
        {value: 'login1', view: 'Descending'}
      ]
    },
    {
      name: 'Account Status',
      section: [
        {value: 'active', view: 'Active'},
        {value: 'inactive', view: 'Inactive'}
      ]
    },
    {
      name: 'Exams Status',
      section: [
        {value: 'exam=0', view: 'Active'},
        {value: 'exam>0', view: 'Inactive'}
      ]
    },
    {
      name: 'Role',
      section: [
        {value: 'user', view: 'User'},
        {value: 'admin', view: 'Admin'}
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
