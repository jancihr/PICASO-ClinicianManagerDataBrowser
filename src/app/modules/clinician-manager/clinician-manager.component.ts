import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientTreatmentHistoryComponent} from "./cards/patient-treatment-history.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {ConfigurationService} from "../../picaso-cd-common/_services/configuration.service";
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";


@Component({
  templateUrl: 'clinician-manager.component.html',
  styleUrls: ['clinician-manager.component.css'],
})
export class ClinicianManagerComponent implements OnInit {


  private myDateRangePickerOptions: IMyOptions;
  private dateRange;

  allMeasurements;
  moriskyObservations = "morisky";

  showSeparate = false;

  //endDate: Date;
  //startDate: Date;

  private model;

  range = 'lastyear';
  private cardToShow = 'all';


  @ViewChild(PatientMedicationHistoryComponent)
  private medicationComponent: PatientMedicationHistoryComponent;

  @ViewChild(PatientTreatmentHistoryComponent)
  private treatmentsHistoryComponent: PatientTreatmentHistoryComponent;

  @ViewChildren(PatientDailyAverageObservationsComponent) observationHistoryComponents: QueryList<PatientDailyAverageObservationsComponent>;




  constructor(private config: ConfigurationService, private cdSharedModelService: CdSharedModelService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params: Params) => {
      this.cardToShow = params['card'];
      if (this.cardToShow === null || this.cardToShow === undefined) {
        this.cardToShow = 'all';
      }

      this.allMeasurements = params['measurement'];


      this.range = "lastyear";

      //this.notifyDataChange(this.startDate, this.endDate);
    });

    //showTabStr = this.route.snapshot.queryParams["tab"];


    //console.log("################parameter:", this.route.snapshot.queryParams["tab"]);


    var startDate = new Date();
    var endDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);
    this.range = "lastyear";
    this.notifyDataChange(startDate, endDate);


    if (this.cardToShow === undefined) {
      this.cardToShow = 'all';
    }

    this.myDateRangePickerOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
      firstDayOfWeek: "mo",
      inline: false,
      height: '25px',
      selectionTxtFontSize: '15px',
      sunHighlight: true,
    };

  }

  focusLastWeek() {

    this.range = "lastweek";


    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 7);

    this.notifyDataChange(startDate, endDate);

  }

  focusLastMonth() {

    this.range = "lastmonth";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 31);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast2Months() {

    this.range = "last2months";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 61);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast6Months() {

    this.range = "last6months";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 183);

    this.notifyDataChange(startDate, endDate);

  }

  focusNext6Months() {

    this.range = "next6months";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    endDate.setDate(startDate.getDate() + 183);

    this.notifyDataChange(startDate, endDate);

  }

  focusLastYear() {

    this.range = "lastyear";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setFullYear(endDate.getFullYear() - 1);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast2Years() {

    this.range = "last2years";

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setFullYear(endDate.getFullYear() - 2);

    this.notifyDataChange(startDate, endDate);

  }

  focusAll() {


    this.medicationComponent.focusVis();
    this.treatmentsHistoryComponent.focusVisChecks();
    // TODO this.observationHistoryComponent.refreshRange(all);

  }

  focusRange() {

    this.notifyDataChange(this.model.beginJsDate, this.model.endJsDate);

  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    //console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
    //console.log('onDateRangeChanged(): Formatted: ', event.formatted);
    //console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);

    this.range = "custom";

    this.notifyDataChange(event.beginJsDate, event.endJsDate);

  }


  notifyDataChange(startDate: Date, endDate: Date) {


    this.model = {
      beginDate: {
        year: startDate.getFullYear(),
        month: startDate.getMonth(),
        day: startDate.getDay()
      },
      endDate: {year: endDate.getFullYear(), month: endDate.getMonth(), day: endDate.getDay()}
    };

    //


    //this.model.beginDate = startDate;
    //this.model.endDate = endDate;

    if (this.cardToShow === 'medications' || this.cardToShow === 'all') {
      if (this.medicationComponent !== undefined) {
        this.medicationComponent.refreshRange(startDate, endDate);
      }
    }
    if (this.cardToShow === 'treatments' || this.cardToShow === 'all') {

      if (this.treatmentsHistoryComponent !== undefined) {
        this.treatmentsHistoryComponent.refreshRange(startDate, endDate);
      }
    }
    if (this.cardToShow === 'morisky' || this.cardToShow === 'observations' || this.cardToShow === 'all') {

      this.observationHistoryComponents.forEach((child) => {
        child.refreshRange(startDate, endDate)
      });

    }


  }

}
