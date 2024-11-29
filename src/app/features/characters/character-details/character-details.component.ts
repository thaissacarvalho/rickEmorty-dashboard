import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../../core/services/characters.service';
import { Character } from '../../../core/models/character.model';

@Component({
  imports: [CommonModule],
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(+id).subscribe((data) => {
        this.character = data;
        this.loading = false;
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'dead':
        return 'died';
      case 'alive':
        return 'alive';
      case 'unknown':
        return 'unknown';
      default:
        return '';
    }
  }
}
