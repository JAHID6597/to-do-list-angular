import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { IUser, IUserUpdate } from '../../../modules/user/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public USER_API_BASE_URL = `${this.globalService.API_BASE_URL}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly globalService: GlobalService
  ) {}

  public getAuthUser(): Observable<any> {
    return this.http.get(`${this.USER_API_BASE_URL}/get-by-auth`).pipe(
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  public updateUser(body: IUserUpdate): Observable<any> {
    return this.http.patch(`${this.USER_API_BASE_URL}/update`, body).pipe(
      map((x) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }

  public deleteUser(): Observable<any> {
    return this.http.delete(`${this.USER_API_BASE_URL}/delete`).pipe(
      map((x) => x),
      catchError((error: Response) => {
        return throwError(() => error);
      })
    );
  }
}
