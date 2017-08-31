import { Component, OnInit, OnDestroy } from '@angular/core';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {DiseasesResult} from "../model/generated-interfaces";


@Component({
    selector: 'patient-diseases',
    templateUrl: './patient-diseases.component.html',
  styleUrls: ['./patient-diseases.component.css']

})

export class PatientDiseasesComponent implements OnInit {
    errorMessage: string;
  diseases: DiseasesResult[];

    public filterQuery = "";
    public rowsOnPage = 5;
  public sortBy = "dateOfOnset";
  public sortOrder = "desc";


  settings = {
    columns: {
      name: {
        title: 'Name',
      },
      dateOfOnset: {
        title: 'Date Of Onset',
      },
      severity: {
        title: 'Severity',
        editable: false
      },
      sideOfOnset: {
        title: 'Side of Onset',
        editable: false
      },
      clinicalPhenotype: {
        title: 'Clinical Phenotype',
        editable: false
      }
    },
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    pager: {
      display: true,
      perPage: 5
    }
  };

    progress: PatientLoadProgress = {
        percentage: 0,
        loaded: 0,
        total: 0
    };

  constructor(private picasoDataService: PicasoOdsCmDataService) {
    };

    ngOnInit(): void {
        this.getDiseases();
    }

    getDiseases(): void {
      this.progress = {
        percentage: 0,
        loaded: 0,
        total: 0
      };

        this.picasoDataService.getDiseases(undefined, undefined, this.progress).
        subscribe(diseases => this.diseases = diseases,
            error => this.errorMessage = <any>error);


    }

}
