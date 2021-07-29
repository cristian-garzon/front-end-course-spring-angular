import {Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Cammon } from '../models/cammon';
import { CammonService } from '../services/cammon.service';

@Injectable()
export abstract class cammonListComponent<E extends Cammon, S extends CammonService<E>> implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  tittle ?: string;
  list?: E[];
  size=4;
  lenght = 0;
  index = 0;
  constructor(protected service: S) { }

  ngOnInit(): void {
    this.pageable();
  }
  public pageable(){
    this.service.listP(this.index + "", this.size + "").subscribe(page => {
      this.list = page.content as E[];
      this.lenght = page.totalElements as number;
    });

  }
  public page(event:PageEvent): void{
    this.index = event.pageIndex;
    this.size = event.pageSize;
    this.pageable();
  }

  public delete(e : E): void{
        Swal.fire({
          title: 'Are you sure?',
          text: "you want delete to " + e.name + "?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'delete'
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.delete(e.id).subscribe(() =>{
            this.pageable();
            Swal.fire(
              'Deleted!',
              e.name + 'was deleted succesfully',
              'success'
            );
           });
          }
        }); 
  }
}
