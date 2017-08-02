import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientTreatmentHistoryComponent} from "./cards/patient-treatment-history.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {ConfigurationService} from "../../picaso-cd-common/_services/configuration.service";
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";
import {DataResourceBrowserCardComponent} from "../data-resource-browser/cards/data-resource-browser-card.component";
import {MoriskyDailyAverageObservationsComponent} from "./cards/patient-morisky-results.component";


@Component({
  templateUrl: 'clinician-manager.component.html',
  styleUrls: ['clinician-manager.component.css'],
})
export class ClinicianManagerComponent implements OnInit {


  private myDateRangePickerOptions: IMyOptions;
  private dateRange;
  endDate: Date;
  startDate: Date;

  private model;


  private showTab = 0;

  private range = "lastyear"; //show all
  private zoomAll = false;


  @ViewChild(PatientMedicationHistoryComponent)
  private medicationComponent: PatientMedicationHistoryComponent;

  @ViewChild(PatientTreatmentHistoryComponent)
  private treatmentsHistoryComponent: PatientTreatmentHistoryComponent;

  @ViewChild(PatientDailyAverageObservationsComponent)
  private observationHistoryComponent: PatientDailyAverageObservationsComponent;

  @ViewChild(MoriskyDailyAverageObservationsComponent)
  private moriskyComponent: MoriskyDailyAverageObservationsComponent;

  constructor(private config: ConfigurationService, private cdSharedModelService: CdSharedModelService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    //showTabStr = this.route.snapshot.queryParams["tab"];


    console.log("################parameter:", this.route.snapshot.queryParams["tab"]);

    if (this.showTab === null) {
      this.showTab = 0;
    }
    this.startDate = new Date();
    this.endDate = new Date();

    this.startDate.setFullYear(this.endDate.getFullYear() - 1);
    this.range = "lastyear";

    this.myDateRangePickerOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
      firstDayOfWeek: "mo",
      inline: false,
      height: '25px',
      selectionTxtFontSize: '15px',
      sunHighlight: true,
    };

    this.model = {
      beginDate: {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth(),
        day: this.startDate.getDay()
      },
      endDate: {year: this.endDate.getFullYear(), month: this.endDate.getMonth(), day: this.endDate.getDay()}
    };


  }

  focusLastWeek() {

    this.range = "lastweek";
    this.zoomAll = false;

    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 7);

    this.notifyDataChange(startDate, endDate);

  }

  focusLastMonth() {

    this.range = "lastmonth";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 31);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast2Months() {

    this.range = "last2months";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 61);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast6Months() {

    this.range = "last6months";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setDate(endDate.getDate() - 183);

    this.notifyDataChange(startDate, endDate);

  }

  focusNext6Months() {

    this.range = "next6months";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    endDate.setDate(startDate.getDate() + 183);

    this.notifyDataChange(startDate, endDate);

  }

  focusLastYear() {

    this.range = "lastyear";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setFullYear(endDate.getFullYear() - 1);

    this.notifyDataChange(startDate, endDate);

  }

  focusLast2Years() {

    this.range = "last2years";
    this.zoomAll = false;
    var endDate: Date = new Date();
    var startDate: Date = new Date();

    startDate.setFullYear(endDate.getFullYear() - 2);

    this.notifyDataChange(startDate, endDate);

  }

  focusAll() {

    this.zoomAll = true;
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
    this.zoomAll = false;
    this.notifyDataChange(event.beginJsDate, event.endJsDate);

  }


  notifyDataChange(startDate: Date, endDate: Date) {

    this.model.beginDate = startDate;
    this.model.endDate = endDate;
    this.medicationComponent.refreshRange(startDate, endDate);
    this.treatmentsHistoryComponent.refreshRange(startDate, endDate);
    this.observationHistoryComponent.refreshRange(startDate, endDate);
    this.moriskyComponent.refreshRange(startDate, endDate);

  }

}
