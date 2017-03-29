import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import {NgDateRangePickerOptions} from "ng-daterangepicker";
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';


@Component({
    templateUrl: 'clinician-manager.component.html'
})
export class ClinicianManagerComponent implements OnInit {

    private options: NgDateRangePickerOptions;

    private myDateRangePickerOptions: IMyOptions;

    private model: any;

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
    }
}
