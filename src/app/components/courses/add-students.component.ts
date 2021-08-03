import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],
})
export class AddStudentsComponent implements OnInit {
  course: Course;
  students: Student[];
  studentSelected: Student[] = [];
  index = 0;
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  column: String[] = ['name', 'surname', 'checkbox'];
  list: String[] = ['id', 'name', 'surname', 'email', 'delete'];
  selectStudents: SelectionModel<Student> = new SelectionModel<Student>(
    true,
    []
  );

  constructor(
    private serviceCourse: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceStudent: StudentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.serviceCourse.find(id).subscribe((c) => {
          this.course = c;
          this.students = this.course.student;
          this.pageable();
        });
      }
    });
  }
  pageable(): void {
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'record for page';
  }
  filter(event: any): void {
    const name = event.target.value;
    name !== undefined ? name.trim() : '';
    if (name !== '')
      this.serviceStudent.filter(name).subscribe(
        (students) =>
          (this.studentSelected = students.filter((student) => {
            let filter = true;
            this.course.student.forEach((studentCourse) => {
              studentCourse.id === student.id ? (filter = false) : null;
            });
            return filter;
          }))
      );
  }

  selectAll(): void {
    this.allSelect()
      ? this.selectStudents.clear()
      : this.studentSelected.forEach((student) =>
          this.selectStudents.select(student)
        );
  }
  allSelect(): boolean {
    return this.studentSelected.length == this.selectStudents.selected.length;
  }
  addStudents(): void {
    this.serviceCourse
      .addStudent(this.selectStudents.selected, this.course)
      .subscribe(
        (c) => {
          Swal.fire('students add:', 'estudents add successfully', 'success');
          this.students = this.students.concat(this.selectStudents.selected);
          this.pageable();
          this.studentSelected = [];
          this.selectStudents.clear();
          this.index = 1;
        },
        (err) => {
          if (err.status === 500) {
            Swal.fire('error:', 'student in other course', 'error');
          }
        }
      );
  }
  deleteStudent(student: Student): void {
    Swal.fire({
      title: 'Are you sure?',
      text:
        'you want delete to ' + student.name + ' of ' + this.course.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceCourse
          .deleteStudent(student, this.course)
          .subscribe((c) => {
            Swal.fire(
              'Deleted!',
              student.name +
                'was deleted succesfully of course' +
                this.course.name,
              'success'
            );
            this.students = this.students.filter((s) => s.id !== student.id);
            this.pageable();
          });
      }
    });
  }
}
