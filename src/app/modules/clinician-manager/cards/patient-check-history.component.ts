import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientCheck} from "../model/patient-check";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    selector: 'patient-checks',
    template: require('./patient-check-history.component.html'),
    styles: [
        require('./patient-check-history.component.css')
    ],
    providers: [PicasoDataService, VisTimelineService]
})

export class PatientCheckHistoryComponent implements OnInit, OnDestroy {
    @ViewChild('myCheckModal')
    myModal: ModalComponent;

    close() {
        this.myModal.close();
    }

    openModal() {
        for (var check of this.checks) {
            if (check.id === this.selectedId) {
                this.selectedCheck = check;
                break
            }
        }

        this.myModal.open();
    }

    public startDate: Date;
    public endDate: Date;

    selectedItem: string;
    selectedId: string;
    selectedCheck: PatientCheck;

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


        this.visTimelineService.click
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visTimelineChecks) {



                    //console.log(itemId);
                    //console.log(this.selectedItem);


                    this.selectedId = eventData[1].item;
                    //console.log("itemid: ", eventData[1].item);
                    if (eventData[1].item !== null) this.openModal();


                }
            });

    }

    public refreshRange(start: Date, end: Date): void {


        this.visTimelineService.setWindow('visTimelineGraph', start, end);


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