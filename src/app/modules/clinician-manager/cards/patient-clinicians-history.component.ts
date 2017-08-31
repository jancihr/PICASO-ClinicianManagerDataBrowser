import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {CliniciansResult} from "../model/generated-interfaces";

@Component({
  selector: 'patient-clinicians-history',
  templateUrl: './patient-clinicians-history.component.html',
  styleUrls: ['./patient-clinicians-history.component.css']
})

export class PatientCliniciansComponent implements OnInit {
  errorMessage: string;
  clinicians: CliniciansResult[];

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "startDate";
  public sortOrder = "desc";



  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  constructor(private picasoDataService: PicasoOdsCmDataService) {
  };

  ngOnInit(): void {
    this.getClinicians();
  }

  getClinicians(): void {
    this.progress = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getClinicians(undefined, undefined, this.progress).subscribe(clinicians => this.clinicians = clinicians,
      error => this.errorMessage = <any>error);


  }

}
