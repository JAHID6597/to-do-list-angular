import { NgModule } from '@angular/core';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../component/not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [],
  exports: [NavbarComponent, NotFoundComponent],
})
export class SharedModule {}
