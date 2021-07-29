import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';
import { cammonListComponent } from '../cammon-list.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent extends cammonListComponent<Exam, ExamService> implements OnInit {

;
  constructor(service: ExamService) {
    super(service);
    this.tittle = 'exams list'
   }

}
