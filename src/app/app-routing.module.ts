import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CanActivateChildGuard } from './AuthGuard/can-activate-child.guard';
import { CanDeactivateGuard } from './AuthGuard/can-deactivate.guard';
import { EditUserPasswordComponent } from './dashboard/edit-user-password/edit-user-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // canActivateChild: [CanActivateChildGuard],
  },
  {
    path: 'dashboard/:id',
    component: EditUserPasswordComponent
    // loadChildren: () =>
    //   import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // canActivateChild: [CanActivateChildGuard],
  },

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
