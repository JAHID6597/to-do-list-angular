import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllItemsComponent } from './all-items/all-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemLayoutComponent } from './item-layout/item-layout.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ItemTableWithPaginationComponent } from './item-table-with-pagination/item-table-with-pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    ItemLayoutComponent,
    AllItemsComponent,
    AddItemComponent,
    ItemTableWithPaginationComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ItemsModule {}
