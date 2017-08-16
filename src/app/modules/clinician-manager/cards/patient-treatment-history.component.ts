import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientTreatment} from "../model/patient-treatment";

import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {PatientInClinicTreatment} from "../model/patient-in-clinic-treatment";
import {PatientOutClinicTreatment} from "../model/patient-out-clinic-treatment";
import {PatientLabTest} from "../model/patient-lab-test";
import {PatientImaging} from "../model/patient-imaging";

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
  checks: PatientTreatment[];
  listOfItems: string[];

  errorMessage: string;

  public visTimelineTreatments: string = 'visTimelineGraph';
  public visTimelineItemsTreatments: VisTimelineItems;
  public visTimelineTreatmentsOptions: VisTimelineOptions;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoDataService) {
  }

  public ngOnInit(): void {
    this.visTimelineTreatmentsOptions = {
      selectable: true,
      showCurrentTime: true,
      //zoomMax: 61556926000, //year
      zoomMin: 86400000, //day
      clickToUse: true,
      rollingMode: null,//{follow:false, offset:0},
      start: this.dateRange.startDate,
      end: this.dateRange.endDate
    };
    this.getChecks();
  }

  getChecks() {

    this.checks = [];

    this.getInClinicTreatments();
    this.getOutClinicTreatments();
    this.getImaging();
    this.getLabTests();
  }

  close() {
    this.selectedTreatment = null;
  }

  openDetail() {
    if (!(this.selectedTreatment !== null && this.selectedTreatment.id === this.selectedId)) {

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


  setTreatmentsGraphData(): void {

    this.selectedId = null;
    this.selectedTreatment = null;
    this.listOfItems = [];
    this.visTimelineItemsTreatments = new VisTimelineItems([]);

    for (let item of this.checks) {
      if (item.endDate === undefined || item.endDate === null) {
        this.visTimelineItemsTreatments.add({
          id: item.id,
          style: "background: " + item.color,
          content: `<div>
                              <div class="w3-small"><b>${item.category}</b></div>
                              <div class="w3-small">${item.visitReason} </div>
                              </div>`,
          start: item.startDate,
          type: 'box'
        });
      }
      else {
        this.visTimelineItemsTreatments.add({
          id: item.id,
          content: `<div>
                              <div class="w3-small"><b>${item.category}</b></div>
                              <div class="w3-small">${item.visitReason} </div>
                              </div>`,

          start: item.startDate,
          end: item.endDate,
          style: "background: " + item.color,
        });
      }
      this.listOfItems.push(item.id);
    }
    // this.focusVisChecks();
  }


  setInClinicTreatments(treatments: PatientInClinicTreatment[]) {
    for (let treatment of treatments) {
      let commonTreatment = new PatientTreatment();
      commonTreatment.startDate = treatment.startDate;
      commonTreatment.endDate = treatment.endDate;
      commonTreatment.id = "IN_" + treatment.id;
      commonTreatment.category = "In Clinic Treatment";
      commonTreatment.color = treatment.color;
      commonTreatment.visitReason = treatment.visitReason;
      commonTreatment.visitResults = treatment.details;
      this.checks.push(commonTreatment);

      console.log("inclinic:", commonTreatment);
    }
    this.setTreatmentsGraphData();
  }

  setOutClinicTreatments(treatments: PatientOutClinicTreatment[]) {
    for (let treatment of treatments) {
      let commonTreatment = new PatientTreatment();
      commonTreatment.startDate = treatment.startDate;
      commonTreatment.endDate = null;
      commonTreatment.id = "OUT_" + treatment.id;
      commonTreatment.category = "Out Clinic Treatment";
      commonTreatment.color = treatment.color;
      commonTreatment.visitReason = treatment.visitReason;
      commonTreatment.visitResults = treatment.details;
      this.checks.push(commonTreatment);
      console.log("outclinic:", commonTreatment);
    }
    this.setTreatmentsGraphData();
  }

  setLabTests(treatments: PatientLabTest[]) {
    for (let treatment of treatments) {
      let commonTreatment = new PatientTreatment();
      commonTreatment.startDate = treatment.startDate;
      commonTreatment.endDate = null;
      commonTreatment.id = "LAB_" + treatment.id;
      commonTreatment.category = "Lab Test";
      commonTreatment.color = treatment.color;
      commonTreatment.visitReason = treatment.visitReason;
      commonTreatment.visitResults = null;
      this.checks.push(commonTreatment);
    }
    this.setTreatmentsGraphData();
  }

  setImaging(treatments: PatientImaging[]) {
    for (let treatment of treatments) {
      let commonTreatment = new PatientTreatment();
      commonTreatment.startDate = treatment.startDate;
      commonTreatment.endDate = null;
      commonTreatment.id = "IMG_" + treatment.id;
      commonTreatment.category = "Imaging";
      commonTreatment.color = treatment.color;
      commonTreatment.visitReason = treatment.visitReason;
      commonTreatment.visitResults = null;
      this.checks.push(commonTreatment);
    }
    this.setTreatmentsGraphData();
  }


  getInClinicTreatments(): void {
    this.picasoDataService.getInClinicTreatmentsResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      checks => this.setInClinicTreatments(checks),
      error => this.errorMessage = <any>error);
  }

  getOutClinicTreatments(): void {
    this.picasoDataService.getOutClinicTreatmentsResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      checks => this.setOutClinicTreatments(checks),
      error => this.errorMessage = <any>error);
  }

  getImaging(): void {
    this.picasoDataService.getImagingResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      checks => this.setImaging(checks),
      error => this.errorMessage = <any>error);
  }

  getLabTests(): void {
    this.picasoDataService.getLabtestResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      checks => this.setLabTests(checks),
      error => this.errorMessage = <any>error);
  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimelineTreatments, 'click');
  }


  public focusVisChecks(): void {
    this.visTimelineService.focusOnIds(this.visTimelineTreatments, this.listOfItems)
  }
}
