import { Routes } from '@angular/router';
import { authGuard } from '../lib/auth/auth.guard';
import { CourseDialogHandlerComponent } from './views/course/course-dialog/course-dialog-handler/course-dialog-handler.component';


export const routes: Routes = [
    // Dialog Outlet
    {
        path: 'dialog',
        component: CourseDialogHandlerComponent,
        outlet: 'dialog',
    },

    //////////////////////////////////////////////////////////////////////

    // Redirect root to login
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },

    // Login und Logout
    {
        path: 'login',
        loadComponent: () =>
            import('./views/login/login.component').then((mod) => mod.LoginComponent),
    },
    {
        path: 'logout',
        loadComponent: () =>
            import('./views/logout/logout.component').then((mod) => mod.LogoutComponent),
    },

    // Home mit Auth-Guard
    {
        path: 'home',
        loadComponent: () =>
            import('./views/home/home.component').then((mod) => mod.HomeComponent),
        canActivate: [authGuard],
    },

    // Courses
    {
        path: 'courses',
        loadComponent: () =>
            import('./views/course/course.component').then((mod) => mod.CourseComponent),
        canActivateChild: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'overview' },
            {
                path: 'overview',
                loadComponent: () =>
                    import('./views/course/course-overview/course-overview.component')
                        .then((mod) => mod.CourseOverviewComponent),
            },
            {
                path: ':id/details',
                loadComponent: () =>
                    import('./views/course/course-detail/course-detail.component')
                        .then((mod) => mod.CourseDetailComponent),
            },
        ],
    },

    // Students
    {
        path: 'students',
        loadComponent: () =>
            import('./views/student/student.component').then((mod) => mod.StudentComponent),
        canActivateChild: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'list' },
            {
                path: 'list',
                loadComponent: () =>
                    import('./views/student/student-list/student-list.component')
                        .then((mod) => mod.StudentListComponent),
            },
            {
                path: ':id/details',
                loadComponent: () =>
                    import('./views/student/student-detail/student-detail.component')
                        .then((mod) => mod.StudentDetailComponent),
            },
        ],
    },

    // Impressum
    {
        path: 'impressum',
        loadComponent: () =>
            import('./views/impressum/impressum.component').then((mod) => mod.ImpressumComponent),
        children: [
            {
                path: 'error',
                loadComponent: () =>
                    import('../lib/components/four-zero-four/four-zero-four.component')
                        .then((mod) => mod.FourZeroFourComponent),
            },
        ],
    },

    // Fallback Route
    {
        path: '**',
        loadComponent: () =>
            import('../lib/components/four-zero-four/four-zero-four.component')
                .then((mod) => mod.FourZeroFourComponent),
    },
];
