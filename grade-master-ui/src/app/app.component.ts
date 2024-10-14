import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Test {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'grade-master-ui';
  todo = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Test>('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data: Test) => {
        console.log(data.title);
        this.title = data.title;
      });
  }
}
