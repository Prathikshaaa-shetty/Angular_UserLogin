import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../AuthGuard/auth-guard.guard';
import { CanDeactivateGuard } from '../AuthGuard/can-deactivate.guard';
import { DashboardComponent } from './dashboard.component';
import { EditUserPasswordComponent } from './edit-user-password/edit-user-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivateChild: ['canActivateAChild'],
    children: [
      {
        path: 'edit',
        component: EditUserPasswordComponent,
      },
    ],
    canActivate: [AuthGuardGuard],
    canDeactivate: [CanDeactivateGuard],
  },

];

export const DashboardRoutes = RouterModule.forChild(routes);
