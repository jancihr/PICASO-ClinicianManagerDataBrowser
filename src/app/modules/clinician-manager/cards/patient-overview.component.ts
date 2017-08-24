/**
 * Created by jan hreno on 9.1.17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {InfoResult} from "../model/generated-interfaces";


@Component({
  selector: "patient-overview",
  template: require("./patient-overview.component.html"),
  styles: [require("./patient-overview.component.css")],
  providers: [PicasoDataService]
})

export class PatientOverviewComponent implements OnInit {

  errorMessage: string;
  patientData: InfoResult;
  selectedPatient: string = "1007";
  token: string;

  patientsList: string[];

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  constructor(private picasoDataService: PicasoDataService) {
  };

  ngOnInit(): void {

    //this.getToken("picasodemo", "password");

    this.getPatients();
    //this.getPatient();
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

    //console.log("getPatient", this.selectedPatient);
    this.picasoDataService.getPatient(this.progress).subscribe(
      patient => this.patientData = patient,
      error => this.errorMessage = <any>error);


    setTimeout(() => {
      this.progress.percentage = 0;
    }, 300);
    setTimeout(() => {
      this.progress.percentage = 25
    }, 600);
    setTimeout(() => {
      this.progress.percentage = 50
    }, 900);
    setTimeout(() => {
      this.progress.percentage = 75
    }, 1200);
    setTimeout(() => {
      this.progress.percentage = 100
    }, 1500);

    setTimeout(() => {
      this.progress.total = 2000
    }, 1800);


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
