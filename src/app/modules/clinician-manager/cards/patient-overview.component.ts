/**
 * Created by jan hreno on 9.1.17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {PatientData} from "../model/patient-data"
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";


@Component({
  selector: "patient-overview",
  template: require("./patient-overview.component.html"),
  styles: [require("./patient-overview.component.css")],
  providers: [PicasoDataService]
})

export class PatientOverviewComponent implements OnInit {

  errorMessage: string;
  patientData: PatientData;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  constructor(private picasoDataService: PicasoDataService) {
  };

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    this.picasoDataService.getPatient(this.progress).subscribe(
      patient => this.patientData = patient,
      error => this.errorMessage = <any>error);

    //console.log("webservice called");
    //console.log(this.patientData);
    //console.log(this.errorMessage);

  }

  reloadPatient(): void {
    this.getPatient();
  }

}
