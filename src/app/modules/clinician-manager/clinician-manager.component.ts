import {Component, OnInit, ViewChild}    from '@angular/core';
import { Router }               from '@angular/router';
import {NgDateRangePickerOptions} from "ng-daterangepicker";
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientCheckHistoryComponent} from "./cards/patient-check-history.component";


@Component({
    templateUrl: 'clinician-manager.component.html'
})
export class ClinicianManagerComponent implements OnInit {

    private options: NgDateRangePickerOptions;

    private myDateRangePickerOptions: IMyOptions;

    private model: any;

    @ViewChild(PatientMedicationHistoryComponent)
    private medicationComponent: PatientMedicationHistoryComponent;

    @ViewChild(PatientCheckHistoryComponent)
    private checkHistoryComponent: PatientCheckHistoryComponent;

    constructor( ) { }

    ngOnInit(): void {
        // Initialized to specific date (09.10.2018).
        this.model = {date: {year: 2017, month: 10, day: 9}};

        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            firstDayOfWeek: "mo"

        };
        
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
        console.log('onDateRangeChanged(): Formatted: ', event.formatted);
        console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);

        this.medicationComponent.refreshRange(event);
        this.checkHistoryComponent.refreshRange(event);

    }
}
