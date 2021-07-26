import { Exam } from "./exam";
import { Student } from "./student";

export class Course {
    id: number = 0;
    name : string = '';
    createAt : string = '';
    students: Student[] = [];
    exams:Exam[] = [];
}
