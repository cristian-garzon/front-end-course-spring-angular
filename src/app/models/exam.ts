import { Cammon } from "./cammon";
import { Question } from "./question";
import { Subject } from "./subject";

export class Exam implements Cammon{
    id?: number;
    name?: string;
    createAt?: string; 
    questions?: Question[]=[];
    subjectFather?: Subject;
    subjectson?: Subject;
    answered?: boolean;
}
