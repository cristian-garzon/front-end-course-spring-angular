export class Subject {
    id?: number;
    name?: string;
    father?: Subject;
    son?: Subject[] = [];
}
