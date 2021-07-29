import { Cammon } from "./cammon";
import { Exam } from "./exam";
import { Student } from "./student";

export class Course implements Cammon{
    id: number = 0;
    name : string = '';
    createAt : string = '';
    student: Student[] = [];
    exams:Exam[] = [];
}
