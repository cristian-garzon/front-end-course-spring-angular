import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { LayoutModule } from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';
import { StudentsFormComponent } from './components/students/students-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CourseFormComponent } from './components/courses/course-form.component';
import { ExamFormComponent } from './components/exams/exam-form.component'
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddStudentsComponent } from './components/courses/add-students.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AddExamsComponent } from './components/courses/add-exams.component';
import { ReplyAnswerComponent } from './components/students/reply-answer.component';
import { ReplyExamComponent } from './components/students/reply-exam.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    ExamsComponent,
    StudentsFormComponent,
    CourseFormComponent,
    ExamFormComponent,
    AddStudentsComponent,
    AddExamsComponent,
    ReplyAnswerComponent,
    ReplyExamComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    MatTabsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
