import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../lib/auth/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.logout();
  }
}
