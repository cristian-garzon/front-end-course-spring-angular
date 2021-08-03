import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { endPoint } from '../config/app';
import { Exam } from '../models/exam';
import { Subject } from '../models/subject';
import { CammonService } from './cammon.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CammonService<Exam> {
	protected endPoint = endPoint + '/Exams';
	constructor(http:HttpClient){
		super(http);
	}
	public listSubject(): Observable<Subject[]>{
		return this.http.get<Subject[]>(this.endPoint+'/subject/list')
	}
	public filter(name: string): Observable<Exam[]>{
		return this.http.get<Exam[]>(this.endPoint+'/search/'+name)
	}
}
