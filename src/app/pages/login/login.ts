import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) { }

  login() {

    const body = {
      username: this.username,
      password: this.password
    };

    this.authService.login(body)
      .subscribe({
        next: (response: any) => {

          this.authService
            .saveToken(response.accessToken);

          this.router.navigate(['/vote']);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
  }

}
