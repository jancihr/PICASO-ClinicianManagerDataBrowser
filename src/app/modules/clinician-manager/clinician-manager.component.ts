import {Component, OnInit, ViewChild}    from '@angular/core';
import { Router }               from '@angular/router';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientCheckHistoryComponent} from "./cards/patient-check-history.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {ConfigurationService} from "../../picaso-cd-common/_services/configuration.service";
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";
import {DataResourceBrowserCardComponent} from "../data-resource-browser/cards/data-resource-browser-card.component";


@Component({
    templateUrl: 'clinician-manager.component.html',
    styleUrls: ['clinician-manager.component.css'],
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

    constructor(private config: ConfigurationService, private cdSharedModelService: CdSharedModelService) {
    }

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

    focusLastWeek() {

        var endDate: Date = new Date();
        var startDate: Date = new Date();

        startDate.setDate(endDate.getDate() - 7);

        this.notifyDataChange(startDate, endDate);

    }

    focusLastMonth() {
        var endDate: Date = new Date();
        var startDate: Date = new Date();

        startDate.setDate(endDate.getDate() - 31);

        this.notifyDataChange(startDate, endDate);

    }

    focusLastYear() {
        var endDate: Date = new Date();
        var startDate: Date = new Date();

        startDate.setFullYear(endDate.getFullYear() - 1);

        this.notifyDataChange(startDate, endDate);

    }

    focusAll() {

        this.medicationComponent.focusVis();
        this.checkHistoryComponent.focusVisChecks();
        // TODO this.observationHistoryComponent.refreshRange(all);

    }

    focusRange() {

        this.notifyDataChange(this.model.beginJsDate, this.model.endJsDate);

    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        //console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
        //console.log('onDateRangeChanged(): Formatted: ', event.formatted);
        //console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);

        this.notifyDataChange(event.beginJsDate, event.endJsDate);

    }


    notifyDataChange(startDate: Date, endDate: Date) {
        this.model.beginDate = startDate;
        this.model.endDate = endDate;
        this.medicationComponent.refreshRange(startDate, endDate);
        this.checkHistoryComponent.refreshRange(startDate, endDate);
        this.observationHistoryComponent.refreshRange(startDate, endDate);
    }

}
