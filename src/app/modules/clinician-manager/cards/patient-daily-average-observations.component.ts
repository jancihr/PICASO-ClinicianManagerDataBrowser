import {Component, HostListener, Input, OnInit, SimpleChange, SimpleChanges, ViewChild} from "@angular/core";
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {MyDateRange} from "./patient-range-picker.component";
import {ObservationResult} from "../model/generated-interfaces";
import {ActivatedRoute} from "@angular/router";


declare let d3, nv;


@Component({
  selector: "patient-daily-average-observations",
  template: require("./patient-daily-average-observations.component.html"),
  styles: [require("./patient-daily-average-observations.component.css")]

})

export class PatientDailyAverageObservationsComponent implements OnInit {


  @Input() observationId: string;
  //@Input() singleValued: boolean = true;


  @Input() dateRange: MyDateRange;

  //@HostListener("window:scroll", [])

  @ViewChild('nvd3') nvd3;


  forMeasurementsPath: string;
  chart;
  headerText: string;
  footerText: string;

  chartType: string = "line";

  normaliseValues: boolean = false;

  min1: number;
  min2: number;

  errorMessage: string;

  isThereMin: boolean;
  isThereMid: boolean;
  isThereMax: boolean;


  isHighContrast: boolean = false;
  isThereGraph: boolean = false;
  forceYZero = true;

  //endDate: Date;
  //startDate: Date;

  data;


