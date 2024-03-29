import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Student } from 'src/app/models/student';
import { AnswerService } from 'src/app/services/answer.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { ReplyExamComponent } from './reply-exam.component';
import { ShowAnswersComponent } from './show-answers.component';


@Component({
  selector: 'app-reply-answer',
  templateUrl: './reply-answer.component.html',
  styleUrls: ['./reply-answer.component.css'],
})
export class ReplyAnswerComponent implements OnInit {
  student: Student;
  exams: Exam[] = [];
  course: Course;
  list = ['id', 'name', 'subject', 'questions', 'showExam', 'replyExam'];

  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id)
        this.studentService.find(id).subscribe((s) => {
          this.student = s;
          this.courseService.courseByStudent(s.id).subscribe((c) => {
            this.course = c;
            this.exams = c && c.exam ? c.exam : [];
            this.pageable();
          });
        });
    });
  }
  private pageable(): void {
    this.dataSource = new MatTableDataSource<Exam>(this.exams);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'record for page';
  }
  replyQuestions(exam: Exam): void {
    const modal = this.dialog.open(ReplyExamComponent, {
      width: '750px',
      data: { course: this.course, student: this.student, replyExam:exam },
    });
    modal.afterClosed().subscribe((answersMap:Map<number,Answer>)=> {
      if(answersMap){
        const answers: Answer[] = Array.from(answersMap.values());
        this.answerService.save(answers).subscribe(answerS => {
          exam.answered=true;
          Swal.fire('answers send', 'the answers of exam '+exam.name + 'were send', 'success');
        });
      }
    });
  }
  showAnswers(exam: Exam): void{
    const modal = this.dialog.open(ShowAnswersComponent, {
      width: '750px',
      data: { course: this.course, student: this.student, replyExam:exam },
    });
    modal.afterClosed().subscribe((answersMap:Map<number,Answer>)=> {
      if(answersMap){
        const answers: Answer[] = Array.from(answersMap.values());
        this.answerService.save(answers).subscribe(answerS => {
          exam.answered=true;
          Swal.fire('answers send', 'the answers of exam '+exam.name + 'were send', 'success');
          console.log(answerS);
        });
      }
    });
  }
}
