import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  student: Student = new Student();
  error: any;

  constructor(private studentService:StudentService,
              private router:Router,
              private route:ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      if(id){
        this.studentService.find(id).subscribe(student => this.student = student)
      }
    })
  }
  public save(): void{
    this.studentService.save(this.student).subscribe(student => {
      Swal.fire({
        icon: 'success',
        title: "student " + student.name + " was created",
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(["/students"]);
    }, err  => {
      if(err.status === 400){
        this.error = err.error;
      } 
    });
  }
  public edit(): void{
    this.studentService.update(this.student).subscribe(student => {
      console.log(student);
      Swal.fire({
        icon: 'success',
        title: "student " + student.name + " was updated",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/students"]);
    }, err  => {
      if(err.status === 400){
        this.error = err.error;
      } 
    });
  }
}
