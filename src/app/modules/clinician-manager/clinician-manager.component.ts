import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import {NgDateRangePickerOptions} from "ng-daterangepicker";

@Component({
    templateUrl: 'clinician-manager.component.html'
})
export class ClinicianManagerComponent implements OnInit {

    options: NgDateRangePickerOptions;

    constructor( ) { }

    ngOnInit(): void {

        this.options = {
            theme: 'default',
            range: 'tm',
            dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
            dateFormat: 'yMd',
            outputFormat: 'DD.MM.YYYY',
            startOfWeek: 1
        };
        
    }
}
