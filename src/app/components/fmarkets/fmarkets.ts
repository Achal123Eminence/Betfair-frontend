import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Api } from '../../core/service/api';
declare var bootstrap: any;

@Component({
  selector: 'app-fmarkets',
  imports: [RouterModule,JsonPipe,CommonModule],
  templateUrl: './fmarkets.html',
  styleUrl: './fmarkets.css'
})
export class FMarkets implements OnInit{
  
  private apiService = inject(Api);
  private activeRoute = inject(ActivatedRoute);
  soccerMarketList = signal<any[]>([]);
  soccerMarketBookList = signal<any[]>([]);
  isloading = false;
  eventId: any;
  
  constructor() {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: any) => {
      this.eventId = param.get('eventId');
      this.fetchSoccerMarketList(this.eventId);
    });
  }

  fetchSoccerMarketList(id: any) {
    this.isloading = true;
    this.apiService.getMarketList(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.soccerMarketList.set(res.markets);
        console.log(this.soccerMarketList(), 'this.soccerMarketList()');
        this.showToast('Soccer Market list fetched successfully');
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting Soccer Market list: ', err);
        this.showToast('Error in getting Soccer Market list', true);
      },
    });
  }

  marketData: Record<string, any> = {
    sport: "Cricket",
    teams: ["India", "Australia"],
    score: { India: 250, Australia: 245 },
    status: "Live"
  };

  openMarketDataModal(id: any) {
    console.log(id, 'body');
    if(id){
      this.isloading = true
      this.apiService.getMarketBook(id).subscribe({
        next:(res:any) => {
          this.isloading = false;
          this.soccerMarketBookList.set(res.marketBook[0]);
          console.log(this.soccerMarketBookList(), 'this.soccerMarketBookList()');
          const modal = document.getElementById('marketDataModal');
          if (modal) new bootstrap.Modal(modal).show();
          this.showToast('Cricket Market Book Data fetched successfully');
        },
        error: (err) => {
          this.isloading = false;
          console.log('Error in getting cricket Market book data: ', err);
          this.showToast('Error in getting cricket Market book data', true);
        }
      })
    }
  };

  async copyJson(): Promise<void> {
    try {
      const text = JSON.stringify(this.soccerMarketBookList(), null, 2);
      await navigator.clipboard.writeText(text);
      const modalEl = document.getElementById('marketDataModal');
      if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
      this.showToast("JSON copied to clipboard!");
    } catch (err) {
      this.showToast(`Failed to copy JSON: ${err}`);
    }
  };

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
