import {Component, OnInit, ViewChild}    from '@angular/core';
import { Router }               from '@angular/router';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientCheckHistoryComponent} from "./cards/patient-check-history.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";


@Component({
    templateUrl: 'clinician-manager.component.html'
})
export class ClinicianManagerComponent implements OnInit {



    private myDateRangePickerOptions: IMyOptions;
    private dateRange;
    endDate: Date;
    startDate: Date;

    private model;



    @ViewChild(PatientMedicationHistoryComponent)
    private medicationComponent: PatientMedicationHistoryComponent;

    @ViewChild(PatientCheckHistoryComponent)
    private checkHistoryComponent: PatientCheckHistoryComponent;

    @ViewChild(PatientDailyAverageObservationsComponent)
    private observationHistoryComponent: PatientDailyAverageObservationsComponent;

    constructor( ) { }

    ngOnInit(): void {

        this.startDate = new Date();
        this.endDate = new Date();

        this.startDate.setFullYear(this.endDate.getFullYear() - 1);

        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            firstDayOfWeek: "mo"
        };

        this.model = {
            beginDate: {
                year: this.startDate.getFullYear(),
                month: this.startDate.getMonth(),
                day: this.startDate.getDay()
            },
            endDate: {year: this.endDate.getFullYear(), month: this.endDate.getMonth(), day: this.endDate.getDay()}
        };


        
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        //console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
        //console.log('onDateRangeChanged(): Formatted: ', event.formatted);
        //console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);

        this.medicationComponent.refreshRange(event.beginJsDate, event.endJsDate);
        this.checkHistoryComponent.refreshRange(event.beginJsDate, event.endJsDate);
        this.observationHistoryComponent.refreshRange(event.beginJsDate, event.endJsDate);

    }
}
