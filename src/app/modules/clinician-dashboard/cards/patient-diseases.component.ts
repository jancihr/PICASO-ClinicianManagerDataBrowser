import { Component, OnInit, OnDestroy } from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientDisease} from "../model/patient-disease";

@Component({
    selector: 'patient-diseases',
    templateUrl: './patient-diseases.component.html',
    styleUrls: ['./patient-diseases.component.css'],
    providers: [PicasoDataService]

})

export class PatientDiseasesComponent implements OnInit {
    errorMessage: string;
    diseases: PatientDisease[];

    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {
        this.getDiseases();
    }

    getDiseases(): void {

        this.picasoDataService.getDiseases().
        subscribe(diseases => this.diseases = diseases,
            error => this.errorMessage = <any>error);


    }

}