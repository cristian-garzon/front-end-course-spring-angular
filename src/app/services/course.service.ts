import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from '../config/app';
import { Course } from '../models/course';
import { Student } from '../models/student';
import { CammonService } from './cammon.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CammonService<Course> {
  protected endPoint = endPoint+'/Courses';
  constructor(http: HttpClient){
    super(http);
  }
  addStudent(student:Student[], course: Course ) : Observable<Course>{
    return this.http.put<Course>(this.endPoint+"/add_student/"+course.id,student, {headers: this.header});
  }
}
