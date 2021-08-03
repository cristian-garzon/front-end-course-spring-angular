import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { CourseService } from 'src/app/services/course.service';
import { ExamService } from 'src/app/services/exam.service';
import { map, mergeMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css'],
})
export class AddExamsComponent implements OnInit {
  course: Course;
  exams: Exam[] = [];
  filterExams: Exam[] = [];
  formControl: FormControl = new FormControl();
  examSelected: Exam[] = [];
  index = 0;
  dataSource: MatTableDataSource<Exam>;
  list: String[] = ['id', 'name', 'subject', 'delete'];
  column: String[] = ['name', 'subject', 'delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private serviceExam: ExamService,
    private serviceCourse: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.serviceCourse.find(id).subscribe((c) => {
          this.course = c;
          this.exams = this.course.exam;
          this.pageable();
        });
        this.formControl.valueChanges
          .pipe(
            map((value) => (typeof value === 'string' ? value : value.name)),
            mergeMap((name) => (name ? this.serviceExam.filter(name) : []))
          )
          .subscribe((exam) => (this.filterExams = exam));
      }
    });
  }
  private pageable(): void {
    this.dataSource = new MatTableDataSource<Exam>(this.exams);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'record for page';
  }
  nameExam(exam?: Exam): string {
    return exam ? exam.name : '';
  }
  selectOption(event: MatAutocompleteSelectedEvent): void {
    const exam = event.option.value as Exam;
    if (!this.filter(exam.id)) {
      this.examSelected = this.examSelected.concat(exam);
      this.formControl.setValue('');
      event.option.deselect();
      event.option.focus();
    } else {
      Swal.fire('exam exist', 'the exams exist in the course', 'error');
      this.formControl.setValue('');
    }
  }
  filter(id: number): boolean {
    let exist = false;
    this.examSelected.concat(this.exams).forEach((e) => {
      if (id === e.id) {
        exist = true;
      }
    });
    return exist;
  }
  remove(exam: Exam): void {
    this.examSelected = this.examSelected.filter((e) => e.id !== exam.id);
  }
  addExams(): void {
    this.serviceCourse
      .addExam(this.examSelected, this.course)
      .subscribe((c) => {
        Swal.fire('exams add:', 'exams add successfully', 'success');
        this.exams = this.exams.concat(this.examSelected);
        this.pageable();
        this.examSelected = [];
        this.index = 1;
      });
  }
  deleteExam(exam: Exam): void {
    Swal.fire({
      title: 'Are you sure?',
      text:
        'you want delete the exam ' + exam.name + ' of ' + this.course.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceCourse
          .deleteExam(exam, this.course)
          .subscribe((c) => {
            this.exams = this.exams.filter((e) => e.id !== exam.id);
            Swal.fire(
              'Deleted!',
              exam.name +
                'was deleted succesfully of course' +
                this.course.name,
              'success'
            );
            this.pageable();
          });
      }
    });
  }
}
