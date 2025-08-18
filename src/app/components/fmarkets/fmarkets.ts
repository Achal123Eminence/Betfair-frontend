import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-fmarkets',
  imports: [RouterModule],
  templateUrl: './fmarkets.html',
  styleUrl: './fmarkets.css'
})
export class FMarkets {

  openMarketDataModal(body: any) {
    console.log(body,"body");
    const modal = document.getElementById('marketDataModal');
    if (modal) new bootstrap.Modal(modal).show();
  };
  
}
