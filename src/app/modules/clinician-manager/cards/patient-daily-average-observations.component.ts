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
        noData: 'No data exists for selected dates and observations.',
        type: 'lineChart',
        height: 600,
        transitionDuration: 500,

        zoom: {
          enabled: true,
          scaleExtent: [
            1,
            10
          ],
          useFixedDomain: true,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: false,
          unzoomEventType: "dblclick.zoom"
        },

        legendRightAxisHint: " (right axis)",
        interpolate: "linear",
        showLegend: false,
        legend: {
          align: false
        },
        //showDistX: true,
        //showDistY: true,

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
          return d.y === null ? null : new Number(d.y);
        },


        xAxis: {
          //axisLabel: 'Time',
          tickFormat: function (d) {
            return new Date(d).toLocaleDateString();
          },
        },

        xDomain: [this.startDate.getTime(), this.endDate.getTime()],
        xRange: null,

        interactiveLayer: {
          tooltip: {
            contentGenerator: function (d) {
              var html = d.value;

              d.series.forEach(function (elem) {
                html += "<div style='color:" + elem.color + "'>"
                  + elem.key + "</div> : <b>" + (elem.value === null ? "Missing value" : elem.value) + "</b>";
              });

              return html;
            }
          }
        },

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


        var filteredValues = [];

        for (var el of group.values) {

          //console.log("gettime" + new Date(el.date).getTime());

          if (new Date(el.date).getTime() < this.startDate.getTime() || new Date(el.date).getTime() > this.endDate.getTime()) {
          }
          else {
            filteredValues.push(el)
          }
        }

        if (filteredValues.length > 0) {


          var sortedValues = filteredValues.sort(function (a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });


          var newGraphValues = [];


        var i = 0;
        for (var observation of sortedValues) {

          //newValues.push({x: i++, y: i});

          newGraphValues.push({"x": new Date(observation.date).getTime(), "y": observation.value})

          //if (observation.value === null) console.log("found null");

          //console.log( group.name + " / " + group.label + " " +
          // observation.date + " " + observation.value);
        }

        this.data.push({
          values: newGraphValues,
          key: group.name + " / " + group.label,
          color: group.color,
          //area: false,
          //mean: 120,
          disabled: false,
          yAxis: 1,
          xAxis: 1,
          type: 'line'//group.type
        })

        }
      }
    }
    /*
    for (var group of this.observationGroups) {

      if (group.showRight) {

     var filteredValues2 = [];

     for (var el of group.values){
     if (el.date<this.startDate || el.date>this.endDate) {}
     else {filteredValues2.push(el)}
     }

     var sortedValues2 = filteredValues2.sort(function (a, b) {
     return new Date(a.date).getTime() - new Date(b.date).getTime();
     });

        var
     newValues2 = [];


        var
          i = 0;

        for (

          var
            observation
          of
     sortedValues2
          ) {

          //newValues.push({x: i++, y: i});

     newValues2
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
     values: newValues2,
          key: group.name + " / " + group.label,
          color: group.color,
          disabled: false,
          //area: false,
          //mean: 120,
          yAxis: 2,
          xAxis: 1,
     type: 'line'
     //type: group.type
        })

      }
    }

     */

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
