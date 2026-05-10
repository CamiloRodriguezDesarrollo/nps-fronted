import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import {Router} from "@angular/router";
import { VoteService } from '../../services/vote';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

/*Voto */

export class Dashboard implements OnInit {

  nps = 0;

  role: number | null = null;
  voteValue = 5;
  voteSubmitted = false;
  reportedScore = 0;  

  score = 0; /*valor del voto */

  users: any[] = [];

  constructor(private authService: Auth, private router: Router, private voteService: VoteService) {
    this.role = this.authService.getRole();
  };
  
    ngOnInit(): void {

      if(this.role === null || this.role === undefined || this.role === 2){             
      }else{
        this.loadNps();
        this.loadUsers();
      }
  }

  submitVote() {

    this.voteSubmitted = true;
    this.voteService.createVote(this.voteValue).subscribe({
      next: (response: any) => {
        alert(response.message ?? '¡Gracias por tu voto!');
      },

      error: (error) => {
        alert(error.error?.message ?? 'Error al enviar tu voto. Por favor, inténtalo de nuevo más tarde.');
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  loadNps() {

    this.voteService
      .getNps()
      .subscribe({

        next: (response: any) => {

          this.nps = response;
          this.reportedScore = this.nps;
        },

        error: (error) => {

          console.log(error);

          alert('Error consultando NPS');
        }
      });
    }

  loadUsers() {
    // Simulando datos de usuarios
    // this.users = [
    //   { id: 1, name: 'Juan Pérez', rating: 9, blocked: false },
    //   { id: 2, name: 'María García', rating: 7, blocked: true },
    //   { id: 3, name: 'Carlos López', rating: 5, blocked: false },
    //   { id: 4, name: 'Ana Rodríguez', rating: 8, blocked: true },
    // ];
  }

  unlockUser(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.blocked = false;
      alert(`Usuario ${user.name} desbloqueado.`);
    }
  }

}

