import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemData } from '../interface/item-data.interface';
import { Router } from '@angular/router';
import { ItemService } from '../../../shared/service/item/item.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-item-table-with-pagination',
  templateUrl: './item-table-with-pagination.component.html',
  styleUrls: ['./item-table-with-pagination.component.css'],
})
export class ItemTableWithPaginationComponent implements OnInit {
  tableDataSrc: any;
  @Input() tableColumns: any;
  @Input() tableData: ItemData[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly itemService: ItemService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.getTableDataSrc(this.tableData);
  }

  public getTableDataSrc(tableData: ItemData[]) {
    this.tableDataSrc = new MatTableDataSource(tableData);
    this.tableDataSrc.paginator = this.paginator;
  }

  onSearchInput(event: any) {
    const searchTarget = event.target.value;
    this.tableDataSrc.filter = searchTarget.trim().toLowerCase();
  }

  public navigateToItemUpdate(item: ItemData): void {
    console.log(item);
    this.router.navigateByUrl(`/item/add?id=${item._id}`);
  }

  public updateActiveStatus(item: ItemData) {
    const body = {
      isActive: !item.isActive,
    };
    this.itemService.updateItem(item._id, body).subscribe({
      next: (result) => {
        if (result) {
          this.toastService.success('Successfully updated status.');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Failed to updated status.');
      },
    });
  }

  public deleteItem(item: ItemData) {
    this.itemService.deleteItem(item._id).subscribe({
      next: (result) => {
        if (result) {
          this.toastService.success('Successfully deleted a item.');
          this.tableData = this.tableData.filter(
            (data) => data._id !== item._id
          );
          this.getTableDataSrc(this.tableData);
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Failed to deleted a item.');
      },
    });
  }
}
