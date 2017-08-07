import {Component, Input, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientObservationGroup} from "../model/patient-observation-group";
import {PatientLoadProgress} from "../model/patient-loadprogress";

declare let d3, nv: any;


@Component({
  selector: "patient-daily-average-observations",
  template: require("./patient-daily-average-observations.component.html"),
  styles: [require("./patient-daily-average-observations.component.css")],
  providers: [PicasoDataService]

})

export class PatientDailyAverageObservationsComponent implements OnInit {

  @Input() forMeasurements: string[];

  cardTitle: string;
  footerText: string;

  errorMessage: string;

  endDate: Date;
  startDate: Date;

  options;
  data;
  showAllRight = false;
  showAllLeft = false;

  showMinMidMax = true;

  progress: PatientLoadProgress = {
    percentage: 0,
    loaded: 0,
    total: 0
  };


  observationGroups: PatientObservationGroup[];


  constructor(private picasoDataService: PicasoDataService) {
  };

  ngOnInit(): void {

    if (this.forMeasurements[0] === "morisky") {
      this.cardTitle = "Morisky Scale results";
      this.footerText = "4 points = high compliance; 2-3 points = medium compliance; 0-1 = low compliance";
    } else {
      this.cardTitle = "Patient Measurements and Recordings";
      this.footerText = "Hover the mouse pointer over the diagram for values. Click\n" +
        "      a series name in the legend above the diagram to view/hide series.\n" +
        "      If several series are shown on one axis, series are not normalised."
    }

    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setFullYear(this.endDate.getFullYear() - 1);
    this.setOptions();
    this.getObservations();


  }

