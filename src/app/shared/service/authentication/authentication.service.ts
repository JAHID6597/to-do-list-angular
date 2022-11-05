import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ISignData } from '../../../modules/auth/interface/sign-data.interface';
import { GlobalService } from '../global/global.service';

const jwtHelperService = new JwtHelperService();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly http: HttpClient,
    private readonly globalService: GlobalService
  ) {}

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      if (jwtHelperService.isTokenExpired(token)) {
        this.logout();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public signIn(body: ISignData): Observable<any> {
    return this.http.post(
      `${this.globalService.API_BASE_URL}/users/login`,
      body,
      httpOptions
    );
  }

  public signUp(body: ISignData): Observable<any> {
    return this.http.post(
      `${this.globalService.API_BASE_URL}/users/create`,
      body
    );
  }

  public getToken(): string | null {
    const token = localStorage.getItem('access_token');
    return token ? JSON.parse(token) : null;
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', JSON.stringify(token));
  }

  public logout(): boolean {
    localStorage.removeItem('access_token');
    return true;
  }

  public getLoggedInUser(): string | null {
    const token = this.getToken();
    return token ? jwtHelperService.decodeToken(token) : null;
  }
}
