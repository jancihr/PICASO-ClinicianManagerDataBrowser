import { Component, OnInit, OnDestroy } from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientDisease} from "../model/patient-disease";
import {PatientLoadProgress} from "../model/patient-loadprogress";


@Component({
    selector: 'patient-diseases',
    templateUrl: './patient-diseases.component.html',
    styleUrls: ['./patient-diseases.component.css'],
    providers: [PicasoDataService]

})

export class PatientDiseasesComponent implements OnInit {
    errorMessage: string;
    diseases: PatientDisease[];

    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "name";
    public sortOrder = "asc";


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

    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {
        this.getDiseases();
    }

    getDiseases(): void {

        this.picasoDataService.getDiseases(undefined, undefined, this.progress).
        subscribe(diseases => this.diseases = diseases,
            error => this.errorMessage = <any>error);


    }

}
