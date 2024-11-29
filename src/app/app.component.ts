import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { CharacterService } from './core/services/characters.service';
import { EpisodeService } from './core/services/episodes.service';
import { ApiService } from './core/services/api.service';

@Component({
  imports: [FormsModule, CommonModule, HeaderComponent, RouterOutlet, SidebarComponent, HttpClientModule ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  providers: [ AuthService, CharacterService, EpisodeService, ApiService ]
})
export class AppComponent {
  title = 'rick-morty-dashboard';

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
