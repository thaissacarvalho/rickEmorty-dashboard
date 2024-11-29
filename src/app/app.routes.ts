import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { CharacterDetailsComponent } from './features/characters/character-details/character-details.component';
import { EpisodeDetailsComponent } from './features/episodes/episodes-details/episode-details.component';
import { CharactersComponent } from './features/characters/characters.component';
import { EpisodesComponent } from './features/episodes/episodes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'characters/:id', component: CharacterDetailsComponent, canActivate: [AuthGuard] },
  { path: 'episodes', component: EpisodesComponent, canActivate: [AuthGuard] },
  { path: 'episodes/:id', component: EpisodeDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
