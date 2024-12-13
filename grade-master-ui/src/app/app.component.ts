import { LayoutModule } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../lib/components/menu-bar/menu-bar.component';
import { AppMenubarViewStateService } from './services/app-menubar-view-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MenuBarComponent,    
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GRADE MASTER';

  public constructor(public menuBarViewState: AppMenubarViewStateService) {}

}
