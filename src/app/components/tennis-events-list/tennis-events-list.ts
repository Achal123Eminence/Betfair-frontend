import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tennis-events-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './tennis-events-list.html',
  styleUrl: './tennis-events-list.css'
})
export class TennisEventsList implements OnInit {
  private apiService = inject(Api);
  tennisAllEventList = signal<any[]>([]);
  isloading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchTennisAllEventList('2');
  }

  fetchTennisAllEventList(id: any) {
    this.isloading = true;
    this.apiService.getAllEvents(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.tennisAllEventList.set(res.events);
        console.log(this.tennisAllEventList(), 'this.tennisAllEventList()');
        this.showToast('Tennis All Event list fetched successfully');
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting Tennis all event list: ', err);
        this.showToast('Error in getting Tennis all event list', true);
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