import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { CammonService } from './cammon.service';
import { endPoint } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CammonService<Student>{
  protected endPoint = endPoint+'/Students';
  constructor(http: HttpClient){
    super(http);
  }

  public savePhoto(student:Student, file: File) : Observable<Student> {
    const data = new FormData();
    data.append('file',file);
    data.append('name',student.name);
    data.append('surname',student.surname);
    data.append('email',student.email);
    return this.http.post<Student>(this.endPoint+'/save_photo',data);
  }
  public updatePhoto(student:Student, file: File) : Observable<Student> {
    const data = new FormData();
    data.append('file',file);
    data.append('name',student.name);
    data.append('surname',student.surname);
    data.append('email',student.email);
    return this.http.put<Student>(this.endPoint+'/update_photo/'+student.id,data);
  }
  public filter(name:string) : Observable<Student[]>{
    return this.http.get<Student[]>(this.endPoint+'/search/'+name);
  }
}

