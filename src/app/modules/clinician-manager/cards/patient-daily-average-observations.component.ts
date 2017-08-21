import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {ObservationResult} from "../model/generated-interfaces";
import {ActivatedRoute, Params} from "@angular/router";


declare let d3, nv: any;


@Component({
  selector: "patient-daily-average-observations",
  template: require("./patient-daily-average-observations.component.html"),
  styles: [require("./patient-daily-average-observations.component.css")],
  providers: [PicasoDataService]

})

export class PatientDailyAverageObservationsComponent implements OnInit {

  @Input() forMeasurements: string;
  @Input() singleValued: boolean;

  @Input() dateRange: MyDateRange;


  forMeasurementsPath: string;
  headerText: string;
  footerText: string;

  errorMessage: string;

  //endDate: Date;
  //startDate: Date;

  options;
  data;


  showMinMidMax = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };


  observationGroups: ObservationResult[];


  constructor(private picasoDataService: PicasoDataService, private activatedRoute: ActivatedRoute) {
  };

  ngOnInit(): void {


    //this.dateRange.endDate = new Date();
    //this.startDate = new Date();
    //this.startDate.setFullYear(this.dateRange.endDate.getFullYear() - 1);


    //this.activatedRoute.params.subscribe((params: Params) => {
    //  this.forMeasurements = params['measurement'];
    //  this.setOptions();
    //  this.getObservations();
    //});



    this.setOptions();

    this.getObservations();


  }

  getObservations(): void {


    if (this.forMeasurements === "morisky") {
      this.headerText = "Morisky Scale results";
    } else if (this.forMeasurements === "all") {
      this.headerText = "Patient Measurements and Recordings";
      this.footerText = "Hover the mouse pointer over the diagram for values. Click\n" +
        "      a series name in the legend above the diagram to view/hide series.\n" +
        "      If several series are shown on one axis, series are not normalised."
    }


    this.picasoDataService.getObservations(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      observations => {
        this.setPatientObservations(observations);
        this.enableInitialGraphs();
        this.reloadDataToGraph();
        this.refreshRange(this.dateRange.startDate, this.dateRange.endDate);

      },
      error => this.errorMessage = <any>error);

  }



  setPatientObservations(observations: ObservationResult[]) {


    if (this.forMeasurements === "morisky" || this.singleValued) {
      this.options.chart.height = 200;

      for (let observation of observations) {

        // console.log("observationID",observation.id);
        // console.log("forMeasurements",this.forMeasurements);


        if (observation.id === this.forMeasurements) {
          this.footerText = observation.helpText;
          this.observationGroups = [];
          this.observationGroups.push(observation);
          this.headerText = observation.name
        }
      }
    }

    else {

      this.observationGroups = observations.filter(function (obj) {
        return obj.id !== "morisky";
      });
    }

  }

  setOptions(): void {

    this.options = {
      chart: {
        noData: 'No data exists for selected dates and observations.',
        type: 'multiChart',
        height: 500,
        transitionDuration: 500,

        legendRightAxisHint: " ",
        interpolate: "linear",
        showLegend: false,
        legend: {
          align: false
        },
        showDistX: true,
        showDistY: true,

        //average: function(d) { return d.mean/100; },
        margin: {
          top: 0,
          right: 70,
          bottom: 20,
          left: 70
        },

        useInteractiveGuideline: true,
        useVoronoi: true,

        x: function (d) {
          return new Date(d.observation.date);
        },
        y: function (d) {
          return d.observation.value === null ? null : new Number(d.observation.value);
        },
        defined: function (d) {
          return d.observation.value !== null
        },


        xAxis: {
          //axisLabel: 'Time',
          tickFormat: function (d) {
            return new Date(d).toLocaleDateString();
          },
        },

        xDomain: [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()],
        xRange: [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()],


        tooltip: {
          contentGenerator: function (d) {
            //console.log("tooltip", d);
            var html = "";
            html += "<br><span style='color:" + d.point.color + "' > <i class='fa fa-circle'></i> </span> " +
              (d.point.value === null ? "<span class='badge badge-pill badge-warning'>MISSING VALUE!</span><br>" : d.point.value) + ' ' + d.series[0].key + '<br>' +
              d.point.date + '<br>';
            return html;
          }
        },


        interactiveLayer: {
          tooltip: {
            contentGenerator: function (d) {


              var html = ""; //d.value;

              //console.log("d", d);

              d.series.forEach(function (elem) {

                if (!elem.key.startsWith("hide")) {


                  html = html +

                    "<span style='color:" + elem.color + "' > <i class='fa fa-circle'></i> </span> " +

                    elem.data.name + " " + elem.data.observation.date + ": <br> <span class='text-white'><i class='fa fa-circle-o'></i> </span>" +
                    (
                      elem.data.observation.value === null
                        ?
                        "<span class='w3-tag w3-round text-warning'>MISSING VALUE!</span>"
                        :
                        (elem.data.observation.outOfRange ? "<span class='w3-tag w3-round text-danger'>OUT OF RANGE! </span> " : "") + "<b>" + "<span class='w3-tag w3-round-medium'>" + elem.value + " </span> " + "</b>"
                    )
                    + " " + elem.data.unit +
                    (
                      elem.value === null
                        ?
                        ""
                        :
                        (
                          elem.data.observation.source
                            ?
                            (" <span class='w3-tag'>source: " + elem.data.observation.source + "</span>")
                            :
                            ""
                        )
                    )
                    +
                    "<br>";
                }

              });

              //console.log(JSON.stringify(d));

              return html;


            }
          }
        },

        yAxis1: {
          axisLabel: 'left axis',
          tickFormat: function (d) {
            return d;
          },

          axisLabelDistance: -20
        },
        yAxis2: {
          axisLabel: 'right axis',
          tickFormat: function (d) {
            return d;
          },

          axisLabelDistance: -30
        },
        callback: function (chart) {
          //console.log("!!! lineChart callback !!!");
        }
      }
    };
  }



  reloadDataToGraph() {

    let index = 0;
    this.data = [];
    this.options.chart.yAxis1.axisLabel = "";
    this.options.chart.yAxis2.axisLabel = "";


    let isThereGraph = false;

    for (let group of this.observationGroups) {


      if (group.showLeft || group.showRight) {

        if (group.showLeft) {

          this.options.chart.yAxis1.axisLabel +=
            //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
            (this.options.chart.yAxis1.axisLabel !== "" ? " | " : "") + group.name + " (" + group.unit + ")";
        } else {
          this.options.chart.yAxis2.axisLabel +=
            (this.options.chart.yAxis2.axisLabel !== "" ? " | " : "") +
            group.name + " (" + group.unit + ")";

        }

        group.index = index;
        isThereGraph = true;

        let filteredValues = [];

        for (let el of group.values) {

          if (
            el.value != null &&
            (group.minValue != null && el.value < group.minValue) ||
            (group.maxValue != null && el.value > group.maxValue)
          ) {
            el.outOfRange = true;
          }

          //console.log("gettime" + new Date(el.date).getTime());

          if (new Date(el.date).getTime() < this.dateRange.startDate.getTime() || new Date(el.date).getTime() > this.dateRange.endDate.getTime()) {
          }
          else {
            filteredValues.push(el)
          }
        }

        if (filteredValues.length > 0) {


          let sortedValues = filteredValues.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });


          let newGraphValues = [];


          //var i = 0;
          for (let observation of sortedValues) {

            //newValues.push({x: i++, y: i});

            newGraphValues.push({
              observation: observation,
              unit: group.unit,
              name: group.name
            });
            //{"x": new Date(observation.date).getTime(), "y": observation.value})


            //if (observation.value === null) console.log("found null");

            //console.log( group.name + " / " + group.unit + " " +
            // observation.date + " " + observation.value);
          }


          index++;
          this.data.push({
            label: group.unit,
            name: group.name,
            key: group.unit + " (" + group.name + ")",
            values: newGraphValues,
            color: group.color,
            //area: false,
            //mean: 120,
            disabled: false,
            yAxis: group.showLeft ? 1 : 2,
            xAxis: 1,
            type: 'line'   //group.type

          });


          if (this.showMinMidMax) {

            if (group.minValue != null) {
              let newGraphValuesMin = [];
              newGraphValuesMin.push({observation: {date: this.dateRange.startDate, value: group.minValue}});
              newGraphValuesMin.push({observation: {date: this.dateRange.endDate, value: group.minValue}});
              //min value line
              index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMin,
                key: "hidemin" + group.id,
                color: group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: group.showLeft ? 1 : 2,
                xAxis: 1,
                type: 'line',
                classed: 'dashed'
              })
            }


            if (group.maxValue != null) {
              let newGraphValuesMax = [];
              newGraphValuesMax.push({observation: {date: this.dateRange.endDate, value: group.maxValue}});
              newGraphValuesMax.push({observation: {date: this.dateRange.startDate, value: group.maxValue}});
              //max value line
              index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMax,
                key: "hidemax" + group.id,
                color: group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: group.showLeft ? 1 : 2,
                xAxis: 1,
                type: 'line',
                classed: 'dashed'
              })
            }

            if (group.midValue != null) {
              let newGraphValuesMid = [];
              newGraphValuesMid.push({observation: {date: this.dateRange.startDate, value: group.midValue}});
              newGraphValuesMid.push({observation: {date: this.dateRange.endDate, value: group.midValue}});
              //mid value line
              index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMid,
                key: "hidemid" + group.id,
                color: group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: group.showLeft ? 1 : 2,
                xAxis: 1,
                type: 'line',
                classed: 'dashed-long'
              })
            }
          }

        }
      }
    }

    // HACK adding line with min max date to normalize xRange for left/right y axes
    if (isThereGraph) {

      let newGraphValuesHackLeftAxis = [];
      newGraphValuesHackLeftAxis.push({observation: {date: this.dateRange.startDate, value: 0}});
      newGraphValuesHackLeftAxis.push({observation: {date: this.dateRange.endDate, value: 0}});
      index++;
      this.data.push({
        label: "hideXDomainFixLeft",
        name: "hideXDomainFixLeft",
        values: newGraphValuesHackLeftAxis,
        key: "hideXDomainFixLeft",
        color: "grey",
        //area: false,
        //mean: 120,
        disabled: false,
        yAxis: 1,
        xAxis: 1,
        type: 'line',
        classed: 'hidden-line'
      });

      if (this.observationGroups.length !== 1) {
        let newGraphValuesHackRightAxis = [];
        newGraphValuesHackRightAxis.push({observation: {date: this.dateRange.startDate, value: 0}});
        newGraphValuesHackRightAxis.push({observation: {date: this.dateRange.endDate, value: 0}});
        index++;
        this.data.push({
          label: "hideXDomainFixRight",
          name: "hideXDomainFixRight",
          values: newGraphValuesHackRightAxis,
          key: "hideXDomainFixRight",
          color: "grey",
          //area: false,
          //mean: 120,
          disabled: false,
          yAxis: 2,
          xAxis: 1,
          type: 'line',
          classed: 'hidden-line'
        });
      }

    }

  }

  public refreshRange(start: Date, end: Date): void {

    this.dateRange.startDate = start;
    this.dateRange.endDate = end;
    this.options.chart.xDomain = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xRange = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xScale = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.reloadDataToGraph();
  }

  public toggleLeft(id: string, name: string) {

    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showLeft = !this.observationGroups[i].showLeft;
        if (this.observationGroups[i].showLeft) {
          this.observationGroups[i].showRight = false;

        } else {

        }
        break;
      }
    }
    this.reloadDataToGraph()
  }

  public toggleRight(id: string, name: string) {

    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showRight = !this.observationGroups[i].showRight;
        if (this.observationGroups[i].showRight) {
          this.observationGroups[i].showLeft = false;

        } else {

        }
        break;
      }
    }
    this.reloadDataToGraph()
  }


  public clearAll() {
    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = false;
      this.observationGroups[i].showRight = false;
    }
    this.reloadDataToGraph();
  }

  public showAllRight() {

    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = false;
      this.observationGroups[i].showRight = true;
    }
    this.reloadDataToGraph();
  }

  public showAllLeft() {

    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = true;
      this.observationGroups[i].showRight = false;
    }
    this.reloadDataToGraph();
  }

  public enableInitialGraphs() {

    for (let i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showRight = false;
      this.observationGroups[i].showLeft = false;
      //console.log(this.forMeasurements);
      if (this.forMeasurements === "all" || this.forMeasurements === this.observationGroups[i].id) {
        this.observationGroups[i].showLeft = true;
      }
    }
  }


  public resetMinMidMax() {
    this.showMinMidMax = !this.showMinMidMax;
    this.reloadDataToGraph();
  }


}
