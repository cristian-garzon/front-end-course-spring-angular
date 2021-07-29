import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { CammonFormComponent } from '../Cammon-form.component';


@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent extends CammonFormComponent<Student, StudentService> implements OnInit {

  private photoSelected?: File;

  constructor(studentService:StudentService,
              router:Router,
              route:ActivatedRoute) {
              super(studentService,router,route)
              this.entity=new Student();
              this.navegation = "/students";
  }

  public upload(event): void{
    this.photoSelected=event.target.files[0];
    if(this.photoSelected.type.indexOf('image') < 0){
      this.photoSelected = null;
      Swal.fire('error',"file don´t acepted",'error');
    } 
  } 

  public save(): void{
    if(!this.photoSelected){
      super.save();
    } else {
      this.service.savePhoto(this.entity, this.photoSelected).subscribe(e => {
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
    
  }
  public edit(): void{
    if(!this.photoSelected){
      super.edit();
    } else {
      this.service.updatePhoto(this.entity, this.photoSelected).subscribe(e => {
        Swal.fire({
          icon: 'success',
          title: "student " + e.name + " was modificated",
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
  }
}
