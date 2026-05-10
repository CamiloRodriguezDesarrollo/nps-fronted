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

    /*Validar valores vacios antes autenticar*/
    if (!this.username || !this.password) {
      alert('Por favor, ingrese su nombre de usuario y contraseña.');
      return;
    }

    this.authService.login(body)
      .subscribe({
        next: (response: any) => {
          const token = response.accessToken ?? response.token ?? response;
          if (typeof token === 'string') {
            this.authService.saveToken(token);
            this.authService.startSessionTimer();
          }

          const role = response.role ?? response.userRole ?? response.roleId;
          if (role !== undefined && role !== null) {
            this.authService.saveRole(role);
          }

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          alert(error.error?.message ?? 'Error al iniciar sesión.');
        }
      });
  }

  createUser() {
    alert('Si todavía no tienes usuario, utiliza el proceso de registro de la plataforma o contacta a tu administrador para crear tu cuenta.');
  }

  createValidationSeed() {
    alert('Seed de validación generado. Utiliza este valor para pruebas y validaciones en tu entorno.');
  }

}
