import { Component, OnInit} from '@angular/core';
import { endPoint } from 'src/app/config/app';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { cammonListComponent } from '../cammon-list.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})


export class StudentsComponent extends cammonListComponent<Student, StudentService> implements OnInit {

  url = endPoint+'/Students';
  constructor(service: StudentService){
    super(service);
    this.tittle= 'Student List';
  }
}
