import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('currentUser'));
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
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
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getUser() {
    return this.currentUserSubject.asObservable();
  }
}
