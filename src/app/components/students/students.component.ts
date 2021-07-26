import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  tittle = 'Student List';
  students?: Student[];
  constructor(private studentSservice: StudentService,
              private router: Router) { }

  ngOnInit(): void {
    this.studentSservice.list().subscribe(students => this.students = students);
  }

  public delete(student : Student): void{
        Swal.fire({
          title: 'Are you sure?',
          text: "you want delete to " + student.name + "?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'delete'
        }).then((result) => {
          if (result.isConfirmed) {
            this.studentSservice.delete(student.id).subscribe(() =>{
            this.students = this.students?.filter(s => s !== student);
            Swal.fire(
              'Deleted!',
              student.name + 'was deleted succesfully',
              'success'
            );
           });
          }
        }); 
  }
}
