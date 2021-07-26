import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private endPoint='http://localhost:8090/api/Students';
  private header:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }
  
  public list(): Observable<Student[]>{
    return this.http.get<Student[]>(this.endPoint+'/list');
  }
  
  public find(id: number): Observable<Student>{
    return this.http.get<Student>(this.endPoint+'/find/'+id);
  }

  public save(student:Student): Observable<Student>{
    return this.http.post<Student>(this.endPoint+'/save',student, {headers: this.header})
  }
  public update(student:Student): Observable<Student>{
    return this.http.put<Student>(this.endPoint+'/edit/'+student.id,student, {headers: this.header})
  }
  public delete(id:number): Observable<void>{
    return this.http.delete<void>(this.endPoint+'/delete/'+id)
  }
  public listP(page: string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size',size);
    return this.http.get<any>(this.endPoint+'/listP', {params: params});
  }
}

