import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentCoreService } from '../../../../lib/core-services/student-core.service';
import { Student } from '../../../../lib/domain/student.interfaces';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent { // implements OnInit {

  // "$" als inoffizielle Coding-Konvention um Observables zu markieren
  public dataSource$!: Observable<Student[]>; // "!" oder "... | undefined"  
  public displayedColumns: string[] = ['id', 'name', 'email', 'matrikelnummer'];
  
  constructor( 
    private dialog: MatDialog, 
    private studentCoreService: StudentCoreService,
    private router: Router
  ) { 

    // ----> Aktuell: (1) Kein Reload!
    // this.dataSource$ = this.studentCoreService.getStudents(); 
    
    /////////////////////////////////////////////////////////////////////////////////
    
    // ----> Wunderschön ^^ (4)
    //       Services sind in Layer (Core / Provider) getrennt, ein Objekt verwaltet die Daten welche
    //       nur über gewisse Regeln verändert werden kann.
    //       Das Objekt kann auch in anderen Komponenten wiederverwendet werden.
    this.dataSource$ = this.studentCoreService.students$; 
    
  }
  
  // ----> HACK: (3) Wie es aktuell ist nur über init gelöst, 
  //       wird im Zusammenhang mit dem Reload benötigt, 
  //       Code Verdopplungen nötig, da initiales Laden dennoch benötigt wird.
  //       Außerdem: Unnötige HTTP-Calls !!!
  //       Aber immerhin Fehler-Feedback 
  // ngOnInit() { 
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.dataSource$ = this.studentCoreService.getStudents(); 
  //     }
  //   });
  // }
  
  public addStudent(): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulardaten:', result);
        // ----> UGLY: (2) Reload mit erwingen über "window" Objekt
        //       - "flackern" das Browserverhalten manipuliert wird
        //       - außerhalb des Frameworks, daher bspw.
        //          - unvorhersehbaren side-effects wie verschwinden von Fehlern
        //          - debuggen nicht mehr möglich 
        // window.location.reload()
        
        /////////////////////////////////////////////////////////////////////////////////
        
        // this.router.navigate(['/students', 'list']); // ----> HACK: (3) zusammen mit der ngOnInit Methode
      } else {
        console.log('Dialog abgebrochen');
      }
    });
  }

  public onSelectStudent(student: Student): void {
    this.router.navigate(['/students', student.id, 'details']); // Navigiere zur Detailseite
  }

}