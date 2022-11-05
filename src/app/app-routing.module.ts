import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemLayoutComponent } from './modules/items/item-layout/item-layout.component';
import { AuthGuard } from './auth-guard/auth-guard';
import { UserLayoutComponent } from './modules/user/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'item',
    component: ItemLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/items/items.module').then(
        (module) => module.ItemsModule
      ),
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then(
        (module) => module.UserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
