import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.loggedIn = true;
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): boolean {
    let user: User | null = null;

    if (username === 'rick' && password === 'rick') {
      user = {
        id: 1,
        name: 'Rick Sanchez',
        username: 'rick',
        password: 'rick',
        token: 'some-jwt-token'
      };
    } else if (username === 'morty' && password === 'morty') {
      user = {
        id: 2,
        name: 'Morty Smith',
        username: 'morty',
        password: 'morty',
        token: 'other-jwt-token'
      };
    }

    if (user) {
      this.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getUser() {
    return this.currentUserSubject.asObservable();
  }
}
