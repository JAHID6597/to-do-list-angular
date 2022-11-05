import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  IAddItemData,
  IUpdateItemData,
} from '../../../modules/items/interface/item-data.interface';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public ITEM_API_BASE_URL = `${this.globalService.API_BASE_URL}/items`;

  constructor(
    private readonly http: HttpClient,
    private readonly globalService: GlobalService
  ) {}

  public getItems(status: string): Observable<any> {
    return this.http
      .get(
        `${this.ITEM_API_BASE_URL}/get-all?status_type=${status}`
      )
      .pipe(
        map((x) => x),
        catchError((error: Response) => {
          return throwError(() => error);
        })
      );
  }

  public getItem(id: string): Observable<any> {
    return this.http.get(`${this.ITEM_API_BASE_URL}/get-by-id/${id}`).pipe(
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  public addItem(body: IAddItemData): Observable<any> {
    return this.http.post(`${this.ITEM_API_BASE_URL}/add`, body).pipe(
      map((x) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  public updateItem(id: string, body: IUpdateItemData): Observable<any> {
    return this.http.patch(`${this.ITEM_API_BASE_URL}/update/${id}`, body).pipe(
      map((x) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  public deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.ITEM_API_BASE_URL}/delete/${id}`).pipe(
      map((x) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }
}
