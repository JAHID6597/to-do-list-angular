import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public API_BASE_URL = 'http://localhost:3000';

  constructor() {}
}
