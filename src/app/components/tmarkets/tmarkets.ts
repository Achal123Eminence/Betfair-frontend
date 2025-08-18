import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-tmarkets',
  imports: [RouterModule,JsonPipe],
  templateUrl: './tmarkets.html',
  styleUrl: './tmarkets.css'
})
export class TMarkets {

  marketData: Record<string, any> = {
    sport: "Cricket",
    teams: ["India", "Australia"],
    score: { India: 250, Australia: 245 },
    status: "Live"
  };
  
  openMarketDataModal(body: any) {
    console.log(body,"body");
    const modal = document.getElementById('marketDataModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

  async copyJson(): Promise<void> {
    try {
      const text = JSON.stringify(this.marketData, null, 2);
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
