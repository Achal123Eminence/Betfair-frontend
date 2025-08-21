import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient){}

  login(obj:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/login`, obj);
  }

  getCompetitionList(sportId:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/data/competition/${sportId}`);
  };

  getEventList(competitionId:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/data/event/${competitionId}`);
  }

  getMarketList(eventId:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/data/market/${eventId}`);
  }

  getMarketBook(marketId:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/data/book/${marketId}`);
  }

  getAllEvents(sportId:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/data/all-event/${sportId}`);
  }
}
