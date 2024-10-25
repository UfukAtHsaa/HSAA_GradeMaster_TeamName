import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './views/users/users.component';


export const routes: Routes = [
    { path: '', component: AppComponent },      
    { path: 'home', component: UsersComponent } 
];
