import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  course: Course;
  studentSelected:Student[] = [];
  column: String[] = ['name', 'surname',"checkbox"]
  selectStudents: SelectionModel<Student> = new SelectionModel<Student>(true, []);

  constructor(private serviceCourse: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceStudent: StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = Number(params.get('id'));
      if(id) this.serviceCourse.find(id).subscribe(c => this.course = c)
    });
  }
  filter(event:any):void{
    const name = event.target.value;
    name !== undefined ? name.trim() : '';
    if(name !== '') this.serviceStudent.filter(name).
    subscribe(students => this.studentSelected = students.filter(student => {
      let filter = true;
      this.course.student.forEach(studentCourse => {
        studentCourse.id === student.id ? filter = false : null ;
      });
      return filter;
    }));
  }

  selectAll():void {
    this.allSelect() ? this.selectStudents.clear() :
    this.studentSelected.forEach(student => this.selectStudents.select(student));
  }
  allSelect(): boolean {
    return this.studentSelected.length == this.selectStudents.selected.length;
  }
  addStudents():void {
    this.serviceCourse.addStudent(this.selectStudents.selected,this.course)
    .subscribe(c =>{
      Swal.fire('students add:', 'estudents add successfully','success');
    },err => {
      if(err.status === 500){
        Swal.fire('error:', 'student in other course','error');
      }
    });
    this.studentSelected = [];
    this.selectStudents.clear();
  }
}
