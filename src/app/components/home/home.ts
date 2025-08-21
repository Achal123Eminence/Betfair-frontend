import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  private apiService = inject(Api);
  cricketCompetitionList = signal<any[]>([]);
  isloading = false;

  constructor(){}

  ngOnInit(): void {
    this.fetchCricketCompetitionList("4");
  }

  fetchCricketCompetitionList(id:any){
    this.isloading = true;
    this.apiService.getCompetitionList(id).subscribe({
      next: (res:any) => {
        this.isloading = false;
        this.cricketCompetitionList.set(res?.competitions);
        console.log(this.cricketCompetitionList(),"this.cricketCompetitionList()");
        this.showToast("Cricket competition list fetched successfully");
      },
      error: (err) =>{
        this.isloading = false;
        console.log('Error in getting cricket competition list: ',err);
        this.showToast('Error in getting cricket competition list',true);
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
