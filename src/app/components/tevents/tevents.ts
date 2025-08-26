import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../core/service/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tevents',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './tevents.html',
  styleUrl: './tevents.css',
})
export class TEvents implements OnInit {
  private apiService = inject(Api);
  private activeRoute = inject(ActivatedRoute);
  tennisEventList = signal<any[]>([]);
  isloading = false;
  competitionId: any;

  Math = Math;

  // Pagination state
  pageSize = signal<number>(10);
  searchTerm = signal('');
  currentPage = signal(1);

  // Derived data using Angular Signals
  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.tennisEventList().filter(
      (item) =>
        item.event_name.toLowerCase().includes(term)
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
        this.showToast('Tennis Event list fetched successfully');
        this.currentPage.set(1);
      },
      error: (err) => {
        this.isloading = false;
        console.log('Error in getting Tennis event list: ', err);
        this.showToast('Error in getting Tennis event list', true);
      },
    });
  }

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
