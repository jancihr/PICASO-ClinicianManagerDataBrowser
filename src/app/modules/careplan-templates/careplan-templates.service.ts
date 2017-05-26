import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
const CONFIG = {
  API_URL: "https://picaso.fit.fraunhofer.de/api-dev/",
  defaultHttpReqOptions: null
};
@Injectable()
export class CareplanTemplatesService {
  private config = CONFIG;

  constructor(private http: Http) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.config.defaultHttpReqOptions = {
      headers: headers
    };
  }

  getTemlates(): Observable<any> {
    return this.http.get(this.config.API_URL + "picaso/resource/careplan/templates")
      .map(res => res.json());
  }

}
