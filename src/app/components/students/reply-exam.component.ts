import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answer } from 'src/app/models/answer';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
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
  answers = new Map<number, Answer>()
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
  reply(question: Question, event: any): void{
    const text = event.target.value as string;
    const answer = new Answer();
    answer.student = this.student;
    answer.question = question;
    answer.answer = text;
    const exams = new Exam();
    exams.id = this.replyExam.id;
    answer.question.exam = exams;
    this.answers.set(question.id, answer);
  }
}
