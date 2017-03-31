import {Component, OnInit, OnDestroy} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientCheck} from "../model/patient-check";
import {IMyDateRangeModel} from "mydaterangepicker";

@Component({
    selector: 'patient-checks',
    template: require('./patient-check-history.component.html'),
    styles: [
        require('./patient-check-history.component.css')
    ],
    providers: [PicasoDataService, VisTimelineService]
})

export class PatientCheckHistoryComponent implements OnInit, OnDestroy {


    public startDate: Date;
    public endDate: Date;

    selectedItem: string;

    listOfItems: string[];

    errorMessage: string;
    checks: PatientCheck[];

    public visTimelineChecks: string = 'visTimelineGraph';
    public visTimelineItemsChecks: VisTimelineItems;
    public visTimelineChecksOptions: VisTimelineOptions;

    public constructor(private visTimelineService: VisTimelineService,
                       private picasoDataService: PicasoDataService) {
    }

    public timelineInitialized(): void {
        // console.log('timeline initialized');

        // now we can use the service to register on events
        this.visTimelineService.on(this.visTimelineChecks, 'click');

    }

    public refreshRange(range: IMyDateRangeModel): void {


        this.visTimelineService.setWindow('visTimelineGraph', range.beginJsDate, range.endJsDate);


    }


    public ngOnInit(): void {

        //this.selectedItem = '';
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setFullYear(this.endDate.getFullYear() - 1);

        this.getChecks();


        this.visTimelineItemsChecks = new VisTimelineItems([]);


        this.visTimelineChecksOptions = {
            selectable: true,
            showCurrentTime: true,
            //zoomMax: 61556926000, //year
            zoomMin: 86400000, //day
            clickToUse: true
        };

    }


    setChecks(checks: PatientCheck[]): void {


        this.checks = checks;

        this.visTimelineItemsChecks = new VisTimelineItems([]);


        this.listOfItems = [];
        for (var item of checks) {
            if (item.endDate === undefined)
                this.visTimelineItemsChecks.add({
                    id: item.id,
                    style: "background: #" + item.color,
                    content: `<div>
                    <div class="w3-large">${item.clinician}</div>
                    <div class="w3-small">${item.visitReason} </div>
                    </div>`,
                    start: item.startDate,
                    type: 'box'
                });
            else
                this.visTimelineItemsChecks.add({
                    id: item.id,
                    content: `<div>
    <div class="w3-large">${item.clinician}</div>
    <div class="w3-small">${item.visitReason} </div>
    
</div>`,

                    start: item.startDate,
                    end: item.endDate,
                    style: "background: #" + item.color,

                    //type: 'point'
                });

            this.listOfItems.push(item.id);

        }


        var today = new Date();
        var yearsAgo = new Date();
        yearsAgo.setFullYear(today.getFullYear() - 2);

        this.visTimelineChecksOptions.start = yearsAgo;
        this.visTimelineChecksOptions.end = today;

    }

    getChecks(): void {

        this.picasoDataService.getCheckHistory(
            this.startDate,
            this.endDate
        ).subscribe(
            checks => this.setChecks(checks),
            error => this.errorMessage = <any>error);

    }

    public ngOnDestroy(): void {
        //this.visTimelineService.off(this.visTimelineChecks, 'click');
    }


    public focusVisChecks(): void {

        this.visTimelineService.focusOnIds(this.visTimelineChecks, this.listOfItems)
    }
}