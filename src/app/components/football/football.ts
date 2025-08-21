import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-football',
  imports: [RouterModule, CommonModule],
  templateUrl: './football.html',
  styleUrl: './football.css',
})
export class Football implements OnInit {
  private apiService = inject(Api);
  soccerCompetitionList = signal<any[]>([]);
  isloading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchSoccerCompetitionList('1');
  }

  fetchSoccerCompetitionList(id: any) {
    this.isloading = true;
    this.apiService.getCompetitionList(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.soccerCompetitionList.set(res?.competitions);
        console.log(
          this.soccerCompetitionList(),
          'this.soccerCompetitionList()'
        );
        this.showToast("Soccer competition list fetched successfully");
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting soccer competition list: ', err);
        this.showToast('Error in getting soccer competition list', true);
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
