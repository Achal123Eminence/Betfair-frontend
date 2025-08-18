import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-cmarkets',
  imports: [RouterModule],
  templateUrl: './cmarkets.html',
  styleUrl: './cmarkets.css'
})
export class Cmarkets {

  openMarketDataModal(body: any) {
    console.log(body,"body");
    const modal = document.getElementById('marketDataModal');
    if (modal) new bootstrap.Modal(modal).show();
  }
}
