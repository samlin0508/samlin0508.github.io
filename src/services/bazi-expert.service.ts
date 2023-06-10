import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaZiResponse } from 'src/models/bazi-response';
import { BaZiRequest } from 'src/models/bazi-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaziExpertService {

  constructor(private httpClient: HttpClient) { }

  public explore(baZiRequest: BaZiRequest): Observable<BaZiResponse[]> {
    return this.httpClient.post<BaZiResponse[]>(environment.apis.default.url, baZiRequest);
  }
}
