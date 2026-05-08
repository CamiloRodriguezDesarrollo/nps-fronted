import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Vote } from './pages/vote/vote';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'vote',
    component: Vote
  },
  {
    path: 'dashboard',
    component: Dashboard
  }
];