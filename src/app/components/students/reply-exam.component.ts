import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-reply-exam',
  templateUrl: './reply-exam.component.html',
  styleUrls: ['./reply-exam.component.css'],
})
export class ReplyExamComponent implements OnInit {
  course: Course;
  student: Student;
  replyExam: Exam;
  answers = 'debug pro';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<ReplyExamComponent>
  ) {}

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.replyExam = this.data.replyExam as Exam;
  }
  cancel(): void {
    this.modalRef.close();
  }
}
