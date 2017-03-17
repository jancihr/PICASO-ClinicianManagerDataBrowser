import {Component, OnInit} from "@angular/core";
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientMoriskyResult} from "../model/patient-morisky-result";
import {PatientFFbHResult} from "../model/patient-ffbh-result";
import {PatientRADAIResult} from "../model/patient-RADAI-result";


declare let d3, nv: any;


@Component({
    selector: "patient-morisky-results",
    template: require("./patient-morisky-results.component.html"),
    styles: [require("./patient-morisky-results.component.css")],
    providers: [PicasoDataService],

})

export class PatientMoriskyResultsComponent implements OnInit {

    errorMessage: string;


    endDate: Date;
    startDate: Date;

    patientMoriskyResults;
    patientFFbHResults;
    patientRADAIResults;




    optionsa = {
        chart: {
            type: 'lineChart',
            showLegend: false,
            //showLastValue: true,

            height: 200,
            //width: 300,
            margin: {
                top: 20,
                right: 25,
                bottom: 20,
                left: 40
            },
            x: function (d) {
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
            yAxis: {
                axisLabel: '',
                tickValues:[1,2],
                tickFormat: function (d) {
                    if (d<1.5) {return "Ja"} else {return "Nein"}
                },
                axisLabelDistance: -10,
                showMaxMin: false
            },
            forceY:[0.8,2.2],
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        }
    };

    optionsb = {
        chart: {
            type: 'lineChart',
            showLegend: false,
            //showLastValue: true,

            height: 200,
            //width: 300,
            margin: {
                top: 20,
                right: 25,
                bottom: 20,
                left: 100
            },
            x: function (d) {
                return new Date(d.x);
            },
            y: function (d) {
                return new Number(d.y);
            },




            useInteractiveGuideline: true,

            xAxis: {
                axisLabel: 'Time',
                tickFormat: function (d) {
                    return new Date(d).toLocaleDateString();
                },
            },
            yAxis: {
                axisLabel: '',
                tickValues:[1,2,3],
                tickFormat: function (d) {
                    if (d<1.5) {return "Ja"} else if (d<2.5) {return "mit Mühe"} else {return "mit Hilfe"}
                },
                axisLabelDistance: -10,
                showMaxMin: false
            },
            forceY:[0.8,3.2],
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        }
    };

    optionsRADAIa = {
        chart: {
            type: 'lineChart',
            showLegend: false,
            //showLastValue: true,

            height: 200,
            //width: 300,
            margin: {
                top: 20,
                right: 25,
                bottom: 20,
                left: 40
            },
            x: function (d) {
                return new Date(d.x);
            },
            y: function (d) {
                return new Number(d.y);
            },
            useInteractiveGuideline: true,

            xAxis: {
                axisLabel: 'Time',
                tickFormat: function (d) {
                    return new Date(d).toLocaleDateString();
                },
            },
            yAxis: {
                axisLabel: '',

                tickValues: [0,1,2,3,4,5,6,7,8,9,10],
                tickFormat: function (d) {
                   d
                },
                axisLabelDistance: -10,
                showMaxMin: false
            },
            forceY:[-1.2,10.2],
            callback: function (chart) {
                //console.log("!!! lineChart callback !!!");
            }
        }
    };



    dataa1; dataa2; dataa3; dataa4; dataa5;

    datab1; datab2; datab3; datab4; datab5; datab6; datab7; datab8; datab9; datab10; datab11; datab12;
    datab13; datab14; datab15; datab16; datab17; datab18;

    dataRADAIq1; dataRADAIq2; dataRADAIq3; dataRADAIq4;




    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {

        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setFullYear(this.endDate.getFullYear() - 1);

        this.getPatientMoriskyResultsFromService();
        this.getPatientFFbHResultsFromService();
        this.getPatientRADAIResultsFromService();


    }

    getPatientRADAIResultsFromService(): void {


        this.picasoDataService.getRADAIResults(
            this.startDate,
            this.endDate
        ).subscribe(
            observations => this.getPatientRADAIResults(observations),
            error => this.errorMessage = <any>error);


    }

    getPatientMoriskyResultsFromService(): void {


        this.picasoDataService.getMoriskyResults(
            this.startDate,
            this.endDate
        ).subscribe(
            observations => this.getPatientMoriskyResults(observations),
            error => this.errorMessage = <any>error);


    }

    getPatientFFbHResultsFromService(): void {


        this.picasoDataService.getFFbHResults(
            this.startDate,
            this.endDate
        ).subscribe(
            observations => this.getPatientFFbHResults(observations),
            error => this.errorMessage = <any>error);


    }

    getPatientRADAIResults(results: PatientRADAIResult[]) {


        this.dataRADAIq1 = [{
            values: [],
            key: "RADAI q1",
            color: "0D00D0",
            area: false
        }];


        this.dataRADAIq2 = [{
            values: [],
            key: "RADAI q2",
            color: "0D00D0",
            area: false
        }];
        this.dataRADAIq3 = [{
            values: [],
            key: "RADAI q3",
            color: "0D00D0",
            area: false
        }];
        this.dataRADAIq4 = [{
            values: [],
            key: "RADAI q4",
            color: "0D00D0",
            area: false
        }];


        this.patientRADAIResults = results;




        for (var result of results) {
            if (result.q1>-1)
                this.dataRADAIq1[0].values.push({x:result.date, y:result.q1.toString()});
            if (result.q2>-1)
            this.dataRADAIq2[0].values.push({x:result.date, y:result.q2.toString()});
            if (result.q3>-1)
            this.dataRADAIq3[0].values.push({x:result.date, y:result.q3.toString()});
            if (result.q4>-1)
            this.dataRADAIq4[0].values.push({x:result.date, y:result.q4.toString()});


        }





    }



    getPatientMoriskyResults(results: PatientMoriskyResult[]) {


        this.dataa1 = [{
            values: [],
            key: "Morisky q1",
            color: "0D00D0",
            area: false
        }];


        this.dataa2 = [{
            values: [],
            key: "Morisky q2",
            color: "0D00D0",
            area: false
        }];
        this.dataa3 = [{
            values: [],
            key: "Morisky q3",
            color: "0D00D0",
            area: false
        }];
        this.dataa4 = [{
            values: [],
            key: "Morisky q4",
            color: "0D00D0",
            area: false
        }];
        this.dataa5 = [{
            values: [],
            key: "Morisky q5",
            color: "0D00D0",
            area: false
        }];

        this.patientMoriskyResults = results;




        for (var result of results) {

            this.dataa1[0].values.push({x:result.date, y:result.q1.toString()});
            this.dataa2[0].values.push({x:result.date, y:result.q2.toString()});
            this.dataa3[0].values.push({x:result.date, y:result.q3.toString()});
            this.dataa4[0].values.push({x:result.date, y:result.q4.toString()});
            this.dataa5[0].values.push({x:result.date, y:result.q5.toString()});


        }





    }




    getPatientFFbHResults(results: PatientFFbHResult[]) {


        this.datab1 = [{
            values: [],
            key: "FFbH q1",
            color: "0D00D0",
            area: false
        }];


        this.datab2 = [{
            values: [],
            key: "FFbH q2",
            color: "0D00D0",
            area: false
        }];
        this.datab3 = [{
            values: [],
            key: "FFbH q3",
            color: "0D00D0",
            area: false
        }];
        this.datab4 = [{
            values: [],
            key: "FFbH q4",
            color: "0D00D0",
            area: false
        }];
        this.datab5 = [{
            values: [],
            key: "FFbH q5",
            color: "0D00D0",
            area: false
        }];
        this.datab6 = [{
            values: [],
            key: "FFbH q6",
            color: "0D00D0",
            area: false
        }];
        this.datab7 = [{
            values: [],
            key: "FFbH q7",
            color: "0D00D0",
            area: false
        }];
        this.datab8 = [{
            values: [],
            key: "FFbH q8",
            color: "0D00D0",
            area: false
        }];
        this.datab9 = [{
            values: [],
            key: "FFbH q9",
            color: "0D00D0",
            area: false
        }];
        this.datab10 = [{
            values: [],
            key: "FFbH q10",
            color: "0D00D0",
            area: false
        }];
        this.datab11 = [{
            values: [],
            key: "FFbH q11",
            color: "0D00D0",
            area: false
        }];
        this.datab12 = [{
            values: [],
            key: "FFbH q12",
            color: "0D00D0",
            area: false
        }];
        this.datab13 = [{
            values: [],
            key: "FFbH q13",
            color: "0D00D0",
            area: false
        }];
        this.datab14 = [{
            values: [],
            key: "FFbH q14",
            color: "0D00D0",
            area: false
        }];
        this.datab15 = [{
            values: [],
            key: "FFbH q15",
            color: "0D00D0",
            area: false
        }];
        this.datab16 = [{
            values: [],
            key: "FFbH q16",
            color: "0D00D0",
            area: false
        }];
        this.datab17 = [{
            values: [],
            key: "FFbH q17",
            color: "0D00D0",
            area: false
        }];
        this.datab18 = [{
            values: [],
            key: "FFbH q18",
            color: "0D00D0",
            area: false
        }];

        this.patientFFbHResults = results;




        for (var result of results) {

            this.datab1[0].values.push({x:result.date, y:result.q1.toString()});
            this.datab2[0].values.push({x:result.date, y:result.q2.toString()});
            this.datab3[0].values.push({x:result.date, y:result.q3.toString()});
            this.datab4[0].values.push({x:result.date, y:result.q4.toString()});
            this.datab5[0].values.push({x:result.date, y:result.q5.toString()});
            this.datab6[0].values.push({x:result.date, y:result.q6.toString()});
            this.datab7[0].values.push({x:result.date, y:result.q7.toString()});
            this.datab8[0].values.push({x:result.date, y:result.q8.toString()});
            this.datab9[0].values.push({x:result.date, y:result.q9.toString()});
            this.datab10[0].values.push({x:result.date, y:result.q10.toString()});
            this.datab11[0].values.push({x:result.date, y:result.q11.toString()});
            this.datab12[0].values.push({x:result.date, y:result.q12.toString()});
            this.datab13[0].values.push({x:result.date, y:result.q13.toString()});
            this.datab14[0].values.push({x:result.date, y:result.q14.toString()});
            this.datab15[0].values.push({x:result.date, y:result.q15.toString()});
            this.datab16[0].values.push({x:result.date, y:result.q16.toString()});
            this.datab17[0].values.push({x:result.date, y:result.q17.toString()});
            this.datab18[0].values.push({x:result.date, y:result.q18.toString()});


        }





    }

}
