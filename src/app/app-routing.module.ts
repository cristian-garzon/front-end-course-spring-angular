import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './components/courses/add-students.component';
import { CourseFormComponent } from './components/courses/course-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamFormComponent } from './components/exams/exam-form.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsFormComponent } from './components/students/students-form.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {path:' ', pathMatch:'full', redirectTo:'courses'},
  {path:'students', component:StudentsComponent},
  {path:'students/form/:id', component:StudentsFormComponent},
  {path:'students/form', component:StudentsFormComponent},
  {path:'courses', component:CoursesComponent},
  {path:'courses/add-student/:id', component:AddStudentsComponent},
  {path:'exams', component:ExamsComponent},
  {path:'exams/form', component:ExamFormComponent},
  {path:'exams/form/:id', component:ExamFormComponent},
  {path:'courses/form/:id', component:CourseFormComponent},
  {path:'courses/form', component:CourseFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
