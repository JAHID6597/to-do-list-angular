import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // public API_LOCAL_BASE_URL = 'http://localhost:3000';
  public API_BASE_URL = 'https://nestjs-to-do-list-server.onrender.com';

  constructor() {}
}
