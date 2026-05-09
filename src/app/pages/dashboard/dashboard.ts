import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  role: number | null = null;
  voteValue = 5;
  voteSubmitted = false;
  reportedScore = 78;
  reportDetails = {
    promoters: 62,
    detractors: 12,
    neutrals: 26,
  };

  constructor(private authService: Auth) {
    this.role = this.authService.getRole();
  }

  submitVote() {
    this.voteSubmitted = true;
    alert(`Gracias por votar. Su valoración fue ${this.voteValue} de 10.`);
  }

  get reportClass() {
    if (this.reportedScore >= 80) {
      return 'report-high';
    }
    if (this.reportedScore >= 60) {
      return 'report-medium';
    }
    return 'report-low';
  }
}

