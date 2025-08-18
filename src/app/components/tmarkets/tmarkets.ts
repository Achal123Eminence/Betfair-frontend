import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-tmarkets',
  imports: [RouterModule],
  templateUrl: './tmarkets.html',
  styleUrl: './tmarkets.css'
})
export class TMarkets {
  
  openMarketDataModal(body: any) {
    console.log(body,"body");
    const modal = document.getElementById('marketDataModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

}
