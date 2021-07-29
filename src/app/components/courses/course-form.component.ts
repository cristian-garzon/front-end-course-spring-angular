import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { CammonFormComponent } from '../Cammon-form.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent extends CammonFormComponent<Course, CourseService> implements OnInit {

  constructor(service:CourseService,
              router: Router,
              route: ActivatedRoute) {
    super(service,router,route);               
    this.entity = new Course();
    this.navegation = "/courses";
  }

}
