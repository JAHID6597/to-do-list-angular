import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ItemService } from '../../../shared/service/item/item.service';
import { ItemData } from '../interface/item-data.interface';
import { ItemStatusTypeENUM } from '../enum/item-status-type.enum';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit {
  tableColumns: string[] = ['title', 'description', 'isActive', 'actions'];
  toDoItems: ItemData[] = [];
  completedItems: ItemData[] = [];
  rejectedItems: ItemData[] = [];

  constructor(private readonly itemService: ItemService) {}

  async ngOnInit(): Promise<void> {
    this.toDoItems = await this.getItemsByStatus(ItemStatusTypeENUM.PENDING);
    this.completedItems = await this.getItemsByStatus(
      ItemStatusTypeENUM.COMPLETED
    );
    this.rejectedItems = await this.getItemsByStatus(
      ItemStatusTypeENUM.REJECTED
    );
  }

  public async getItemsByStatus(status: string): Promise<ItemData[]> {
    return await lastValueFrom(this.itemService.getItems(status));
  }
}
