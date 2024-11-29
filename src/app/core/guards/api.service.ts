import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?page=${page}`);
  }

  getEpisodes(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode/?page=${page}`);
  }
}
