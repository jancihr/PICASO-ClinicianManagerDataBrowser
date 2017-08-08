import { Component, OnInit, OnDestroy } from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientDisease} from "../model/patient-disease";
import {PatientImage} from "../model/patient-image";
import {PatientLoadProgress} from "../model/patient-loadprogress";

@Component({
    selector: 'patient-imaging',
    templateUrl: './patient-imaging.component.html',
    styleUrls: ['./patient-imaging.component.css'],
    providers: [PicasoDataService]

})

export class PatientImagingComponent implements OnInit {
    errorMessage: string;
    imaging: PatientImage[];

    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "type";
    public sortOrder = "asc";

  public settings = {
    columns: {
      type: {
        title: 'Type',
      },
      exists: {
        title: 'Exists',
      },
      dates: {
        title: 'Dates',
        editable: false
      },
      report: {
        title: 'Report',
        editable: false
      },
      url: {
        title: 'URL',
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
        this.getImaging();
    }

    getImaging(): void {

        this.picasoDataService.getImaging(undefined, undefined, this.progress).
        subscribe(imaging => this.imaging = imaging,
            error => this.errorMessage = <any>error);


    }

}
