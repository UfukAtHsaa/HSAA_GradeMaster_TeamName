import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../lib/domain/student.interfaces';
import { StudentCoreService } from '../../../../lib/core-services/student-core.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {

  public student: Student |undefined;

  constructor(
    private route: ActivatedRoute, // Um Routing-Parameter auszulesen
    private coreService: StudentCoreService) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.coreService.getStudents().subscribe((students) => {
        this.student = students.find((student) => student.id === +id);
      });
    }
  }

}
