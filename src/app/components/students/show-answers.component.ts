import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Answer } from 'src/app/models/answer';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Student } from 'src/app/models/student';
import { AnswerService } from 'src/app/services/answer.service';
@Component({
  selector: 'app-show-answers',
  templateUrl: './show-answers.component.html',
  styleUrls: ['./show-answers.component.css'],
})
export class ShowAnswersComponent implements OnInit {
  course: Course;
  student: Student;
  replyExam: Exam;
  answers: Answer[] = [];
  list = ['id question', 'question', 'answer', 'exam'];
  dataSource: MatTableDataSource<Answer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<ShowAnswersComponent>,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.replyExam = this.data.replyExam as Exam;
    this.answerService
      .list(this.replyExam, this.student)
      .subscribe((answer) => {
        this.answers = answer;
        this.answers.forEach(a => {
          console.log(a.question.id)
        })
        this.pageable();
      });
  }
  close(): void {
    this.modalRef.close();
  }
  private pageable(): void {
    this.dataSource = new MatTableDataSource<Answer>(this.answers);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'record for page';
  }
}
