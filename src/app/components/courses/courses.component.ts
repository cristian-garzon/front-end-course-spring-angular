import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { cammonListComponent } from '../cammon-list.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent extends cammonListComponent<Course, CourseService> implements OnInit {


  constructor(service: CourseService) {
    super(service);
    this.tittle='list courses';
   }
}
