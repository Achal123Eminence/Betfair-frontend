import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tevents',
  imports: [RouterModule, CommonModule],
  templateUrl: './tevents.html',
  styleUrl: './tevents.css',
})
export class TEvents implements OnInit{
  private apiService = inject(Api);
  private activeRoute = inject(ActivatedRoute);
  tennisEventList = signal<any[]>([]);
  isloading = false;
  competitionId: any;

  constructor() {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: any) => {
      this.competitionId = param.get('competitionId');
      this.fetchTennisEventList(this.competitionId);
    });
  }

  fetchTennisEventList(id: any) {
    this.isloading = true;
    this.apiService.getEventList(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.tennisEventList.set(res.events);
        console.log(this.tennisEventList(), 'this.tennisEventList()');
        this.showToast('Tennis Event list fetched successfully');
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting Tennis event list: ', err);
        this.showToast('Error in getting Tennis event list', true);
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
