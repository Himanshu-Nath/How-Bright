import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
}