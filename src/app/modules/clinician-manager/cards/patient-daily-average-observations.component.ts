import {Component, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientObservationGroup} from "../model/patient-observation-group";
import {PatientLoadProgress} from "../model/patient-loadprogress";

declare let d3, nv: any;


@Component({
  selector: "patient-daily-average-observations",
  template: require("./patient-daily-average-observations.component.html"),
  styles: [require("./patient-daily-average-observations.component.css")],
  providers: [PicasoDataService],

})

export class PatientDailyAverageObservationsComponent implements OnInit {

  errorMessage: string;

  endDate: Date;
  startDate: Date;

  options;
  data;
  showAllRight = false;
  showAllLeft = false;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };


  observationGroups: PatientObservationGroup[];


  constructor(private picasoDataService: PicasoDataService) {
  };

  ngOnInit(): void {

    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setFullYear(this.endDate.getFullYear() - 1);
    this.setOptions();
    this.getObservations();


  }

  getObservations(): void {


    this.picasoDataService.getObservations(
      this.startDate,
      this.endDate, this.progress
    ).subscribe(
      observations => {
        this.setPatientObservations(observations);
        this.reloadDataToGraph()
      },
      error => this.errorMessage = <any>error);


  }


  setOptions(): void {

    this.options = {
      chart: {
        noData: 'Choose some data series from choices above.',
        type: 'lineChart',
        height: 600,

        legendRightAxisHint: " (right axis)",
        interpolate: "linear",
        showLegend: false,
        legend: {
          align: false
        },

        //average: function(d) { return d.mean/100; },
        margin: {
          top: 55,
          right: 55,
          bottom: 55,
          left: 55
        },

        useInteractiveGuideline: true,

        x: function (d) {
          return new Date(d.x);
        },
        y: function (d) {
          return new Number(d.y);
        },


        xAxis: {
          //axisLabel: 'Time',
          tickFormat: function (d) {
            return new Date(d).toLocaleDateString();
          },
        },

        xDomain: [this.startDate.getTime(), this.endDate.getTime()],
        xRange: null,

        yAxis1: {
          //axisLabel: 'Value',
          tickFormat: function (d) {
            return d;
          },
          //axisLabelDistance: -10
        },
        yAxis2: {
          //axisLabel: 'Value',
          tickFormat: function (d) {
            return d;
          },
          //axisLabelDistance: -10
        },
        callback: function (chart) {
          //console.log("!!! lineChart callback !!!");
        }
      }
    };
  }

  setPatientObservations(observations: PatientObservationGroup[]) {

    this.observationGroups = observations;
    if (this.observationGroups !== undefined && this.observationGroups.length > 2) {
      this.observationGroups[0].showLeft = true;
      this.observationGroups[1].showLeft = true;
      this.observationGroups[2].showLeft = true;
    }

    this.reloadDataToGraph();

  }

  reloadDataToGraph() {


    this.data = [];

    for (var group of this.observationGroups) {

      if (group.showLeft) {


        var sortedValues = group.values.sort(function (a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        var newValues = [];


        var i = 0;
        for (var observation of sortedValues) {

          //newValues.push({x: i++, y: i});

          newValues.push({"x": new Date(observation.date).getTime(), "y": observation.value})
        }

        this.data.push({
          values: newValues,
          key: group.name + " / " + group.label,
          color: group.color,
          //area: false,
          //mean: 120,
          disabled: false,
          yAxis: 1,
          xAxis: 1,
          type: group.type
        })

      }
    }

    for (var group of this.observationGroups) {

      if (group.showRight) {

        var
          sortedValues = group.values.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

        var
          newValues = [];


        var
          i = 0;

        for (

          var
            observation
          of
          sortedValues
          ) {

          //newValues.push({x: i++, y: i});

          newValues
            .push({
                "x": new Date

                (
                  observation
                    .date
                ).getTime()

                ,
                "y": observation.value
              }
            )
        }

        this.data.push({
          values: newValues,
          key: group.name + " / " + group.label,
          color: group.color,
          disabled: false,
          //area: false,
          //mean: 120,
          yAxis: 2,
          xAxis: 1,
          type: group.type
        })

      }
    }

  }

  public
  refreshRange(start: Date, end: Date): void {

    this.startDate = start;
    this.endDate = end;

    this.options.chart.xDomain = [this.startDate.getTime(), this.endDate.getTime()];
    this.reloadDataToGraph();

  }

  public toggleLeft(id: string, name: string) {

    for (var i = 0; i < this.observationGroups.length; i++) {

      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showLeft = !this.observationGroups[i].showLeft;
        if (this.observationGroups[i].showLeft) {
          this.observationGroups[i].showRight = false;
          this.showAllRight = false;
        } else {
          this.showAllLeft = false;
        }
        break;
      }


    }
    this.reloadDataToGraph()

  }

  public toggleRight(id: string, name: string) {
    for (var i = 0; i < this.observationGroups.length; i++) {

      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showRight = !this.observationGroups[i].showRight;
        if (this.observationGroups[i].showRight) {
          this.observationGroups[i].showLeft = false;
          this.showAllLeft = false;
        } else {
          this.showAllRight = false;
        }
        break;
      }


    }

    this.reloadDataToGraph()
  }

  public resetLeft() {

    this.showAllLeft = !this.showAllLeft;
    if (this.showAllLeft) {
      this.showAllRight = true;
      this.resetRight()
    }
    for (var i = 0; i < this.observationGroups.length; i++) {

      this.observationGroups[i].showLeft = this.showAllLeft;
    }
    this.reloadDataToGraph()

  }

  public resetRight() {
    this.showAllRight = !this.showAllRight;
    if (this.showAllRight) {
      this.showAllLeft = true;
      this.resetLeft()
    }
    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showRight = this.showAllRight;
    }
    this.reloadDataToGraph()
  }


}
