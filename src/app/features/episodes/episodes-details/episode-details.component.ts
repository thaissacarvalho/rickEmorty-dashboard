import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EpisodeService } from '../../../core/services/episodes.service';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../core/models/episode.model';
import { Character } from '../../../core/models/character.model';
import { CharacterService } from '../../../core/services/characters.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit {
  episode: Episode | null = null;
  characters: Character[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.episodeService.getEpisodeById(+id).subscribe((data: Episode) => {
        this.episode = data;
        this.loading = false;

        if (data.characters && data.characters.length > 0) {
          const characterIds = data.characters.map((url: string) => {
            const match = url.match(/\/character\/(\d+)/);
            return match ? +match[1] : null;
          }).filter((id: number | null) => id !== null);

          if (characterIds.length > 0) {
            this.characterService.getCharactersByIds(characterIds).subscribe((characters: Character[]) => {
              console.log('Fetched characters:', characters);
              this.characters = characters;
            });
          }
        }
      });
    }
  }
}
