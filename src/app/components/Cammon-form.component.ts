import {Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cammon } from '../models/cammon';
import { CammonService } from '../services/cammon.service';

@Injectable()
export  abstract class CammonFormComponent<E extends Cammon, S extends CammonService<E>> implements OnInit {

  entity?: E;
  error: any;
  protected navegation: string; 


  constructor(protected service: S,
              protected router:Router,
              protected route:ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      if(id) this.service.find(id).subscribe(e => this.entity = e); 
    });
  }
  public save(): void{
    this.service.save(this.entity).subscribe(e => {
      Swal.fire({
        icon: 'success',
        title: "student " + e.name + " was created",
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate([this.navegation]);
    }, err  => {
      if(err.status === 400){
        this.error = err.error;
      } 
    });
  }
  public edit(): void{
    this.service.update(this.entity).subscribe(e => {
      Swal.fire({
        icon: 'success',
        title: "student " + e.name + " was updated",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate([this.navegation]);
    }, err  => {
      if(err.status === 400){
        this.error = err.error;
      } 
    });
  }
}
