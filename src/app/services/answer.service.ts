import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from '../config/app';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  endPint = endPoint + '/Answers';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}
  save(answer: Answer[]): Observable<Answer[]> {
    return this.http.post<Answer[]>(this.endPint + '/save_all', answer, {
      headers: this.headers,
    });
  }
  list(exam: Exam, student: Student): Observable<Answer[]> {
    return this.http.get<Answer[]>(
      this.endPint + '/list_answer/' + student.id + '/' + exam.id
    );
  }
}
