import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class CommunicationService {

  constructor(private http: Http) { }

  getComumications(patientId, clinicianRole?){
    return [{
      text: "",
      dateTime: new Date(),
      patient: patientId,
      authorRole: clinicianRole,
      author: ""
    }];
  }

  postCommunication(patientId, clinicianId, clinicianRole){
    let d = new Date();
  }
}
