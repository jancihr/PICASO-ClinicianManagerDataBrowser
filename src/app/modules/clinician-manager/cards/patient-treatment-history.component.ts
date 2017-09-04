import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineGroups, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientTreatment} from "../model/patient-treatment";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {CareProfessionalVisit} from "../model/generated-interfaces";


@Component({
  selector: 'patient-treatments',
  template: require('./patient-treatment-history.component.html'),
  styles: [
    require('./patient-treatment-history.component.css')
  ],
  providers: [VisTimelineService]
})

export class PatientTreatmentHistoryComponent implements OnInit, OnDestroy {


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

  progress3: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  progress4: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  progress5: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  progress6: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  progress7: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };

  selectedId: string;
  selectedTreatment: PatientTreatment;
  checks: PatientTreatment[];
  listOfItems: string[];

  itemCounter: number;

  errorMessage: string;

  public visTimelineTreatments: string = 'visTimelineGraph';
  public visTimelineItemsTreatments: VisTimelineItems;
  public visTimelineTreatmentsOptions: VisTimelineOptions;
  public visTimelineGroups: VisTimelineGroups;

  public constructor(private visTimelineService: VisTimelineService,
                     private picasoDataService: PicasoOdsCmDataService) {
  }

  public ngOnInit(): void {
    this.visTimelineGroups = new VisTimelineGroups();

    this.visTimelineGroups.add({id: 1, content: "Visits", className: "timeline-odd-group"});
    this.visTimelineGroups.add({id: 2, content: "Imaging", className: "timeline-even-group"});
    this.visTimelineGroups.add({id: 3, content: "Lab Test", className: "timeline-odd-group"});
    this.visTimelineGroups.add({id: 4, content: "Psych. Test", className: "timeline-even-group"});
    this.visTimelineGroups.add({id: 5, content: "Func. Diag.", className: "timeline-odd-group"});
    this.visTimelineGroups.add({id: 6, content: "Patient Rep.", className: "timeline-even-group"});
    this.visTimelineGroups.add({id: 7, content: "Questionnaires", className: "timeline-odd-group"});


    this.visTimelineTreatmentsOptions = {

      groupOrder: 'id',
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
    this.getChecks();


  }

  getChecks() {

    this.checks = [];
    this.itemCounter = 0;

    this.getVisits();
    this.getImaging();
    this.getLabTests();

    this.getPsychTests();
    this.getfunctionalDiag();
    this.getPatientReport();
    this.getQuestionFill();

  }

  close() {
    this.selectedTreatment = null;
  }

  openDetail() {
    if (!(this.selectedTreatment !== null && this.selectedTreatment.id === this.selectedId)) {

      for (let treatment of this.checks) {
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


    // HACK do not scroll vis timeline with mouse
    d3.selectAll("div.vis-panel.vis-center").on("wheel", function () {
      //console.log("mousewheel");
      (d3.event as Event).stopPropagation();
      //event.stopPropagation();
    }, true);

  }

  public refreshRange(start: Date, end: Date): void {
    this.close();
    this.visTimelineService.setWindow('visTimelineGraph', start, end);
  }


  setTreatmentsGraphData(closeDetail: boolean): void {

    if (closeDetail) {


      this.selectedId = null;
      this.selectedTreatment = null;
    }
    this.listOfItems = [];
    this.visTimelineItemsTreatments = new VisTimelineItems([]);

    let counter: number = 0;
    for (let item of this.checks) {
      if (item.endDate === undefined || item.endDate === null) {
        this.visTimelineItemsTreatments.add({
          group: item.categoryId,
          id: item.id,
          className: "treatment-item",
          style: this.isColourful ? ("background: " + item.color) : "",
          content: `<div>
                             <!-- <div class="timeline-item-header"><b>${item.category}</b></div>-->
                              <div class="timeline-item-header">${item.visitReason} </div>
                              </div>`,
          start: item.startDate,
          type: 'box'
        });
      }
      else {
        this.visTimelineItemsTreatments.add({
          id: item.id,
          group: item.categoryId,
          className: "treatment-item",
          content: `<div>
                             <!-- <div class="timeline-item-header"><b>${item.category}</b></div>-->
                              <div class="timeline-item-header">${item.visitReason} </div>
                              </div>`,

          start: item.startDate,
          end: item.endDate,
          style: this.isColourful ? ("background: " + item.color) : "",
        });
      }
      this.listOfItems.push(item.id);
    }
    // this.focusVisChecks();
  }


  setVisitTreatments(treatments: CareProfessionalVisit[]) {
    if (treatments) {
      for (let treatment of treatments) {

        this.checks.push(
          {
            startDate: treatment.date,
            endDate: null,
            id: "treat_" + this.itemCounter++,
            category: "Care professional",
            categoryId: 1,
            color: treatment.color,
            visitReason: treatment.careProfessional,
            visitResults: [{type: "Care professional result", result: treatment.result}]

          }
        );

      }
      this.setTreatmentsGraphData(true);
    }
  }

  setTreatment(treatments: any[], type: string, typeId: number) {
    if (treatments) {
      for (let treatment of treatments) {

        let visitReason: string = "";
        for (let result of treatment.results) {
          visitReason += (visitReason === "" ? "" : ", ") + result.type;
        }
        this.checks.push(
          {
            startDate: treatment.date,
            endDate: null,
            id: "treat_" + this.itemCounter++,
            categoryId: typeId,
            category: type,
            color: treatment.color,
            visitReason: visitReason,
            visitResults: treatment.results
          }
        );

      }
      this.setTreatmentsGraphData(true);
    }
  }


  getVisits(): void {
    this.progress1 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getProfessionalVisits(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress1
    ).subscribe(
      checks => this.setVisitTreatments(checks),
      error => this.errorMessage = <any>error);
  }

  getImaging(): void {
    this.progress2 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getImagingResults(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress2
    ).subscribe(
      checks => this.setTreatment(checks, "Imaging", 2),
      error => this.errorMessage = <any>error);
  }

  getLabTests(): void {
    this.progress3 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getLabTestResults(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress3
    ).subscribe(
      checks => this.setTreatment(checks, "Lab Tests", 3),
      error => this.errorMessage = <any>error);
  }

  getPsychTests() {
    this.progress4 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getPsychologicalNeurologicalTestsPerformedResults(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress4
    ).subscribe(
      checks => this.setTreatment(checks, "Psych. & neurol. tests", 4),
      error => this.errorMessage = <any>error);
  }

  getfunctionalDiag() {
    this.progress5 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getFunctionalDiagnosticsResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress5
    ).subscribe(
      checks => this.setTreatment(checks, "Functional diagnostics", 5),
      error => this.errorMessage = <any>error);
  }

  getPatientReport() {
    this.progress6 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getPatientReportedOutcomesResultResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress6
    ).subscribe(
      checks => this.setTreatment(checks, "Patient reported outcomes", 6),
      error => this.errorMessage = <any>error);
  }

  getQuestionFill() {
    this.progress7 = {
      percentage: 0,
      loaded: 0,
      total: 0
    };
    this.picasoDataService.getQuestionaryFilledResult(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress7
    ).subscribe(
      checks => this.setTreatment(checks, "Questionnaire taken", 7),
      error => this.errorMessage = <any>error);
  }

  public ngOnDestroy(): void {
    this.visTimelineService.off(this.visTimelineTreatments, 'click');
  }


  public focusVisChecks(): void {
    this.visTimelineService.focusOnIds(this.visTimelineTreatments, this.listOfItems)
  }

  toggleColor(): void {
    this.isColourful = !this.isColourful;
    this.setTreatmentsGraphData(false);
  }
}
