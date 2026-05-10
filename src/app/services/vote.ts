import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'https://localhost:7286/api/vote';

  constructor(private http: HttpClient) { }

  createVote(score: number) {
    return this.http.post(this.apiUrl, { score });
  }

  getNps() {
    return this.http.get(`${this.apiUrl}/nps`);
  }
}