import { Component, OnInit, OnDestroy } from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientDisease} from "../model/patient-disease";
import {PatientImage} from "../model/patient-image";

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

    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {
        this.getImaging();
    }

    getImaging(): void {

        this.picasoDataService.getImaging(undefined, undefined).
        subscribe(imaging => this.imaging = imaging,
            error => this.errorMessage = <any>error);


    }

}