import { Component, OnInit, HostListener } from '@angular/core';
import { EpisodeService } from '../../core/services/episodes.service';
import { SearchService } from '../../core/services/search.service';
import { Episode } from '../../core/models/episode.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  searchTerm: string = '';
  isLastPage: boolean = false;
  pagesLoaded: number = 0; // Para controlar o número de páginas carregadas

  constructor(
    private episodeService: EpisodeService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Resetando estado ao realizar nova busca
    this.searchService.searchQuery$.subscribe(query => {
      this.searchTerm = query;
      this.currentPage = 1;
      this.episodes = [];
      this.isLastPage = false;
      this.pagesLoaded = 0;
      this.loadEpisodes();
    });

    this.loadEpisodes();
  }

  loadEpisodes(): void {
    if (this.loading || this.isLastPage) return;

    const pagesToLoad = 3;
    const promises = [];

    for (let i = 0; i < pagesToLoad; i++) {
      const pageToLoad = this.currentPage + i;
      promises.push(this.episodeService.getEpisodes(pageToLoad).toPromise());
    }

    Promise.all(promises)
      .then(responses => {
        responses.forEach((data) => {
          if (data && data.results) {
            let filteredEpisodes = data.results.filter((episode: Episode) =>
              episode.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );

            this.episodes = [...this.episodes, ...filteredEpisodes];
          }
        });

        this.loading = false;
        this.pagesLoaded += pagesToLoad;
        this.currentPage += pagesToLoad;

        if (this.pagesLoaded >= 3) {
          this.isLastPage = true;
        }
      })
      .catch(error => {
        console.error('Erro ao carregar episódios', error);
        this.loading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (this.loading || this.isLastPage) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 100;

    if (scrollPosition >= threshold) {
      this.loadEpisodes();
    }
  }

  onSearchTermChange(term: string): void {
    this.searchService.setSearchQuery(term);
  }
}
