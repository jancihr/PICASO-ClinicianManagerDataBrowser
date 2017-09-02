import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineGroups, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientMedication} from "../model/patient-medication";

import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {MedicationIntakesResult, MedicationPrescriptionsResult} from "../model/generated-interfaces";


@Component({
  selector: 'medication-history',
  templateUrl: 'patient-medication-history.component.html',
  styleUrls: [
    'patient-medication-history.component.css'
  ],
  providers: [VisTimelineService]
})

export class PatientMedicationHistoryComponent implements OnInit, OnDestroy {

  @Input() dateRange: MyDateRange;

  animateToggle = true;
  isColourful = false;

  progress1: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };
  progress2: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  selectedId: string;
  selectedMedication: PatientMedication;
  listOfItems: string[];
  medications: PatientMedication[];
  itemCounter: number;

  errorMessage: string;

  public visTimelineMedications: string = 'medicationTimelineGraph';
  public visTimelineItemsMedications: VisTimelineItems;
  public visTimelineMedicationsOptions: VisTimelineOptions;
  public visTimelineGroups: VisTimelineGroups;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoOdsCmDataService) {
  }

  public ngOnInit(): void {

    this.visTimelineGroups = new VisTimelineGroups();

    this.visTimelineGroups.add({id: 1, content: "Prescriptions", className: "timeline-odd-group"});
    this.visTimelineGroups.add({id: 2, content: "Intakes", className: "timeline-even-group"});


    this.visTimelineMedicationsOptions = {
      selectable: true,
      autoResize: true,
      showCurrentTime: true,
      //zoomMax: 61556926000, //year
      zoomMin: 86400000, //day
      rollingMode: null,//{follow:false, offset:0},
      start: this.dateRange.startDate,
      end: this.dateRange.endDate,
      //minHeight: 270,
      //maxHeight: 200,
      margin: {
        axis: 10,
        item: 10
      },
      showMajorLabels: true,
      showMinorLabels: true,

      groupOrder: 'id',

      clickToUse: false,
      horizontalScroll: true,
      verticalScroll: false,
      zoomable: true,
      zoomKey: 'altKey',

      format: {
        minorLabels: {
          millisecond: 'SSS',
          second: 's',
          minute: 'HH:mm',
          hour: 'HH:mm',
          weekday: 'ddd D.M.',
          day: 'D.',
          month: 'MMM',
          year: 'YYYY'
        },
        majorLabels: {
          millisecond: 'HH:mm:ss',
          second: 'D.M. HH:mm',
          minute: 'ddd D.M.',
          hour: 'ddd D.M.',
          weekday: 'MMMM YYYY',
          day: 'MMMM YYYY',
          month: 'YYYY',
          year: ''
        }
      }
    };
    this.getMedications();
  }

  getMedications() {


    this.medications = [];
    this.itemCounter = 0;


    this.getMedicationIntakes();
    this.getMedicationPrescriptions()
  }

  close() {
    this.selectedMedication = null;
  }

  openDetail() {
    if (!(this.selectedMedication !== null && this.selectedMedication.id === this.selectedId)) {
      for (let medication of this.medications) {
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
    this.close();
    this.visTimelineService.setWindow('medicationTimelineGraph', start, end);
  }

  setMedicationsGraphData(closeDetail: boolean): void {
    if (closeDetail) {

      this.selectedId = null;
      this.selectedMedication = null;
    }
    this.listOfItems = [];
    this.visTimelineItemsMedications = new VisTimelineItems([]);


    let counter: number = 0;

    if (this.medications)
      for (let item of this.medications) {

        if (item.endDate === undefined || item.endDate === null) {
          this.visTimelineItemsMedications.add(
            {
              id: item.id,
              group: 1,
              className: "medication-item",
              style: this.isColourful ? ("background: " + item.color) : "",

              content: `<div>
                              <div class="timeline-item-header">${item.name} </div>
                              <div class="timeline-item-content">${item.dosage} </div>
                              </div>`
              ,
              start: item.startDate,
              type: 'box'
            });

        } else {

          this.visTimelineItemsMedications.add(
            {
              id: item.id,
              group: 2,
              style: this.isColourful ? ("background: " + item.color) : "",
              className: "medication-item",

              content: `<div>
                              <div class="timeline-item-header">${item.name}</div>
                              <div class="timeline-item-content">${item.dosage} - ${item.frequency} - ${item.stopReason}</div>
                              </div>`
              ,
              start: item.startDate,
              end: item.endDate
            });
        }

        this.listOfItems.push(item.id);
      }


    // this.focusVis();


  }

  setMedicationPrescriptions(medications: MedicationPrescriptionsResult[]): void {
    let i = 0;
    if (medications) {
      for (let prescription of medications) {
        this.medications.push(
          {
            id: "graphItem" + this.itemCounter++,
            name: prescription.name,
            startDate: prescription.startDate,
            endDate: prescription.endDate,
            dosage: prescription.dosage,
            frequency: prescription.frequency,
            stopReason: prescription.stopReason,
            color: prescription.color,
            disease: prescription.disease,
            prescribedBy: prescription.prescribedBy,
            type: "prescription",
            typeId: 1
          }
        );
        //console.log("prescript:", this.medications);
      }
      this.setMedicationsGraphData(true);
    }
  }

  setMedicationIntakes(medications: MedicationIntakesResult[]): void {
    let i = 0;
    if (medications) {
      for (let prescription of medications) {
        this.medications.push(
          {
            id: "graphItem" + this.itemCounter++,
            name: prescription.name,
            startDate: prescription.date,
            endDate: null,
            dosage: prescription.dosage,
            frequency: null,
            stopReason: null,
            color: prescription.color,
            disease: prescription.disease,
            prescribedBy: prescription.prescribedBy,
            type: "intake",
            typeId: 2
          }
        );
        //console.log("intake:", this.medications);
      }
      this.setMedicationsGraphData(true);
    }
  }

  getMedicationPrescriptions(): void {
    this.progress1 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getMedicationPrescriptionHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress1
    ).subscribe(
      medications => this.setMedicationPrescriptions(medications),
      error => this.errorMessage = <any>error);

  }

  getMedicationIntakes(): void {
    this.progress2 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getMedicationIntakeHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress2
    ).subscribe(
      medications => this.setMedicationIntakes(medications),
      error => this.errorMessage = <any>error);

  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimelineMedications, 'click');
  }


  public focusVis(): void {
    this.visTimelineService.focusOnIds(this.visTimelineMedications, this.listOfItems)
  }

  toggleColor(): void {
    this.isColourful = !this.isColourful;
    this.setMedicationsGraphData(false);
  }

}
