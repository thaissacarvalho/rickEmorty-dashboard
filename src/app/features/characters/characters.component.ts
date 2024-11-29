import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from '../../core/services/characters.service';
import { SearchService } from '../../core/services/search.service';
import { Character, CharacterResponse } from '../../core/models/character.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  searchTerm: string = '';
  hasMore: boolean = true;
  pagesLoaded: number = 0;
  searchSubscription!: Subscription;

  constructor(
    private characterService: CharacterService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    const storedState = localStorage.getItem('characterState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.characters = parsedState.characters;
      this.currentPage = parsedState.currentPage;
      this.searchTerm = parsedState.searchTerm;
      this.hasMore = parsedState.hasMore;
    }

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchTerm = query;
      this.currentPage = 1;
      this.pagesLoaded = 0;
      this.characters = [];
      this.loadCharacters();
    });

    this.loadCharacters();
  }

  ngOnDestroy(): void {
    const state = {
      characters: this.characters,
      currentPage: this.currentPage,
      searchTerm: this.searchTerm,
      hasMore: this.hasMore,
      pagesLoaded: this.pagesLoaded
    };
    localStorage.setItem('characterState', JSON.stringify(state));

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadCharacters(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;

    const pagesToLoad = 14; 
    const startPage = this.currentPage;
    const endPage = Math.min(startPage + pagesToLoad - 1, 42);

    const promises = [];
    for (let i = startPage; i <= endPage; i++) {
      promises.push(this.characterService.getCharacters(i).toPromise());
    }

    Promise.all(promises)
      .then(responses => {
        responses.forEach((data: CharacterResponse | undefined) => {
          if (data) {
            let filteredCharacters = data.results;

            if (this.searchTerm) {
              filteredCharacters = filteredCharacters.filter(character =>
                character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
              );
            }

            this.characters = [...this.characters, ...filteredCharacters];
          }
        });

        this.currentPage = endPage + 1;
        this.hasMore = this.currentPage <= 42;
        this.loading = false;
      })
      .catch(error => {
        console.error('Erro ao carregar personagens', error);
        this.loading = false;
      });
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
    this.characters = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.loadCharacters();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight - 100 && !this.loading && this.hasMore) {
      this.loadCharacters();
    }
  }
}
