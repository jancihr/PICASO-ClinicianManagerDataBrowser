/**
 * Created by jan hreno on 9.1.17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {InfoResult} from "../model/generated-interfaces";


@Component({
  selector: "patient-overview",
  template: require("./patient-overview.component.html"),
  styles: [require("./patient-overview.component.css")]
})

export class PatientOverviewComponent implements OnInit {

  errorMessage: string;
  patientData: InfoResult;
  selectedPatient: string = "1007";
  token: string;

  patientsList: string[];

  progress: PatientLoadProgress;

  constructor(private picasoDataService: PicasoOdsCmDataService) {
    this.progress = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
  };

  ngOnInit(): void {

    //this.getToken("picasodemo", "password");

    this.getPatient();
    //this.getPatientResult();

  }


  getToken(user: string, pass: string): void {
    this.picasoDataService.getToken(user, pass, this.progress).subscribe(
      token => {
        this.token = token;
      },
      error => this.errorMessage = <any>error);

    //console.log("webservice called");
    //console.log(this.patientData);
    //console.log(this.errorMessage);

  }

  getPatient(): void {

    //console.log("getPatientResult", this.selectedPatient);
    this.picasoDataService.getPatientResult(this.progress).subscribe(
      patient => this.patientData = patient,
      error => this.errorMessage = <any>error);



    //console.log("webservice called");
    //console.log(this.patientData);
    //console.log(this.errorMessage);

  }


  patientClicked(patientId: string) {
    this.selectedPatient = patientId;
    this.getPatient();
  }

  getPatients(): void {


    this.picasoDataService.getPatients(this.progress).subscribe(
      patientsList => {
        this.patientsList = patientsList;
        this.selectedPatient = this.patientsList[0];
        this.getPatient()
      },
      error => this.errorMessage = <any>error);

    //console.log("webservice called");
    //console.log(this.patientData);
    //console.log(this.errorMessage);

  }


}
