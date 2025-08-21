import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tennis',
  imports: [RouterModule,CommonModule],
  templateUrl: './tennis.html',
  styleUrl: './tennis.css'
})
export class Tennis implements OnInit{

  private apiService = inject(Api);
  tennisCompetitionList = signal<any[]>([]);
  isloading = false;

  constructor(){}

  ngOnInit(): void {
    this.fetchTennisCompetitionList("2");
  }

  fetchTennisCompetitionList(id:any){
    this.isloading = true;
    this.apiService.getCompetitionList(id).subscribe({
      next: (res:any) => {
        this.isloading = false;
        this.tennisCompetitionList.set(res?.competitions);
        console.log(this.tennisCompetitionList(),"this.tennisCompetitionList()");
        this.showToast("Tennis competition list fetched successfully");
      },
      error: (err) =>{
        this.isloading = false;
        console.log('Error in getting tennis competition list: ',err);
        this.showToast('Error in getting tennis competition list',true);
      }
    })
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
