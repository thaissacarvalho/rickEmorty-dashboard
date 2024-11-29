import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../../core/services/episodes.service';
import { CharacterService } from '../../core/services/characters.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Character, CharacterResponse } from '../../core/models/character.model';
import { Episode } from '../../core/models/episode.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true
})
export class DashboardComponent implements OnInit {
  characters: Character[] = [];
  episodes: Episode[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
    this.loadEpisodes();
  }

  loadCharacters(): void {
    this.characterService.getCharacters(this.currentPage).subscribe((data: CharacterResponse) => {
      this.characters = data.results.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.loading = false;
    });
  }

  loadEpisodes(): void {
    this.episodeService.getEpisodes().subscribe((data) => {
      this.episodes = data.results;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCharacters();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
    this.loadCharacters();
  }
}