  showMinMidMax = true;
  showAll = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };


  observationGroups: ObservationResult[] = [];


  options;


  constructor(private picasoDataService: PicasoOdsCmDataService, private activatedRoute: ActivatedRoute) {
    this.setOptions();
  };

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges) {
    const range: SimpleChange = changes.dateRange;
    if (range === undefined || (range.previousValue !== range.currentValue)) {

      this.callServiceToGetObservations();
      //this.printDate("ngOnChanges")
    }

  }

  setOptions() {
    this.options = {
      chart: {

        // dispatch: {
        //   tooltipShow: function (e) {
        //     console.log("tooltipShow");
        //   },
        //   tooltipHide: function (e) {
        //     console.log("tooltip hide");
        //   },
        //   stateChange: function (e) {
        //     console.log("statechange");
        //   },
        //   changeState: function (e) {
        //     console.log("statechange2");
        //   },
        //   elementMousemove: function (e, v) {
        //     console.log('mousemove')
        //     var xValue = this.chart.xAxis.tickFormat()(e.pointXValue);
        //   },
        //   elementMouseout: function (e) {
        //     console.log('mouseout')
        //   },
        //   elementDblclick: function (e) {
        //     console.log('double click')
        //   }
        //
        //
        // },

        lines1: {
          dispatch: {
            renderEnd: function () {

            }
          }
        },
        lines2: {
          dispatch: {
            renderEnd: function () {

            }
          }
        },
        scattter1: {
          dispatch: {
            renderEnd: function () {

            }
          }
        },
        scattter2: {
          dispatch: {
            renderEnd: function () {

            }
          }
        },
        noData: 'No data exists for selected dates and observations.',
        type: 'multiChart',
        height: this.observationId === "morisky" || this.observationId !== 'all' ? 200 : 300,
        transitionDuration: 0,
        duration: 0,

        legendRightAxisHint: " ",
        interpolate: "linear",
        showLegend: false,
        legend: {
          align: false
        },

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
          return d.observation.value === null ?
            null : new Number(d.observation.value / d.observation.calculatedMax);
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
            this.hideTooltipElements();
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
            hideDelay: 0,

            contentGenerator: function (d) {
              let html = ""; //d.value;
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
                        (elem.data.observation.outOfRange ? "<span class='w3-tag w3-round text-danger'>OUT OF RANGE! </span> " : "") + "<b>" + "<span class='w3-tag w3-round-medium'>" + elem.data.observation.value + " </span> " + "</b>"
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

            // dispatch: {
            //   elementMousemove: function (t, u) {
            //     console.log('interactive elementMousemove');
            //   },
            //   elementMouseout: function (e) {
            //     console.log('interactive elementMouseout');
            //     this.hideTooltipElements();
            //   },
            //   elementClick: function (e) {
            //     console.log('interactive elementClick');
            //     this.hideTooltipElements();
            //   },
            //   elementDblclick: function (e) {
            //     console.log('interactive elementDblclick');
            //     this.hideTooltipElements();
            //   },
            //   elementMouseDown: function (e) {
            //     console.log('interactive elementMouseDown');
            //     this.hideTooltipElements();
            //   },
            //   elementMouseUp: function (e) {
            //     console.log('interactive elementMouseUp');
            //     this.hideTooltipElements();
            //   }
            // }

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
        deepWatchData: true,
        refreshDataOnly: true,
        callback: function (chart) {

          this.chart = chart;//d3.selectAll('.nv-y1 text').style('fill','#123');

          //console.log("!!! lineChart callback !!!", chart);
        }
      }
    };
  }

  ngOnDestroy() {
    this.removeTooltipElements();
    this.options = null;
    this.data = null;
  }


  callServiceToGetObservations(): void {
    this.progress = {
      percentage: 0,
      loaded: 0,
      total: 0
    };

    this.stretchChartUpDown(this.normaliseValues);

    //this.setOptions();

    if (this.observationId === "morisky") {
      this.headerText = "Morisky Scale results";
    } else {
      this.headerText = "Measurements loading...";

    }
    this.options.chart.noData = "Loading...";
    this.picasoDataService.getObservations(
      this.dateRange.startDate,
      this.dateRange.endDate, this.progress
    ).subscribe(
      observations => {
        this.reloadDataToGraph(observations);

        //this.options.chart.noData = "No measurements available";

      },
      error => this.errorMessage = <any>error);
  }


  setHeaderFooter(observations: ObservationResult[]) {
    if (observations && (this.observationId !== 'all')) {
      this.options.chart.height = 200;
      for (let observation of observations) {
        // console.log("observationID",observation.id);
        // console.log("forMeasurements",this.forMeasurements);
        if (observation.id === this.observationId) {
          this.footerText = observation.helpText;
          this.observationGroups = [];
          this.observationGroups.push(observation);
          this.headerText = observation.name + " (" + observation.unit + ")";
        }
      }
    }
    else if (observations) {
      this.headerText = "Patient Measurements and Recordings - Comparison Chart";
      this.footerText = "Choose series above the diagram to show/hide them on the left/right axis.";
      this.observationGroups = observations.filter(function (obj) {
        return obj.id !== "morisky";
      });
    }
    else {
      this.headerText = "Patient Measurements and Recordings";
      this.footerText = "No measurements available";
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


  reloadDataToGraph(observations: ObservationResult[]) {

    this.clearOldChart();

    let oldOnOff = [];
    for (let group of this.observationGroups) {
      oldOnOff.push({id: group.id, showLeft: group.showLeft, showRight: group.showRight})
    }


    this.setHeaderFooter(observations);
    this.enableInitialGraphs(oldOnOff);
    this.stretchChartUpDown(this.normaliseValues);

    this.data = [];
    //this.setOptions();


    this.isThereGraph = false;
    this.isThereMax = false;
    this.isThereMid = false;
    this.isThereMin = false;

//min value to see if chart has zero x axis visible and to paint hidden line for x axis synchronization
    this.min1 = this.reload('left');
    this.min2 = this.reload('right');

    //console.log("min1", this.min1);
    //console.log("min2", this.min2);


    this.hideLeftOrRightAxisTicks();

    //this.chart.update();
    //this.updateDates();

  }

  reload(side: string): number {

    let isLeft: boolean = side === 'left';
    let min = null;
    let max = 1;


    //let index = 0;

    if (isLeft) this.options.chart.yAxis1.axisLabel = "";
    else this.options.chart.yAxis2.axisLabel = "";


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


        if (isLeft && !this.normaliseValues)
          this.options.chart.yAxis1.axisLabel +=
            //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
            (this.options.chart.yAxis1.axisLabel !== "" ? " | " : "") + group.name + " (" + group.unit + ")";
        else
          this.options.chart.yAxis2.axisLabel +=
            //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
            (this.options.chart.yAxis2.axisLabel !== "" ? " | " : "") + group.name + " (" + group.unit + ")";

        //group.index = index;
        this.isThereGraph = true;
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
            filteredValues.push(
              {
                outOfRange: el.outOfRange,
                source: el.source,
                date: el.date,
                value: el.value
              }
            )
          }
        }


        if (filteredValues.length > 0) {

          if (this.normaliseValues) {
            max = Math.max.apply(Math, filteredValues.map(function (o) {
              return o.value;
            }));

            if (this.showMinMidMax) {
              max = Math.max(max, group.maxValue, group.minValue, group.midValue);
            }
          }

          //console.log("max for ", group.name)
          //console.log("max value ", max)


          //sort values by date for graph to be shown correctly
          let sortedValues = filteredValues.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

          // find minimum value for a hack
          min = sortedValues.reduce(function (m, o) {
            return (o.value != null && o.value < m) ? o.value : m;
          }, Infinity);

          if (this.showMinMidMax) {
            min = Math.min(min, group.maxValue, group.minValue, group.midValue);
          }

          for (let i = 0; i < filteredValues.length; i++) {
            filteredValues[i].calculatedMax = max;
            filteredValues[i].calculatedMin = min;
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
            key: (this.chartType === undefined ? "line" : this.chartType) + group.unit + " (" + group.name + ")",
            values: newGraphValues,
            color: this.isHighContrast && this.observationId === 'all' ? (isLeft ? "red" : "green") : group.color,
            //area: false,
            //mean: 120,
            disabled: false,
            yAxis: isLeft ? 1 : 2,
            xAxis: 1,
            type: this.chartType === undefined ? "line" : this.chartType//group.type ? group.type : 'line'
          });

          //console.log("chartType: ", this.chartType);

          // paint horizontal lines for min, mid, max values
          if (this.showMinMidMax) {
            if (group.minValue != null) {

              let newGraphValuesMin = [];
              newGraphValuesMin.push({
                observation: {
                  date: this.dateRange.startDate,
                  value: group.minValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              newGraphValuesMin.push({
                observation: {
                  date: this.dateRange.endDate,
                  value: group.minValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              //min value line
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMin,
                key: "hidemin" + group.id,
                color: this.isHighContrast && this.observationId === 'all' ? (isLeft ? "red" : "green") : group.color,
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
              newGraphValuesMax.push({
                observation: {
                  date: this.dateRange.endDate,
                  value: group.maxValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              newGraphValuesMax.push({
                observation: {
                  date: this.dateRange.startDate,
                  value: group.maxValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              //max value line
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMax,
                key: "hidemax" + group.id,
                color: this.isHighContrast && this.observationId === 'all' ? (isLeft ? "red" : "green") : group.color,
                //area: false,
                //mean: 120,
                disabled: false,
                yAxis: isLeft ? 1 : 2,
                xAxis: 1,
                type: 'line',
                classed: 'not-dashed'
              })
            }

            if (group.midValue != null) {
              let newGraphValuesMid = [];
              newGraphValuesMid.push({
                observation: {
                  date: this.dateRange.startDate,
                  value: group.midValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              newGraphValuesMid.push({
                observation: {
                  date: this.dateRange.endDate,
                  value: group.midValue,
                  calculatedMax: max,
                  calculatedMin: min
                }
              });
              //mid value line
              //index++;
              this.data.push({
                label: group.unit,
                name: group.name,
                values: newGraphValuesMid,
                key: "hidemid" + group.id,
                color: this.isHighContrast && this.observationId === 'all' ? (isLeft ? "red" : "green") : group.color,
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

    // HACK adding line with min max date to normalize xRange for left/right y axes. It will also force y axis to show zero if requested
    if (min !== null) {

      let newGraphValuesHackLeftAxis = [{
        observation: {
          date: this.dateRange.startDate,
          value: this.forceYZero || this.chartType === "area" || this.chartType === "bar" ? 0 : min,
          calculatedMax: max
        }
      },
        {
          observation: {
            date: this.dateRange.endDate,
            value: this.forceYZero || this.chartType === "area" || this.chartType === "bar" ? 0 : min,
            calculatedMax: max
          }
        }];
      //index++;
      this.data.push({
        label: "hideXDomainFix" + side,
        name: "hideXDomainFix" + side,
        values: newGraphValuesHackLeftAxis,
        key: "hideXDomainFix" + side,
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


    //this.data=data;
    //this.data=[];

    return min;
  }

  public updateDates(): void {


    this.options.chart.xDomain = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xRange = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];
    this.options.chart.xScale = [this.dateRange.startDate.getTime(), this.dateRange.endDate.getTime()];


    //this.getObservations();

  }

  public toggleLeft(id: string, name: string) {
    this.data = [];
    this.showAll = false;

    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showLeft = true;//!this.observationGroups[i].showLeft;

      }
      else {
        this.observationGroups[i].showLeft = false;
      }
    }
    this.normaliseValues = false;
    this.callServiceToGetObservations()
  }

  public toggleRight(id: string, name: string) {
    this.data = [];
    for (let i = 0; i < this.observationGroups.length; i++) {
      if (this.normaliseValues) {
        this.observationGroups[i].showLeft = false;
      }
      if (this.observationGroups[i].id === id && this.observationGroups[i].name === name) {
        this.observationGroups[i].showRight = true;//!this.observationGroups[i].showRight;
      }
      else {
        this.observationGroups[i].showRight = false;

      }
    }
    this.normaliseValues = false;
    this.callServiceToGetObservations()
  }


  public clearAll() {
    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = false;
      this.observationGroups[i].showRight = false;
    }
    this.callServiceToGetObservations();
  }

  public showHighContrast() {
    this.isHighContrast = !this.isHighContrast;
    this.callServiceToGetObservations();
  }

  public showAllRight() {

    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = false;
      this.observationGroups[i].showRight = true;
    }
    this.callServiceToGetObservations();
  }


  public showAllLeft() {
    this.data = [];

    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = true;
      this.observationGroups[i].showRight = false;
    }

    this.showAll = true;
    if (this.chartType === 'bar' || this.chartType === 'area') {
      this.chartType = 'line';
    }

    this.normaliseValues = true;

    this.callServiceToGetObservations();


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
      this.normaliseValues = this.observationId === 'all';
      for (let i = 0; i < this.observationGroups.length; i++) {
        this.observationGroups[i].showRight = false;
        this.observationGroups[i].showLeft = this.observationId === 'all';
        //console.log(this.forMeasurements);
        //if (this.forMeasurements === "all") {
        //  this.observationGroups[i].showLeft = false;
        //}
        if (this.observationId === this.observationGroups[i].id) {
          this.observationGroups[i].showLeft = true;
        }
      }
    }
  }


  public resetMinMidMax() {
    this.showMinMidMax = !this.showMinMidMax;
    this.data = [];
    this.callServiceToGetObservations();
  }


  toggleChartType2(type: string) {

    if (this.chartType !== type) {
      this.data = [];
      this.chartType = type;
      this.callServiceToGetObservations();
    }
  }

  toggleZero() {



    //this.nvd3.chart.update();


    this.data = [];
    this.forceYZero = !this.forceYZero;
    this.callServiceToGetObservations()
  }

  hideTooltipElements() {
    //console.log("cleaning tooltips");
    d3.selectAll('.nvtooltip').style("opacity", "0");

  }

  removeTooltipElements() {
    //console.log("cleaning tooltips");
    d3.selectAll('.nvtooltip').remove();

  }

  @HostListener("window:scroll", [])


  //HACK to hide tooltips that stayed on screen when scrolling on mobile device
  onWindowScroll() {
    //console.log("scroll detected");
    this.hideTooltipElements();
  }

  clearOldChart() {
    d3.selectAll("nvd3#" + this.observationId + "-cm-graph > svg > g > g > g > g.nv-wrap").remove();
  }

  stretchChartUpDown(toggle: boolean) {
    if (toggle && this.forceYZero) {
      this.options.chart.y = function (y) {
        return y.observation.value === null ?
          null : new Number((y.observation.value ) / (y.observation.calculatedMax));
      }

    }
    else if (toggle && !this.forceYZero) {
      this.options.chart.y = function (y) {
        return y.observation.value === null ?
          null : new Number((y.observation.value - y.observation.calculatedMin ) / (y.observation.calculatedMax - y.observation.calculatedMin));
      }
    } else {
      this.options.chart.y = function (y) {
        return y.observation.value === null ?
          null : new Number(y.observation.value);
      }
    }

  }


}
