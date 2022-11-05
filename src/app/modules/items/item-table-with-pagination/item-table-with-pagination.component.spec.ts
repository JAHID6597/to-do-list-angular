import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableWithPaginationComponent } from './item-table-with-pagination.component';

describe('TableWithPaginationComponent', () => {
  let component: ItemTableWithPaginationComponent;
  let fixture: ComponentFixture<ItemTableWithPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemTableWithPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemTableWithPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
