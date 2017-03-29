import {Component, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientObservationGroup} from "../model/patient-observation-group";

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

    observationGroups: PatientObservationGroup[];



    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {

        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setFullYear(this.endDate.getFullYear() - 1);

        this.getObservations();


    }

    getObservations(): void {


        this.picasoDataService.getObservations(
            this.startDate,
            this.endDate
        ).subscribe(
            observations => this.setPatientObservations(observations),
            error => this.errorMessage = <any>error);


    }


    setPatientObservations(observations: PatientObservationGroup[]) {

        this.observationGroups = observations;

        this.options = {
            chart: {
                type: 'multiChart',
                height: 450,

                legendRightAxisHint: " (right axis)",
                interpolate: "linear",

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
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return new Date(d).toLocaleDateString();
                    },
                },

                yAxis1: {
                    axisLabel: 'Value',
                    tickFormat: function (d) {
                        return d;
                    },
                    axisLabelDistance: -10
                },
                yAxis2: {
                    axisLabel: 'Value',
                    tickFormat: function (d) {
                        return d;
                    },
                    axisLabelDistance: -10
                },
                callback: function (chart) {
                    console.log("!!! lineChart callback !!!");
                }
            }
        };


        this.data = [];

        for (var group of observations) {

            var sortedValues = group.values.sort(function(a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            var newValues = [];




            var i=0;
            for (var observation of sortedValues) {

                //newValues.push({x: i++, y: i});

                newValues.push({"x": new Date(observation.date).getTime(), "y": observation.value})
            }

            this.data.push({
                values: newValues,
                key: group.name+ " / " + group.label,
                color: group.color,
                //area: false,
                //mean: 120,
                yAxis: 1,
                type: group.type
            })


        }

        for (var group of observations) {

            var sortedValues = group.values.sort(function(a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            var newValues = [];




            var i=0;
            for (var observation of sortedValues) {

                //newValues.push({x: i++, y: i});

                newValues.push({"x": new Date(observation.date).getTime(), "y": observation.value})
            }

            this.data.push({
                values: newValues,
                key: group.name+ " / " + group.label ,
                color: group.color,
                //area: false,
                //mean: 120,
                yAxis: 2,
                type: group.type
            })


        }

    }






}
