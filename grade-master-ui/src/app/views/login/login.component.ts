import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from '../../../lib/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public durationInSeconds = 3;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

onSubmit() {
  if (this.loginForm.valid) {
    this.openSnackBar('Try to login ...');
    const { username, password } = this.loginForm.value;

    // Erstelle ein Observable für den Login-Vorgang
    const login$ = this.authService.login(username, password).pipe(
      tap(response => {
        this.openSnackBar('You are logged in ...');
        console.log('Login successful', response);
        this.router.navigate(['home']);
      }),
      catchError(error => {
        console.error('Login error', error);
        this.openSnackBar('Login error ...', 'Close');
        this.router.navigate(['home']);
        return EMPTY; // Verhindert weiteren Verarbeitungsschritt
      })
    );

    // Trigger das Observable
    login$.subscribe();
  }
}

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
