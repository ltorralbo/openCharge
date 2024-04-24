// openchargemap.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenChargeMapService {

  private readonly API_URL = 'https://api.openchargemap.io/v3/poi';
  private readonly API_KEY = 'd7f59938-1864-4cf8-ab19-fc93b4fde2f3';

  constructor(private http: HttpClient) { }

  getChargers(): Observable<any> {
    const headers = { 'Accept': 'application/json' };
    const params = { key: this.API_KEY };

    return this.http.get<any>(this.API_URL, { headers, params });
  }
}
