import { NgModule } from '@angular/core';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [],
  exports: [NavbarComponent],
})
export class SharedModule {}
