import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign/sign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularToastifyModule } from 'angular-toastify';

@NgModule({
  declarations: [SignComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularToastifyModule,
  ],
})
export class AuthModule {}
