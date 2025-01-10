import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Student } from '../domain/student.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentProviderService {

  private baseUrl = 'http://localhost:8080' // url ist der Enpunkt der API

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }
  
  /**
   * Returns all students via REST interface.
   * HTTP GET  
   **/
  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/public/api/students`);
  }

  /**
   * Creates a new student via REST interface.
   * HTTP POST
   * @param student, object which will be created 
   */
  public createStudent(student: Student): Observable<Student> {

    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.authService.getToken()}`, // Basic Auth Header
      'Content-Type': 'application/json' // Optional, wenn Sie JSON senden
    });

    return this.http.post<Student>(`${this.baseUrl}/private/api/students`, student, { headers })
  }

}
