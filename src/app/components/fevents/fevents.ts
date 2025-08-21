import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fevents',
  imports: [RouterModule, CommonModule],
  templateUrl: './fevents.html',
  styleUrl: './fevents.css',
})
export class FEvents implements OnInit {
  private apiService = inject(Api);
  private activeRoute = inject(ActivatedRoute);
  soccerEventList = signal<any[]>([]);
  isloading = false;
  competitionId: any;

  constructor() {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: any) => {
      this.competitionId = param.get('competitionId');
      this.fetchSoccerEventList(this.competitionId);
    });
  }

  fetchSoccerEventList(id: any) {
    this.isloading = true;
    this.apiService.getEventList(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.soccerEventList.set(res.events);
        console.log(this.soccerEventList(), 'this.soccerEventList()');
        this.showToast('Soccer Event list fetched successfully');
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting Soccer event list: ', err);
        this.showToast('Error in getting Soccer event list', true);
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
