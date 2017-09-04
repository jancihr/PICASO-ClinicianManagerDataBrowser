import {Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientTreatmentHistoryComponent} from "./cards/patient-treatment-history.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {ConfigurationService} from "../../picaso-cd-common/_services/configuration.service";
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";
import {CookieService} from "ngx-cookie";
import {MyDateRange} from "./cards/patient-range-picker.component";
import {PatientLoadProgress} from "./model/patient-loadprogress";
import {PicasoOdsCmDataService} from "./service/picaso-data.service";


@Component({
  templateUrl: 'clinician-manager.component.html',
  styleUrls: ['clinician-manager.component.css']
})
export class ClinicianManagerComponent implements OnInit {


  private myDateRangePickerOptions: IMyOptions;

  //private dateRange;

  measurementToShow;

  range: MyDateRange = null; //= 'lastyear';
  private cardToShow = 'all';


  @ViewChild(PatientMedicationHistoryComponent)
  private medicationComponent: PatientMedicationHistoryComponent;

  @ViewChild(PatientTreatmentHistoryComponent)
  private treatmentsHistoryComponent: PatientTreatmentHistoryComponent;

  @ViewChildren(PatientDailyAverageObservationsComponent) observationHistoryComponents: QueryList<PatientDailyAverageObservationsComponent>;

  constructor(private config: ConfigurationService,
              private cdSharedModelService: CdSharedModelService,
              private activatedRoute: ActivatedRoute,
              private _cookieService: CookieService) {
  }


  ngOnInit(): void {



//TODO cookies to preserve selected ranges


    //this._cookieService.put("clinician.dashboard.range", this.rangeToShow);
    //console.log("cookie", this._cookieService.get("clinician.dashboard.card"));




    this.activatedRoute.params.subscribe((params: Params) => {
      this.cardToShow = params['card'];
      if (this.cardToShow === null || this.cardToShow === undefined) {
        this.cardToShow = 'all';
      }
      this.measurementToShow = params['measurement'];

      let rangeFromURLParam = params['range'];
      if (!rangeFromURLParam === null && !rangeFromURLParam === undefined) {

        this.range = this.computeRangeFromString(rangeFromURLParam);
      } else if (this.range === null) {
        this.range = this.computeRangeFromString("last2months");
      }


    });

    //var startDate = new Date();
    //var endDate = new Date();
    //startDate.setFullYear(endDate.getFullYear() - 1);
    //this.rangeToShow = "lastyear";
    //this.notifyChildrenAboutDataChange(startDate, endDate);


    if (this.cardToShow === undefined) {
      this.cardToShow = 'all';
    }


  }


  //fired from events of date picker
  rangeChanged(range: MyDateRange) {
    if (this.range.range !== range.range
      || this.range.startDate.getTime() !== range.startDate.getTime()
      || this.range.endDate.getTime() !== range.endDate.getTime()) {
      this.range = range;
      this.notifyChildrenAboutDataChange(this.range.startDate, this.range.endDate);
    }
  }


  // not used. shows all values available in graph
  focusAll() {
    this.medicationComponent.focusVis();
    this.treatmentsHistoryComponent.focusVisChecks();
  }

  notifyChildrenAboutDataChange(startDate: Date, endDate: Date) {

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
    if (this.cardToShow === 'morisky' || this.cardToShow === 'observations' || this.cardToShow === 'observations-single' || this.cardToShow === 'all') {

      if (this.observationHistoryComponents !== undefined) {
        this.observationHistoryComponents.forEach((child) => {
          //child.refreshRange(startDate, endDate)
        });
      }
    }


  }


  computeRangeFromString(rangeStr: string): MyDateRange {

    var endDate = new Date();
    var startDate = new Date();

    if (rangeStr === "lastweek") {

      startDate.setTime(endDate.getTime() - 604800000);
    }

    else if (rangeStr === 'lastmonth') {

      startDate.setTime(endDate.getTime() - 2678400000);
    }

    else if (rangeStr === 'last2months') {

      startDate.setTime(endDate.getTime() - 5270400000);
    }

    else if (rangeStr === 'last6months') {

      startDate.setTime(endDate.getTime() - 15778476000);
    }

    else if (rangeStr === 'next6months') {

      endDate.setTime(startDate.getTime() + 15778476000);
    }

    else if (rangeStr === 'lastyear') {

      startDate.setTime(endDate.getTime() - 31556952000);
    }

    else if (rangeStr === 'last2years') {

      startDate.setTime(endDate.getTime() - 63113904000);
    }

    return {
      startDate: startDate,
      endDate: endDate,
      range: rangeStr
    };
  }

  refresh() {
    sessionStorage.removeItem("temporaryCmServiceResult");
  }


}
