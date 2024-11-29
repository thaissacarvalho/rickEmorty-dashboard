import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character.model';
import { CharacterResponse } from '../models/character.model'; // Importe o tipo CharacterResponse

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = `${environment.apiUrl}/character`;

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  getCharactersByIds(ids: number[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}/${ids.join(',')}`);
  }
}
