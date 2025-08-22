import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Api } from '../../core/service/api';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-tmarkets',
  imports: [RouterModule,JsonPipe,CommonModule,FormsModule],
  templateUrl: './tmarkets.html',
  styleUrl: './tmarkets.css'
})
export class TMarkets implements OnInit{

  private apiService = inject(Api);
  private activeRoute = inject(ActivatedRoute);
  tennisMarketList = signal<any[]>([]);
  tennisMarketBookList = signal<any[]>([]);
  isloading = false;
  eventId: any;
  
  Math = Math;

  // Pagination state
  pageSize = signal<number>(10);
  searchTerm = signal('');
  currentPage = signal(1);

  // Derived data using Angular Signals
  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.tennisMarketList().filter(
      (item) =>
        item.marketName.toLowerCase().includes(term) ||
        item.marketId.toLowerCase().includes(term) 
    );
  });

  paginatedList = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredList().slice(start, start + this.pageSize());
  });

  totalPages = computed(
    () => Math.ceil(this.filteredList().length / this.pageSize()) || 1
  );

  
  constructor() {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: any) => {
      this.eventId = param.get('eventId');
      this.fetchTennisMarketList(this.eventId);
    });
  }

  fetchTennisMarketList(id: any) {
    this.isloading = true
    this.apiService.getMarketList(id).subscribe({
      next: (res: any) => {
        this.isloading = false;
        this.tennisMarketList.set(res.markets);
        console.log(this.tennisMarketList(), 'this.tennisMarketList()');
        this.showToast('Cricket Market list fetched successfully');
        this.currentPage.set(1);
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting cricket Market list: ', err);
        this.showToast('Error in getting cricket Market list', true);
      },
    });
  }
  
  openMarketDataModal(id: any) {
    console.log(id, 'body');
    if(id){
      this.isloading = true;
      this.apiService.getMarketBook(id).subscribe({
        next:(res:any) => {
          this.isloading = false;
          this.tennisMarketBookList.set(res.marketBook[0]);
          console.log(this.tennisMarketBookList(), 'this.tennisMarketBookList()');
          const modal = document.getElementById('marketDataModal');
          if (modal) new bootstrap.Modal(modal).show();
          this.showToast('Tennis Market Book Data fetched successfully');
        },
        error: (err) => {
          this.isloading = false
          console.log('Error in getting Tennis Market book data: ', err);
          this.showToast('Error in getting Tennis Market book data', true);
        }
      })
    }
  }

  async copyJson(): Promise<void> {
    try {
      const text = JSON.stringify(this.tennisMarketBookList(), null, 2);
      await navigator.clipboard.writeText(text);
      const modalEl = document.getElementById('marketDataModal');
      if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
      this.showToast("JSON copied to clipboard!");
    } catch (err) {
      this.showToast(`Failed to copy JSON: ${err}`);
    }
  };

  
  setPageSize(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (select) {
      this.pageSize.set(Number(select.value));
      this.currentPage.set(1);
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.currentPage.set(1);
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
