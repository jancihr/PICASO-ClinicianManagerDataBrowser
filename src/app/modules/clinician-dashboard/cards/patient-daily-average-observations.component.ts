import {Component, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientObservationGroup} from "../model/patient-observation-group";
import {PatientObservation} from "../model/patient-observation";

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
                type: 'lineWithFocusChart',
                height: 450,

                average: function(d) { return d.mean/100; },
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) {

                    //console.log("snazim sa datum vyrobit", d.x);
                    return new Date(d.x);
                },
                y: function (d) {
                    return new Number(d.y);
                },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) {
                        console.log("stateChange");
                    },
                    changeState: function (e) {
                        console.log("changeState");
                    },
                    tooltipShow: function (e) {
                        console.log("tooltipShow");
                    },
                    tooltipHide: function (e) {
                        console.log("tooltipHide");
                    }
                },
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return new Date(d).toLocaleDateString();
                    },
                },
                x2Axis: {
                    axisLabel: 'Zoom',
                    tickFormat: function (d) {
                        return new Date(d).toLocaleDateString();
                    },
                },
                yAxis: {
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




            for (var observation of sortedValues) {

                newValues.push({"x": observation.date, "y": observation.value})
            }

            this.data.push({
                values: newValues,
                key: group.name + " (" + group.label + ")",
                color: group.color,
                area: false,
                mean: 120
            })
        }

    }




    // lineChart2
    public lineChart2Data:Array<any> = [
        {
            data: [1, 18, 9, 17, 34, 22, 11],
            label: 'Series A'
        }
    ];
    public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart2Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandInfo,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart2Legend:boolean = false;
    public lineChart2Type:string = 'line';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    //convert Hex to RGBA
    public convertHex(hex:string,opacity:number){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return rgba;
    }

    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =   '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';


}
