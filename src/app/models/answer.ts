import { Question } from "./question";
import { Student } from "./student";

export class Answer {
    id?: string;
    answer?: string;
    student?: Student;
    question?: Question;

}
