import {Component, OnInit} from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {FollowUpsResult} from "../model/generated-interfaces";

@Component({
  selector: 'patient-follow-up-appointments',
  templateUrl: './patient-follow-up-appointments.component.html',
  styleUrls: ['./patient-follow-up-appointments.component.css'],
  providers: [PicasoDataService]

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

  constructor(private picasoDataService: PicasoDataService) {
  };

  ngOnInit(): void {
    this.getFollowUps();
  }

  getFollowUps(): void {
    this.picasoDataService.getFollowUps(undefined, undefined, undefined, this.progress).subscribe(concludingComments => this.followUps = concludingComments,
      error => this.errorMessage = <any>error);


  }

}
