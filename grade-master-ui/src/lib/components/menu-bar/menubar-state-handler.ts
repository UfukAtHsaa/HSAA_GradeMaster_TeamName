import { BehaviorSubject } from "rxjs";
import { MenuBarItem } from "./menu-bar.interfaces";

export interface MenubarStateHandler {

    menuItemsSubject: BehaviorSubject<MenuBarItem[]>;

}