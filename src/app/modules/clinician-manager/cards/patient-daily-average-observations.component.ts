import {Component, Input, OnInit, SimpleChange, SimpleChanges} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {ObservationResult} from "../model/generated-interfaces";
import {ActivatedRoute} from "@angular/router";


declare let d3, nv;


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
  chart;
  headerText: string;
  footerText: string;

  errorMessage: string;

  isThereMin: boolean;
  isThereMid: boolean;
  isThereMax: boolean;

  isHighContrast: boolean = false;

  forceYZero = false;

  //endDate: Date;
  //startDate: Date;

  data;


  showMinMidMax = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };


  observationGroups: ObservationResult[] = [];


  options: any = {
    chart: {
      noData: 'No data exists for selected dates and observations.',
      type: 'multiChart',
      height: 300,
      transitionDuration: 300,
      duration: 300,

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
        right: 50,
        bottom: 20,
        left: 50
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
          let date = new Date(d);
          return ("" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear());
        },
      },

      //xDomain: [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()],
      //xRange: [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()],


      tooltip: {
        contentGenerator: function (d) {
          //console.log("tooltip", d);
          var html = "";
          html += "<br><span style='color:" + d.point.color + "' > <i class='fa fa-circle'></i> </span> " +
            (d.point.value === null ? "<span class='badge badge-pill badge-warning'>MISSING VALUE!</span><br>" : d.point.value) + ' ' + d.series[0].key + '<br>' +

            ("" + d.point.date.getDate() + "." + (d.point.date.getMonth() + 1) + "." + d.point.date.getFullYear() + " " + d.point.date.getHours() + ":" + d.point.date.getMinutes())


            + '<br>';
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

                let date = new Date(elem.data.observation.date);

                html = html +

                  "<span style='color:" + elem.color + "' > <i class='fa fa-circle'></i> </span> " +

                  elem.data.name + " " +

                  ("" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes())


                  + " <br> <span class='text-white'><i class='fa fa-circle-o'></i> </span>" +
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


          },

          dispatch: {
            elementClick: function (e) {
              console.log('click')
            },
            elementDblclick: function (e) {
              console.log('double click')
            },
            elementMousemove: function (e) {
              console.log('mousemove')
            },
            elementMouseout: function (e) {
              console.log('mouseout');
              this.clearElement();
            }
          }
        }
      },

      yAxis1: {
        showMaxMin: false,
        axisLabel: 'left axis',
        tickFormat: function (d) {
          return d;
        },

        axisLabelDistance: -28
      },
      yAxis2: {
        showMaxMin: false,
        axisLabel: 'right axis',
        tickFormat: function (d) {
          return d;
        },

        axisLabelDistance: -40
      },
      callback: function (chart) {

        this.chart = chart;//d3.selectAll('.nv-y1 text').style('fill','#123');

        chart.multibar.dispatch.on('elementClick', function (e) {
          console.log('elementClick in callback', e.data);
        });

        //console.log("!!! lineChart callback !!!", chart);
      }
    }
  };


  constructor(private picasoDataService: PicasoDataService, private activatedRoute: ActivatedRoute) {
  };

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    this.clearElement();
    const range: SimpleChange = changes.dateRange;
    //console.log('prev value: ', range.previousValue);
    //range.currentValue();

    if (range === undefined || (range.previousValue != range.currentValue)) {
      this.setOptions();
      this.updateDates();
      this.getObservations();
      //this.printDate("ngOnChanges")
    }
  }

  ngOnDestroy() {
    this.clearElement();
  }


  getObservations(): void {

    let oldOnOff = [];
    for (let group of this.observationGroups) {
      oldOnOff.push({id: group.id, showLeft: group.showLeft, showRight: group.showRight})
    }


    if (this.forMeasurements === "morisky") {
      this.headerText = "Morisky Scale results";
    } else {
      this.headerText = "Patient Measurements and Recordings";

    }
    this.options.chart.noData = "Loading...";
    this.picasoDataService.getObservations(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      observations => {
        this.setPatientObservations(observations);
        this.enableInitialGraphs(oldOnOff);
        this.reloadDataToGraph();
        this.updateDates();

        this.options.chart.noData = "Choose Left (L) and Right (R) values from the list above to compare.";

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
      this.headerText = "Patient Measurements and Recordings - Combined Chart";
      this.footerText = "Choose series above the diagram to show/hide them on left/right y axis." +
        "      If several series are shown on one axis, series are not normalised.";
      this.observationGroups = observations.filter(function (obj) {
        return obj.id !== "morisky";
      });
    }
  }

  // hide y axis if no values ae on the axis
  hideLeftOrRightAxisTicks(): void {
    let hideLeft = true;
    let hideRight = true;
    for (let group of this.observationGroups) {
      if (group.showLeft) hideLeft = false;
      if (group.showRight) hideRight = false;
    }

    //hiding left y axis tick values
    if (hideLeft) {
      this.options.chart.yAxis1.tickFormat = function (d) {
        return null;
      };
    } else {
      this.options.chart.yAxis1.tickFormat = function (d) {
        return d;
      };
    }


    //hide right y axis tick values
    if (hideRight) {
      this.options.chart.yAxis2.tickFormat = function (d) {
        return null;
      };
    } else {
      this.options.chart.yAxis2.tickFormat = function (d) {
        return d;
      };
    }
  }

  setOptions(): void {
    this.data = [];
    //this.options =
  }


  reloadDataToGraph() {
    this.data = [];
    this.hideLeftOrRightAxisTicks();
    this.reload('right');
    this.reload('left');

  }

  reload(side: string) {

    let isLeft: boolean = side === 'left';
    let min = null;
    if (this.forceYZero) {
      min = 0;
    }

    //let index = 0;

    if (isLeft) this.options.chart.yAxis1.axisLabel = "";
    else this.options.chart.yAxis2.axisLabel = "";

    let isThereGraph = false;
    this.isThereMax = false;
    this.isThereMid = false;
    this.isThereMin = false;

    for (let group of this.observationGroups) {

      if (group.midValue != null) {
        this.isThereMid = true;
      }
      if (group.maxValue != null) {
        this.isThereMax = true;
      }
      if (group.minValue != null) {
        this.isThereMin = true;
      }


      if ((isLeft && group.showLeft) || (!isLeft && group.showRight)) {

        if (min == null) {
          min = group.values[0];
        }
        if (isLeft)
          this.options.chart.yAxis1.axisLabel +=
            //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
            (this.options.chart.yAxis1.axisLabel !== "" ? " | " : "") + group.name + " (" + group.unit + ")";
        else
          this.options.chart.yAxis2.axisLabel +=
            //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
            (this.options.chart.yAxis2.axisLabel !== "" ? " | " : "") + group.name + " (" + group.unit + ")";

        //group.index = index;
        isThereGraph = true;
        let filteredValues = [];


        // show only values between min max
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

          //sort values by date for graph to be shown correctly
          let sortedValues = filteredValues.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

          // find minimum value for a hack
          if (!this.forceYZero) {
            if (min == null) {
              min = sortedValues.reduce(function (m, o) {
                return (o.value != null && o.value < m) ? o.value : m;
              }, Infinity);
            }
          }

          let newGraphValues = [];

          //var i = 0;
          for (let observation of sortedValues) {
            //newValues.push({x: i++, y: i});
            newGraphValues.push({
              observation: observation,
              unit: group.unit,
              name: group.name
            });
          }

          //index++;
          this.data.push({
            label: group.unit,
            name: group.name,
            key: group.unit + " (" + group.name + ")",
            values: newGraphValues,
            color: this.isHighContrast && !this.singleValued ? (isLeft ? "red" : "green") : group.color,
            //area: false,
            //mean: 120,
            disabled: false,
            yAxis: isLeft ? 1 : 2,
            xAxis: 1,
            type: 'line'   //group.type
          });

          // paint horizontal lines for min, mid, max values
          if (this.showMinMidMax) {
            if (group.minValue != null) {

              let newGraphValuesMin = [];
              newGraphValuesMin.push({observation: {date: this.dateRange.startDate, value: group.minValue}});
              newGraphValuesMin.push({observation: {date: this.dateRange.endDate, value: group.minValue}});
              //min value line
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMin,
                key: "hidemin" + group.id,
                color: this.isHighContrast && !this.singleValued ? (isLeft ? "red" : "green") : group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: isLeft ? 1 : 2,
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
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMax,
                key: "hidemax" + group.id,
                color: this.isHighContrast && !this.singleValued ? (isLeft ? "red" : "green") : group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: isLeft ? 1 : 2,
                xAxis: 1,
                type: 'line',
                //classed: 'dashed'
              })
            }

            if (group.midValue != null) {
              let newGraphValuesMid = [];
              newGraphValuesMid.push({observation: {date: this.dateRange.startDate, value: group.midValue}});
              newGraphValuesMid.push({observation: {date: this.dateRange.endDate, value: group.midValue}});
              //mid value line
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMid,
                key: "hidemid" + group.id,
                color: this.isHighContrast && !this.singleValued ? (isLeft ? "red" : "green") : group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: isLeft ? 1 : 2,
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
    if (min !== null) {

      let newGraphValuesHackLeftAxis = [];
      newGraphValuesHackLeftAxis.push({observation: {date: this.dateRange.startDate, value: min}});
      newGraphValuesHackLeftAxis.push({observation: {date: this.dateRange.endDate, value: min}});
      //index++;
      this.data.push({
        label: "hideXDomainFixLeft",
        name: "hideXDomainFixLeft",
        values: newGraphValuesHackLeftAxis,
        key: "hideXDomainFixLeft",
        color: "grey",
        //area: false,
        //mean: 120,
        disabled: false,
        yAxis: isLeft ? 1 : 2,
        xAxis: 1,
        type: 'line',
        classed: 'hidden-line'
      });
    }



  }

  public updateDates(): void {


    this.options.chart.xDomain = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xRange = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xScale = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];


    //this.getObservations();

  }

  public toggleLeft(id: string, name: string) {

    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showLeft = true;//!this.observationGroups[i].showLeft;

      }
      else {
        this.observationGroups[i].showLeft = false;
      }
    }
    this.reloadDataToGraph()
  }

  public toggleRight(id: string, name: string) {

    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showRight = true;//!this.observationGroups[i].showRight;
      }
      else {
        this.observationGroups[i].showRight = false;
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

  public showHighContrast() {
    this.isHighContrast = !this.isHighContrast;
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
      //this.observationGroups[i].showRight = false;
    }
    this.reloadDataToGraph();
  }

  public enableInitialGraphs(oldOnOffData: any) {
    if (oldOnOffData.length > 1) {
      for (let i = 0; i < this.observationGroups.length; i++) {
        for (let oldGroup of oldOnOffData) {
          if (this.observationGroups[i].id === oldGroup.id) {
            this.observationGroups[i].showLeft = oldGroup.showLeft;
            this.observationGroups[i].showRight = oldGroup.showRight;
            break;
          }
        }
      }
    }
    else {
      for (let i = 0; i < this.observationGroups.length; i++) {
        this.observationGroups[i].showRight = false;
        this.observationGroups[i].showLeft = false;
        //console.log(this.forMeasurements);
        //if (this.forMeasurements === "all") {
        //  this.observationGroups[i].showLeft = false;
        //}
        if (this.forMeasurements === this.observationGroups[i].id) {
          this.observationGroups[i].showLeft = true;
        }
      }
    }
  }


  public resetMinMidMax() {
    this.showMinMidMax = !this.showMinMidMax;
    this.reloadDataToGraph();
  }

  clearElement() {
    d3.selectAll('.nvtooltip').remove();

  }


}
