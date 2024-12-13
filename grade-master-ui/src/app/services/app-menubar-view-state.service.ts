import { Injectable } from "@angular/core";
import { MenubarStateHandler } from "../../lib/components/menu-bar/menubar-state-handler";
import { MenuBarItem } from "../../lib/components/menu-bar/menu-bar.interfaces";
import { AuthService } from "../../lib/auth/auth.service";
import { BehaviorSubject, map, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppMenubarViewStateService implements MenubarStateHandler {

    private menuItems: MenuBarItem[] = [
        {
            name: 'Kurse',
            routePath: 'courses',
            visible$: this.authService.isAuthenticated$(),
        },    
        {
            name: 'Studenten',
            routePath: 'students',
            visible$: this.authService.isAuthenticated$(),
        },
        {
            name: 'Impressum',
            routePath: 'impressum',
            visible$: of(true),
        },
        {
            name: 'Login',
            routePath: 'login',
            visible$: this.authService
                .isAuthenticated$()
                .pipe(map((isAuthenticated: boolean) => !isAuthenticated)),
            highlighted: true,
            icon: 'login',
        }, 
        {
            name: 'Logout',
            routePath: 'logout',
            visible$: this.authService.isAuthenticated$(),
            highlighted: true,
            icon: 'logout',
        },
    ];

    constructor(private authService: AuthService) {}

    public menuItemsSubject: BehaviorSubject<MenuBarItem[]> =
        new BehaviorSubject<MenuBarItem[]>(this.menuItems);


}