import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../domain/student.interfaces';
import { StudentProviderService } from '../provider-services/student-provider.service';

@Injectable({
  providedIn: 'root'
})
export class StudentCoreService {

  // Internes BehaviorSubject zum Verwalten der Student-Liste
  private studentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  
  // Observable, das abonniert werden kann, um die aktuelle Student-Liste zu erhalten
  // Subjects sollten nie driekt rausgegeben werden -> Manipulationsgefahr 
  public students$: Observable<Student[]> = this.studentsSubject.asObservable();
  
  constructor(private providerService: StudentProviderService) { 
    
    const students$ = this.providerService.getStudents()
    
    students$.subscribe(students => {
      this.studentsSubject.next(students);
    });
    
  }

  /**
   * @deprecated
   * @returns Student[]
   */
  // (3) nur für HACK
  // public getStudents(): Observable<Student[]> { // Wird nicht mehr benötigt
  //   return this.providerService.getStudents()
  // }


  public createStudent(newStudent: Student) {
    
    this.providerService.createStudent(newStudent).subscribe( // HTTP Aufruf triggern
      newStudent => { 
        // Subject der bisherigen Studentenliste laden um es zu aktualisieren
        const currentStudents = this.studentsSubject.value;
        // API response object (Student) hinzufügen mittels Spread-Operator
        // "newStudent" wäre auch möglich, aber ID wäre dann noch nicht generiert.
        const updatedStudents = [...currentStudents, newStudent]; 
        this.studentsSubject.next(updatedStudents);
      }
    );
  }

}

