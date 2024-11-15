import { Student } from "../components/domain/student.interfaces";

export interface Course {
    id: number;
    name: string;
    description: string;
    students: Student[];
}