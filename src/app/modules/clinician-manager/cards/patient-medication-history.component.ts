import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
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
  medications: PatientMedication[];
  itemCounter: number;

  errorMessage: string;

  public visTimelineMedications: string = 'medicationTimelineGraph';
  public visTimelineItemsMedications: VisTimelineItems;
  public visTimelineMedicationsOptions: VisTimelineOptions;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoDataService) {
  }

  public ngOnInit(): void {
    this.visTimelineMedicationsOptions = {
      selectable: true,
      autoResize: true,
      showCurrentTime: true,
      //zoomMax: 61556926000, //year
      zoomMin: 86400000, //day
      clickToUse: false,
      rollingMode: null,//{follow:false, offset:0},
      start: this.dateRange.startDate,
      end: this.dateRange.endDate,
      height: 250,
      margin: {
        axis: 10,
        item: 10
      },
      showMajorLabels: true,
      showMinorLabels: true,
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
          week: 'w',
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
          week: 'MMMM YYYY',
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

  setMedicationsGraphData(): void {
    this.selectedId = null;
    this.selectedMedication = null;
    this.listOfItems = [];
    this.visTimelineItemsMedications = new VisTimelineItems([]);


    let counter: number = 0;

    for (let item of this.medications) {

      if (item.endDate === undefined || item.endDate === null) {
        this.visTimelineItemsMedications.add(
          {
            id: item.id,
            style: "background: #" + item.color,

            content: `<div>
                              <div class="w3-small"><b>${item.name} INTAKE</b></div>
                              <div class="w3-small">${item.dosage} </div>
                              </div>`
            ,
            start: item.startDate,
            type: 'box'
          });

      } else {

        this.visTimelineItemsMedications.add(
          {
            id: item.id,
            style: "background: #" + item.color,

            content: `<div>
                              <div class="w3-small"><b>${item.name} PRESCRIPTION</b></div>
                              <div class="w3-small">${item.dosage} - ${item.frequency} - ${item.stopReason}</div>
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
          type: "prescription"
        }
      );
      //console.log("prescript:", this.medications);
    }
    this.setMedicationsGraphData();
  }

  setMedicationIntakes(medications: MedicationIntakesResult[]): void {
    let i = 0;
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
          type: "intake"
        }
      );
      //console.log("intake:", this.medications);
    }
    this.setMedicationsGraphData();
  }

  getMedicationPrescriptions(): void {

    this.picasoDataService.getMedicationPrescriptionHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      medications => this.setMedicationPrescriptions(medications),
      error => this.errorMessage = <any>error);

  }

  getMedicationIntakes(): void {

    this.picasoDataService.getMedicationIntakeHistory(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
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
}
