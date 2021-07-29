import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';
import { CammonFormComponent } from '../Cammon-form.component';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent extends CammonFormComponent<Exam, ExamService> implements OnInit {

  subjectFather : Subject[]=[];  
  subjectson: Subject[]=[];

  constructor(service: ExamService,
    router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
      this.entity = new Exam();
      this.navegation = "/exams";
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      if(id){
        this.service.find(id).subscribe(e => this.entity = e);
        this.service.listSubject().subscribe(subjects => this.subjectson = subjects
          .filter(subject => subject.father && subject.father.id === this.entity.subjectFather.id));
      }
    });
    this.service.listSubject()
    .subscribe(subjects => this.subjectFather = subjects.filter(subject => !subject.father));
  }
  public showSubjectSon(): void{
    this.subjectson = this.entity.subjectFather? this.entity.subjectFather.son : [];
  }
  public camareSubject(s1:Subject, s2:Subject): boolean{
    if(s1 === undefined && s2 === undefined) return true
    return s1 === undefined || s2 === undefined || s1 === null || s2 === null? false : s1.id === s2.id; 
  }
  public addQuestion(): void{
    this.entity.questions.push(new Question());
  }
  setQuestionText(question: Question, event:any): void{
    question.text = event.target.value as string;
  }
  deleteQuestion(question: Question): void{
    this.entity.questions = this.entity.questions.filter(q => q.text!==question.text)
  }
  questionEmpty(): void{
    this.entity.questions = this.entity.questions.filter(q => q.text!=null && q.text.trim()!="");
  }
  public save(): void{
    this.questionEmpty();
    if(this.entity.questions.length===0){
      Swal.fire('empty questions', 'the exam must have a least one question', 'error');
      return;
    }
    super.save();
  }
  public edit(): void{
    this.questionEmpty();
    if(this.entity.questions.length===0){
      Swal.fire('empty questions', 'the exam must have a least one question', 'error');
      return;
    }
    super.edit(); 
  }
}
