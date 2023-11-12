import { Injectable, inject } from '@angular/core';
import { BpicsmnRequest, RequestType } from '../model/bpicsmn-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  executeRequest(request: BpicsmnRequest): Observable<Object> | undefined {
    if (request.type === RequestType.GET) {
      return this.executeGetRequest(request);
    }

    return undefined;
  }

  private executeGetRequest(request: BpicsmnRequest): Observable<Object> {
    return this.http.get(request.url, {
      headers: request.headers,
      params: request.params,
    });
  }
}
