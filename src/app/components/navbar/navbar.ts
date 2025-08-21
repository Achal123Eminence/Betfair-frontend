import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../core/service/api';
import { User } from '../../core/service/user';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private router = inject(Router);
  private apiService = inject(Api); 
  private userService = inject(User);

  logout(): void{
    this.userService.logout()
  }

  isCricketActive(): boolean {
  return this.router.url.startsWith('/cricket')
      || this.router.url.startsWith('/c-event')
      || this.router.url.startsWith('/c-market');
}

isSoccerActive(): boolean {
  return this.router.url.startsWith('/soccer')
      || this.router.url.startsWith('/s-event')
      || this.router.url.startsWith('/s-market');
}

isTennisActive(): boolean {
  return this.router.url.startsWith('/tennis')
      || this.router.url.startsWith('/t-event')
      || this.router.url.startsWith('/t-market');
}

isListCricketActive(): boolean {
  return this.router.url.startsWith('/cricket-events');
}

isListSoccerActive(): boolean {
  return this.router.url.startsWith('/soccer-events');
}

isListTennisActive(): boolean {
  return this.router.url.startsWith('/tennis-events');
}

}
