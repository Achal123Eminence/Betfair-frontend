import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cricket-events-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './cricket-events-list.html',
  styleUrl: './cricket-events-list.css',
})
export class CricketEventsList implements OnInit {
  private apiService = inject(Api);
  cricketAllEventList = signal<any[]>([]);
  isloading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchCricketAllEventList('4');
  }

  fetchCricketAllEventList(id: any) {
    this.isloading = true;
    this.apiService.getAllEvents(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.cricketAllEventList.set(res.events);
        console.log(this.cricketAllEventList(), 'this.cricketAllEventList()');
        this.showToast('Cricket All Event list fetched successfully');
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting cricket all event list: ', err);
        this.showToast('Error in getting cricket all event list', true);
      },
    });
  }

  private showToast(message: string, isError: boolean = false): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: isError ? 'error' : 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}
