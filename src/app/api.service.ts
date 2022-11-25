import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  length: number;
  
  constructor(private httpClient: HttpClient) { }

  public getRoute(){
    return this.httpClient.get("https://recruiting-api.newshore.es/api/flights/1");
  }
}

