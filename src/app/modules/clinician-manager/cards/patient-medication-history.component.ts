import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineItem, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientMedication} from "../model/patient-medication";

import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";

@Component({
  selector: 'medication-history',
  templateUrl: 'patient-medication-history.component.html',
  styleUrls: [
    'patient-medication-history.component.css'
  ],
  providers: [PicasoDataService, VisTimelineService]
})

export class PatientMedicationHistoryComponent implements OnInit, OnDestroy {

  @Input() dateRange: MyDateRange;

  animateToggle = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  selectedId: string;
  selectedMedication: PatientMedication;

  listOfItems: string[];

  errorMessage: string;
  medications: PatientMedication[];


  public visTimelineMedications: string = 'medicationTimelineGraph';
  public visTimelineItemsMedications: VisTimelineItems;
  public visTimelineMedicationsOptions: VisTimelineOptions;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoDataService) {
  }

  public ngOnInit(): void {

    //this.selectedItem = '';


    this.getMedications();


    this.visTimelineItemsMedications = new VisTimelineItems([]);


    this.visTimelineMedicationsOptions = {
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
    this.selectedMedication = undefined;
  }

  openDetail() {
    if (!(this.selectedMedication !== undefined && this.selectedMedication.id === this.selectedId)) {
      for (var medication of this.medications) {
        if (medication.id === this.selectedId) {
          this.animateToggle = !this.animateToggle;
          this.selectedMedication = medication;
          break
        }
      }
    }

  }

  public timelineInitialized(): void {
    // console.log('timeline initialized');

    // now we can use the service to register on events
    this.visTimelineService.on(this.visTimelineMedications, 'click');

    this.visTimelineService.click
      .subscribe((eventData: any[]) => {
        if (eventData[0] === this.visTimelineMedications) {
          //console.log(itemId);
          //console.log(this.selectedItem);
          this.selectedId = eventData[1].item;
          //console.log("itemid: ", eventData[1].item);
          if (eventData[1].item !== null) this.openDetail();


        }
      });
  }


  public refreshRange(start: Date, end: Date): void {

    this.visTimelineService.setWindow('medicationTimelineGraph', start, end);

  }


  setMedications(medications: PatientMedication[]): void {

    this.medications = medications;

    this.visTimelineItemsMedications = new VisTimelineItems([]);


    this.listOfItems = [];
    for (var item of medications) {


      var vistimelineitem: VisTimelineItem;

      this.visTimelineItemsMedications.add(
        {
          id: item.id,
          style: "background: #" + item.color,

          content: `<div>
                              <div class="w3-small"><b>${item.name}</b></div>
                              <div class="w3-small">${item.dosage} - ${item.frequency} - ${item.stopReason}</div>
                              </div>`
          ,
          start: item.startDate,
          end: item.endDate
        });
      //vistimelineitem.className = " w3-border w3-border-lime w3-round-large";

      this.listOfItems.push(item.id);
    }


    // this.focusVis();


  }

  getMedications(): void {

    this.picasoDataService.getMedicationHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      medications => this.setMedications(medications),
      error => this.errorMessage = <any>error);

  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimelineMedications, 'click');
  }


  public focusVis(): void {

    this.visTimelineService.focusOnIds(this.visTimelineMedications, this.listOfItems)
  }
}