  getObservations(): void {


    if (this.forMeasurements[0] === "morisky") {

      this.picasoDataService.getMorisky(
        this.startDate,
        this.endDate, this.progress
      ).subscribe(
        observations => {
          this.setPatientObservations(observations);
          this.reloadDataToGraph()
        },
        error => this.errorMessage = <any>error);

    } else {
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


        xAxis: {
          //axisLabel: 'Time',
          tickFormat: function (d) {
            return new Date(d).toLocaleDateString();
          },
        },

        xDomain: [this.startDate.getTime(), this.endDate.getTime()],
        xRange: null,


        tooltip: {
          contentGenerator: function (d) {

            //console.log("tooltip", d);

            var html = "";
            /*
                      d.series.forEach(function (elem) {

                        if (!elem.key.startsWith("hide")) {


                          html = html +

                            "<span style='color:" + elem.color + "' > <i class='fa fa-circle'></i> </span> " +

                            elem.data.observation.date + ": <br>" +
                            (
                              elem.value === null
                                ?
                                "<span class='text-warning w3-tag'>MISSING VALUE!</span>"
                                :
                                (elem.data.observation.outOfRange ? "<span class='text-danger w3-tag'>OUT OF RANGE! </span> " : "") + "<b>" + elem.value + "</b>"
                            )
                            + " " + elem.key +
                            (
                              elem.value === null
                                ?
                                ""
                                :
                                (
                                  elem.data.observation.source
                                    ?
                                    (" (source: " + elem.data.observation.source + ")")
                                    :
                                    ""
                                )
                            )
                            +
                            "<br>";
                        }

                      });
          */


            html += "<br><span style='color:" + d.point.color + "' > <i class='fa fa-circle'></i> </span> " +

              (d.point.value === null ? "<span class='text-warning w3-tag'>MISSING VALUE!</span><br>" : d.point.value) + ' ' + d.series[0].key + '<br>' +
              d.point.date + '<br>';


            return html;


          }
        },


        interactiveLayer: {
          tooltip: {
            contentGenerator: function (d) {


              var html = ""; //d.value;

              console.log("d", d);

              d.series.forEach(function (elem) {

                if (!elem.key.startsWith("hide")) {


                  html = html +

                    "<span style='color:" + elem.color + "' > <i class='fa fa-circle'></i> </span> " +

                    elem.data.name + " " + elem.data.observation.date + ": <br>" +
                    (
                      elem.data.observation.value === null
                        ?
                        "<span class='text-warning w3-tag'>MISSING VALUE!</span>"
                        :
                        (elem.data.observation.outOfRange ? "<span class='text-danger w3-tag'>OUT OF RANGE! </span> " : "") + "<b>" + "<span class='w3-tag'>" + elem.value + " </span> " + "</b>"
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
                            (" (source: " + elem.data.observation.source + ")")
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
          //axisLabelDistance: -10
        },
        yAxis2: {
          axisLabel: 'right axis',
          tickFormat: function (d) {
            return d;
          },
          axisLabelDistance: -10
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
      this.observationGroups[0].showRight = true;
      this.observationGroups[1].showLeft = true;
      this.observationGroups[2].showLeft = true;
    }

    this.reloadDataToGraph();

  }

  reloadDataToGraph() {

    let index = 0;
    this.data = [];
    this.options.chart.yAxis1.axisLabel = "";
    this.options.chart.yAxis2.axisLabel = "";


    let isThereGraph = false;

    for (let group of this.observationGroups) {


      if (group.showLeft || group.showRight) {
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

          if (new Date(el.date).getTime() < this.startDate.getTime() || new Date(el.date).getTime() > this.endDate.getTime()) {
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
              unit: group.label,
              name: group.name
            });
            //{"x": new Date(observation.date).getTime(), "y": observation.value})


            //if (observation.value === null) console.log("found null");

            //console.log( group.name + " / " + group.label + " " +
            // observation.date + " " + observation.value);
          }

          if (group.showLeft) {
            this.options.chart.yAxis1.axisLabel +=
              //"<span style='color:" + group.color + "' > <i class='fa fa-circle'></i> </span>" +
              group.name + " (" + group.label + ") | ";
          } else {
            this.options.chart.yAxis2.axisLabel += group.name + " (" + group.label + ") | ";
          }

          index++;
          this.data.push({
            label: group.label,
            name: group.name,
            key: group.label + " (" + group.name + ")",
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
              newGraphValuesMin.push({observation: {date: this.startDate, value: group.minValue}});
              newGraphValuesMin.push({observation: {date: this.endDate, value: group.minValue}});
              //min value line
              index++;
              this.data.push({
                label: group.label,
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
              newGraphValuesMax.push({observation: {date: this.endDate, value: group.maxValue}});
              newGraphValuesMax.push({observation: {date: this.startDate, value: group.maxValue}});
              //max value line
              index++;
              this.data.push({
                label: group.label,
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
              newGraphValuesMid.push({observation: {date: this.startDate, value: group.midValue}});
              newGraphValuesMid.push({observation: {date: this.endDate, value: group.midValue}});
              //mid value line
              index++;
              this.data.push({
                label: group.label,
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

    if (isThereGraph) {

      let newGraphValuesHackLeftAxis = [];
      let newGraphValuesHackRightAxis = [];
      newGraphValuesHackLeftAxis.push({observation: {date: this.startDate, value: 0}});
      newGraphValuesHackLeftAxis.push({observation: {date: this.endDate, value: 0}});
      newGraphValuesHackRightAxis.push({observation: {date: this.startDate, value: 0}});
      newGraphValuesHackRightAxis.push({observation: {date: this.endDate, value: 0}});
      //mid value line
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

  public refreshRange(start: Date, end: Date): void {

    this.startDate = start;
    this.endDate = end;
    this.options.chart.xDomain = [this.startDate.getTime(), this.endDate.getTime()];
    this.options.chart.xRange = [this.startDate.getTime(), this.endDate.getTime()];
    this.options.chart.xScale = [this.startDate.getTime(), this.endDate.getTime()];
    this.reloadDataToGraph();
  }

  public toggleLeft(id: string, name: string) {

    for (let i = 0; i < this.observationGroups.length; i++) {
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

    for (let i = 0; i < this.observationGroups.length; i++) {
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


  public clearAll() {
    this.showAllRight = false;
    this.showAllLeft = false;
    for (var i = 0; i < this.observationGroups.length; i++) {
      this.observationGroups[i].showLeft = this.showAllLeft;
      this.observationGroups[i].showRight = this.showAllRight;
    }
    this.reloadDataToGraph();
  }

  public resetLeft() {
    this.toggleAll();
    this.reloadDataToGraph()
  }


  private toggleAll() {
    if (!this.showAllLeft && !this.showAllRight) {
      this.showAllLeft = true;
    } else if (this.showAllRight) {
      this.showAllRight = false;
      this.showAllLeft = false;
    } else {
      this.showAllRight = true;
    }
    for (let i = 0; i < this.observationGroups.length; i++) {

      this.observationGroups[i].showLeft = this.showAllLeft;
      this.observationGroups[i].showRight = this.showAllRight;
    }
  }

  public resetMinMidMax() {
    this.showMinMidMax = !this.showMinMidMax;
    this.reloadDataToGraph();
  }


}
