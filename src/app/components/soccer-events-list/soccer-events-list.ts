import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soccer-events-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './soccer-events-list.html',
  styleUrl: './soccer-events-list.css'
})
export class SoccerEventsList implements OnInit {
  private apiService = inject(Api);
  soccerAllEventList = signal<any[]>([]);
  isloading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchSoccerAllEventList('1');
  }

  fetchSoccerAllEventList(id: any) {
    this.isloading = true;
    this.apiService.getAllEvents(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.soccerAllEventList.set(res.events);
        console.log(this.soccerAllEventList(), 'this.soccerAllEventList()');
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

