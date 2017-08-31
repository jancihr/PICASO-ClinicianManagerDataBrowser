import {Component, OnInit} from '@angular/core';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {FollowUpsResult} from "../model/generated-interfaces";

@Component({
  selector: 'patient-follow-up-appointments',
  templateUrl: './patient-follow-up-appointments.component.html',
  styleUrls: ['./patient-follow-up-appointments.component.css']

})

export class PatientFollowUpComponent implements OnInit {
  errorMessage: string;
  followUps: FollowUpsResult[];

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "date";
  public sortOrder = "desc";


  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  constructor(private picasoDataService: PicasoOdsCmDataService) {
  };

  ngOnInit(): void {
    this.getFollowUps();
  }

  getFollowUps(): void {
    this.progress = {
      percentage: 0,
      loaded: 0,
      total: 0
    };

    this.picasoDataService.getFollowUps(undefined, undefined, undefined, this.progress).subscribe(concludingComments => this.followUps = concludingComments,
      error => this.errorMessage = <any>error);


  }

}
