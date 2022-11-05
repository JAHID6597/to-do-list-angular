import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { ItemService } from '../../../shared/service/item/item.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ItemData } from '../interface/item-data.interface';
import { ItemStatusType } from '../interface/item-status-type.interface';
import { ItemStatusTypeENUM } from '../enum/item-status-type.enum';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  editMode: boolean = false;
  itemId: string = '';
  item: ItemData | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly itemService: ItemService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.itemId = params['id'];
      if (this.itemId) {
        this.editMode = true;
        this.item = await this.getItemById(this.itemId);

        this.form = new FormGroup({
          title: new FormControl(this.item.title),
          description: new FormControl(this.item.description),
          status: new FormControl(this.item.status),
        });
      }
    });
  }

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });

  itemStatusTypes: ItemStatusType[] = [
    { value: ItemStatusTypeENUM.PENDING, viewValue: 'TO DO' },
    { value: ItemStatusTypeENUM.COMPLETED, viewValue: 'COMPLETED' },
    { value: ItemStatusTypeENUM.REJECTED, viewValue: 'REJECTED' },
  ];

  submit() {
    if (this.form.valid) {
      if (!this.editMode) {
        this.addItem();
      } else {
        this.updateItem();
      }
    }
  }

  public addItem() {
    delete this.form.value.status;

    this.itemService.addItem(this.form.value).subscribe({
      next: (result) => {
        if (result) {
          this.resetForm();
          this.toastService.success('Successfully added a item.');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Failed to added a item.');
      },
    });
  }

  public updateItem() {
    this.itemService.updateItem(this.itemId, this.form.value).subscribe({
      next: (result) => {
        if (result) {
          this.toastService.success('Successfully updated a item.');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Failed to updated a item.');
      },
    });
  }

  resetForm() {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  public async getItemById(id: string): Promise<ItemData> {
    return await lastValueFrom(this.itemService.getItem(id));
  }
}
