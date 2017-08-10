import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientTreatment} from "../model/patient-treatment";

import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";

@Component({
  selector: 'patient-treatments',
  template: require('./patient-treatment-history.component.html'),
  styles: [
    require('./patient-treatment-history.component.css')
  ],
  providers: [PicasoDataService, VisTimelineService]
})

export class PatientTreatmentHistoryComponent implements OnInit, OnDestroy {


  @Input() dateRange: MyDateRange;

  animateToggle = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  selectedId: string;
  selectedTreatment: PatientTreatment;

  listOfItems: string[];

  errorMessage: string;
  checks: PatientTreatment[];

  public visTimelineTreatments: string = 'visTimelineGraph';
  public visTimelineItemsTreatments: VisTimelineItems;
  public visTimelineTreatmentsOptions: VisTimelineOptions;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoDataService) {
  }

  public ngOnInit(): void {

    //this.selectedItem = '';

    this.getChecks();


    this.visTimelineItemsTreatments = new VisTimelineItems([]);


    this.visTimelineTreatmentsOptions = {
      selectable: true,
      showCurrentTime: true,
      //zoomMax: 61556926000, //year
      zoomMin: 86400000, //day
      clickToUse: true,
      rollingMode: true,//{follow:false, offset:0},
      start: this.dateRange.startDate,
      end: this.dateRange.endDate
    };

  }

  close() {
    this.selectedTreatment = undefined;
  }

  openDetail() {


    if (!(this.selectedTreatment !== undefined && this.selectedTreatment.id === this.selectedId)) {

      for (var treatment of this.checks) {
        if (treatment.id === this.selectedId) {

          this.animateToggle = !this.animateToggle;
          this.selectedTreatment = treatment;
          break
        }

      }
    }


  }

  public timelineInitialized(): void {
    // console.log('timeline initialized');

    // now we can use the service to register on events
    this.visTimelineService.on(this.visTimelineTreatments, 'click');


    this.visTimelineService.click
      .subscribe((eventData: any[]) => {
        if (eventData[0] === this.visTimelineTreatments) {
          //console.log(itemId);
          //console.log(this.selectedItem);
          this.selectedId = eventData[1].item;
          //console.log("itemid: ", eventData[1].item);
          if (eventData[1].item !== null) this.openDetail();
        }
      });

  }

  public refreshRange(start: Date, end: Date): void {

    this.visTimelineService.setWindow('visTimelineGraph', start, end);


  }


  setChecks(checks: PatientTreatment[]): void {


    this.checks = checks;

    this.visTimelineItemsTreatments = new VisTimelineItems([]);


    this.listOfItems = [];
    for (var item of checks) {
      if (item.endDate === undefined)

        this.visTimelineItemsTreatments.add({
          id: item.id,
          style: "background: #" + item.color,
          content: `<div>
                              <div class="w3-small"><b>${item.category}</b></div>
                              <div class="w3-small">${item.visitReason} </div>
                              </div>`,
          start: item.startDate,
          type: 'box'
        });
      else
        this.visTimelineItemsTreatments.add({
          id: item.id,
          content: `<div>
                              <div class="w3-small"><b>${item.category}</b></div>
                              <div class="w3-small">${item.visitReason} </div>
                              </div>`,

          start: item.startDate,
          end: item.endDate,
          style: "background: #" + item.color,

          //type: 'point'
        });

      this.listOfItems.push(item.id);

    }


    // this.focusVisChecks();

  }

  getChecks(): void {

    this.picasoDataService.getTreatmentsHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      checks => this.setChecks(checks),
      error => this.errorMessage = <any>error);

  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimelineTreatments, 'click');
  }


  public focusVisChecks(): void {

    this.visTimelineService.focusOnIds(this.visTimelineTreatments, this.listOfItems)
  }
}
