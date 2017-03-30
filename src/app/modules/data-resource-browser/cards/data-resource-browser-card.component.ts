///<reference path="../../../../../node_modules/ng2-vis/components/network/index.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Routes,
    RouterModule, RouterLink, Router
}             from '@angular/router';
import {DataResourceBrowserRoutingModule}   from '../data-resource-browser-routing.module';
//import {PicasoDataService} from "../service/picaso-data.service";
//import {LastGraphDisplayed} from "../model/last-graph-displayed";


import {
    //VisNode,
    VisNodes,
    VisEdges,
    VisNetworkService,
    VisNetworkData,
    VisNetworkOptions,
    VisEdgeOptions,
    VisFitOptions
} from 'ng2-vis/components/network';
//import Navigation = webdriver.Navigation;
/*import {ClinicianDashboardComponent} from '../clinician-dashboard.module";

 const appRoutes: Routes = [
 { path: 'clinician-dashboard.component.html', component: ClinicianDashboardComponent }
 ];
 */


class PicasoNetworkData implements VisNetworkData {
    public nodes: VisNodes;
    public edges: VisEdges;
    // public router: Router
}

@Component({
    //templateUrl: 'data-resource-browser.component.html'
    selector: 'resource-browser-tag',
    templateUrl: './data-resource-browser-card.component.html',
    styleUrls: ['./data-resource-browser-card.component.css']

})

export class DataResourceBrowserCardComponent implements OnInit, OnDestroy {

    public visNetwork: string = 'networkId1';
    public visNetworkData: PicasoNetworkData;
    public visNetworkOptions: VisNetworkOptions;
    public visEdgeOptions: VisEdgeOptions;
    public visFitOptions: VisFitOptions;
    public router: Router
    public allDisplayed: boolean;
    public homeDisplayed: boolean;
    public planDisplayed: boolean;
    public carersDisplayed: boolean;
    public questionairesDisplayed: boolean;
    public imagesDisplayed: boolean;
    public screeningsDisplayed: boolean;
    public cliMeasurementsDisplayed: boolean;
    public labDisplayed: boolean;
    public psychoDisplayed: boolean;
    public memoryDisplayed: boolean;
    public attentionDisplayed: boolean;
    public languageDisplayed: boolean;
    public psyHealthDisplayed: boolean;
    //public lastGraph : any; // LastGraphDisplayed;


    public constructor(private visNetworkService: VisNetworkService, router: Router) {
        this.router = router
    }

    private carersSubGraphDisplay(){
        let fakeDate = '11.02.2017';
        let fakeDateCard = '11.11.2016';
        this.carersDisplayed = true;
        //   this.lastGraph.carersDisplayed = true;
        //Neurologist, Neuropschologist, Radiologist,
        //General Practitioner

        this.visNetworkData.nodes.add({
            id: 'cardiologist',
            label: 'Cardiologist\n' + fakeDateCard,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'cardiologist', to: 'carers', id: 'carers01'});

        this.visNetworkData.nodes.add({
            id: 'rheumatologist',
            label: 'Rheumatologists\n' + fakeDate,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'rheumatologist', to: 'carers', id: 'carers02'});

        this.visNetworkData.nodes.add({
            id: 'neurologist',
            label: 'Neurologist\n' + fakeDate,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'neurologist', to: 'carers', id: 'carers03'});

        this.visNetworkData.nodes.add({
            id: 'neuropschologist',
            label: 'Neuropschologist\n' + fakeDate,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'neuropschologist', to: 'carers', id: 'carers04'});

        this.visNetworkData.nodes.add({
            id: 'radiologist',
            label: 'Radiologist\n' + fakeDate,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'radiologist', to: 'carers', id: 'carers05'});

        this.visNetworkData.nodes.add({
            id: 'gp',
            label: 'General Practitioner\n' + fakeDate,
            group: 'Carer'
        });
        this.visNetworkData.edges.add({from: 'gp', to: 'carers', id: 'carers06'});
    }

    private homeSubGraphDisplay(){
        this.homeDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'sugarHistory',
            label: 'Blood Sugar Level (Home)\n' + '19.03.2017',
            group: 'HomeHistory'
        });
        this.visNetworkData.edges.add({from: 'sugarHistory', to: 'home', id: 'home01'});
        this.visNetworkData.nodes.add({
            id: 'saturationHistory',
            label: 'Saturation (Home)\n' + '19.03.2017',
            group: 'HomeHistory'
        });
        this.visNetworkData.edges.add({from: 'saturationHistory', to: 'home', id: 'home02'});
        this.visNetworkData.nodes.add({
            id: 'lungHistory',
            label: 'Lung Capacity (Home)\n' + '19.03.2017',
            group: 'BarHomeHistory'
        });
        this.visNetworkData.edges.add({from: 'lungHistory', to: 'home', id: 'home03'});
        this.visNetworkData.nodes.add({
            id: 'respirationHistory',
            label: 'Respiration Rate (Home)\n' + '19.03.2017',
            group: 'BarHomeHistory'
        });
        this.visNetworkData.edges.add({from: 'respirationHistory', to: 'home', id: 'home04'});
        this.visNetworkData.nodes.add({
            id: 'weightHistory',
            label: 'Weight (Home)\n' + '19.03.2017',
            group: 'WeightHomeHistory'
        });
        this.visNetworkData.edges.add({from: 'weightHistory', to: 'home', id: 'home05'});
        this.visNetworkData.nodes.add({
            id: 'homeHeart',
            label: 'Blood Pressure and Heart rate \nHome Measurements\n' + '19.03.2017',
            group: 'HomeHeart'
        });
        this.visNetworkData.edges.add({from: 'homeHeart', to: 'home', id: 'home06'});
        this.visNetworkData.nodes.add({
            id: 'homeActivity',
            label: 'Activity  Monitoring (Home)\n' + '19.03.2017',
            group: 'HomeActivity'
        });
        this.visNetworkData.edges.add({from: 'homeActivity', to: 'home', id: 'home07'});
        this.visNetworkData.nodes.add({
            id: 'questionnaireHome',
            label: 'Questionnaires Answered (Home)\n' + '19.03.2017',
            group: 'QuestionnaireHome'
        });
        this.visNetworkData.edges.add({from: 'questionnaireHome', to: 'home', id: 'home08'});
    }

    private planSubGraphDisplay() {
        this.planDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'appointment',
            label: 'Appointment:\n Discussion on the results\n' + '12.03.2017',
            group: 'Appointment'
        });
        this.visNetworkData.edges.add({from: 'appointment', to: 'plan', id: 'plan01'});

        this.visNetworkData.nodes.add({
            id: 'medicationPlan',
            label: 'Meedication plan\n' + '12.03.2017',
            group: 'MedicationPlan'
        });
        this.visNetworkData.edges.add({from: 'medicationPlan', to: 'plan', id: 'plan02'});

        this.visNetworkData.nodes.add({
            id: 'activityPlan',
            label: 'Prescribed plan of activities\n' + '12.03.2017',
            group: 'ActivityPlan'
        });
        this.visNetworkData.edges.add({from: 'activityPlan', to: 'plan', id: 'plan03'});

        this.visNetworkData.nodes.add({
            id: 'questionnairePlan',
            label: 'Prescribed Questionnaires\n' + '12.01.2017',
            group: 'QuestionnairePlan'
        });
        this.visNetworkData.edges.add({from: 'questionnairePlan', to: 'plan', id: 'plan04'});
    }

    private questionnaireSubGraphDisplay(){
        this.questionairesDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'questionnaireFFbhHAQHome',
            label: 'FFbh/HAQ (at home)\n' + '11.03.2017',
            group: 'QuestionnaireHome'
        });
        this.visNetworkData.edges.add({from: 'questionnaireFFbhHAQHome', to: 'questionnaires', id: 'quest01'});

        this.visNetworkData.nodes.add({
            id: 'questionnaireRADAIHome',
            label: 'RADAI (at home)\n' + '09.03.2017',
            group: 'QuestionnaireHome'
        });
        this.visNetworkData.edges.add({from: 'questionnaireRADAIHome', to: 'questionnaires', id: 'quest02'});

        this.visNetworkData.nodes.add({
            id: 'questionnaireFFbhHAQClinic',
            label: 'FFbh/HAQ (at clinic)\n' + '01.03.2017',
            group: 'QuestionnaireClinic'
        });
        this.visNetworkData.edges.add({from: 'questionnaireFFbhHAQClinic', to: 'questionnaires', id: 'quest03'});

        this.visNetworkData.nodes.add({
            id: 'questionnaireRADAIClinic',
            label: 'RADAI (at clinic)\n' + '01.03.2017',
            group: 'QuestionnaireClinic'
        });
        this.visNetworkData.edges.add({from: 'questionnaireRADAIClinic', to: 'questionnaires', id: 'quest04'});

        this.visNetworkData.nodes.add({
            id: 'questionnaireMoriskyClinic',
            label: 'Morisky (at clinic)\n' + '01.03.2017',
            group: 'QuestionnaireClinic'
        });
        this.visNetworkData.edges.add({from: 'questionnaireMoriskyClinic', to: 'questionnaires', id: 'quest05'});
    }

    private psychoTestSubGraphDisplay(){

        this.psychoDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'memory',
            label: 'Memory\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'memory', to: 'psychoTest', id: 'psychoTest01'});

        this.visNetworkData.nodes.add({
            id: 'attention',
            label: 'Attention\n' + '08.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'attention', to: 'psychoTest', id: 'psychoTest02'});

        this.visNetworkData.nodes.add({
            id: 'language',
            label: 'Language\n' + '03.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'language', to: 'psychoTest', id: 'psychoTest03'});

        this.visNetworkData.nodes.add({
            id: 'psychoHealth',
            label: 'Psychological health:\n' + '15.10.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'psychoHealth', to: 'psychoTest', id: 'psychoTest04'});
    }

    private memorySubGraphDisplay(){
        this.memoryDisplayed = true;
        this.visNetworkData.nodes.add({
            id: '15words',
            label: 'Learning curve 15 words of Rey\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'memory', to: '15words', id: 'memory01'});

        this.visNetworkData.nodes.add({
            id: 'figureRecall',
            label: 'Recall of the figure of Rey - Osterrieth\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'memory', to: 'figureRecall', id: 'memory02'});

        this.visNetworkData.nodes.add({
            id: 'praxia',
            label: 'Praxia\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'memory', to: 'praxia', id: 'memory03'});

        this.visNetworkData.nodes.add({
            id: 'simpleDivided',
            label: 'Simple and Divided\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'memory', to: 'simpleDivided', id: 'memory04'});
    }

    private attentionSubGraphDisplay(){
        this.attentionDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'stroop',
            label: 'Stroop Reduced\n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'stroop', to: 'attention', id: 'attention01'});

        this.visNetworkData.nodes.add({
            id: 'trial',
            label: 'Trail Making A\n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'trial', to: 'attention', id: 'attention02'});

    }

    private languageSubGrpahDisplay() {
        this.languageDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'fluency',
            label: ' Test of Semantic Fluency\n' + '05.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'fluency', to: 'language', id: 'language01'});

        this.visNetworkData.nodes.add({
            id: 'cardSorting',
            label: ' Wisconsin Card Sorting Test\n' + '04.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'cardSorting', to: 'language', id: 'language02'});
    }

    private psychoHealthSubGraphDisplay(){

        this.psyHealthDisplayed = true;

        this.visNetworkData.nodes.add({
            id: 'hamiltonDepression',
            label: 'Hamilton Depression Rating Scale TOT\n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'hamiltonDepression', to: 'psychoHealth', id: 'pHealth01'});

        this.visNetworkData.nodes.add({
            id: 'beckDepression',
            label: 'Beck Depression Inventory TOT \n' + '01.02.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'beckDepression', to: 'psychoHealth', id: 'pHealth02'});

        this.visNetworkData.nodes.add({
            id: 's-hPleasure',
            label: 'Snaith-Hamilton Pleasure Scale \n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 's-hPleasure', to: 'psychoHealth', id: 'pHealth03'});

        this.visNetworkData.nodes.add({
            id: 'angerExpression',
            label: 'State-Trait Anger Expression Inventory TOT \n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'angerExpression', to: 'psychoHealth', id: 'pHealth04'});

        this.visNetworkData.nodes.add({
            id: 'parkinsonPsychosis',
            label: 'Parkinson Psychosis Rating Scale \n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'parkinsonPsychosis', to: 'psychoHealth', id: 'pHealth05'});

        this.visNetworkData.nodes.add({
            id: 'euroquol',
            label: 'Euroquol Rating Scale \n' + '01.05.2016',
            group: 'PsychologicalTest'
        });
        this.visNetworkData.edges.add({from: 'euroquol', to: 'psychoHealth', id: 'pHealth06'});
    }

    private imageSubGraphDisplay() {

        this.imagesDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'MRI',
            label: 'MRI\n' + '01.02.2017',
            group: 'PictureOrScan'
        });
        this.visNetworkData.edges.add({from: 'MRI', to: 'image', id: 'image01'});

        this.visNetworkData.nodes.add({
            id: 'DAT',
            label: 'DAT\n' + '21.02.2017',
            group: 'PictureOrScan'
        });
        this.visNetworkData.edges.add({from: 'DAT', to: 'image', id: 'image02'});

        this.visNetworkData.nodes.add({
            id: 'PET',
            label: 'PET\n' + '22.03.2016',
            group: 'PictureOrScan'
        });
        this.visNetworkData.edges.add({from: 'PET', to: 'image', id: 'image03'});

        this.visNetworkData.nodes.add({
            id: 'SPECT',
            label: 'SPECT\n' + '10.01.2017',
            group: 'PictureOrScan'
        });
        this.visNetworkData.edges.add({from: 'SPECT', to: 'image', id: 'image04'});
    }

    private cliMeasurementsSubGraphDisplay(){
        this.cliMeasurementsDisplayed = true;
        this.visNetworkData.nodes.add({
            id: 'ECG',
            label: 'ECG\n' + '01.02.2015',
            group: 'CliMeasurement'
        });
        this.visNetworkData.edges.add({from: 'ECG', to: 'cliMeasurements', id: 'cliM01'});

        this.visNetworkData.nodes.add({
            id: 'EEG',
            label: 'EEG\n' + '15.11.2016',
            group: 'CliMeasurement'
        });
        this.visNetworkData.edges.add({from: 'EEG', to: 'cliMeasurements', id: 'cliM02'});
    }

    private screeningSubGraphDisplay(){
        this.screeningsDisplayed = true;

        this.visNetworkData.nodes.add({
            id: 'painRating',
            label: 'Pain rating\n' + '03.01.2017',
            group: 'Screening'
        });
        this.visNetworkData.edges.add({from: 'painRating', to: 'screening', id: 'pain01'});

        this.visNetworkData.nodes.add({
            id: 'wellBeing',
            label: 'Well-Being rating\n' + '05.01.2017',
            group: 'Screening'
        });
        this.visNetworkData.edges.add({from: 'wellBeing', to: 'screening', id: 'pain02'});
    }

    private labSubgraphDisplay(){
        this.labDisplayed = true;
        let fakeLab = '21.02.2017';
        this.visNetworkData.nodes.add({
            id: 'bloodTest',
            label: 'Blood Analysis:\n' + fakeLab,
            group: 'BloodTest'
        });
        this.visNetworkData.edges.add({from: 'bloodTest', to: 'lab', id: 'lab01'});
        this.visNetworkData.nodes.add({
            id: 'urineTest',
            label: 'Urine exam:\n' + fakeLab,
            group: 'UrineTest'
        });
        this.visNetworkData.edges.add({from: 'urineTest', to: 'lab', id: 'lab02'});

        this.visNetworkData.nodes.add({
            id: 'histTest',
            label: 'Histology:\n' + '31.10.2015',
            group: 'BloodTest'
        });
        this.visNetworkData.edges.add({from: 'histTest', to: 'lab', id: 'lab03'});
    }

    private coreGraphDispaly(){
        //this.visNetworkService.
        let nodes = new VisNodes();
        let edges = new VisEdges();

        this.visNetworkData = {
            nodes: nodes,
            edges: edges
        };

        let fakeDateCP = '11.02.2017';
        let fakeDateHome = '12.03.2017';
        let fakeDatePlan = '01.02.2017';
        let fakeDateLab = '21.02.2017';

        this.visNetworkData.nodes.add({id: 'patient', label: 'Peter Patient\nID: 11010111', title: 'Patient', group: 'Patient'/*, x: 100, y: 100*/ });

        this.visNetworkData.nodes.add({id: 'carers', label: 'Care Professionals\n' + fakeDateCP, title: 'Care professionals category\n - Click to see sub-categories', group: 'groupCarers'});
        this.visNetworkData.edges.add({from: 'patient', to: 'carers', id: 'Patient01'});

        this.visNetworkData.nodes.add({id: 'home', label: 'Home Measurements\n and Recording\n'+fakeDateHome, title: 'Home monitoring data category\n - Click to see sub-categories', group: 'DataHome'});
        this.visNetworkData.edges.add({from: 'patient', to: 'home', id: 'Patient02'});

        this.visNetworkData.nodes.add({id: 'plan', label: 'Care Plans\n'+fakeDatePlan, title: 'Care plans data category\n - Click to see sub-categories', group: 'Plan'});
        this.visNetworkData.edges.add({from: 'patient', to: 'plan', id: 'Patient03'});

        this.visNetworkData.nodes.add({id: 'lab', label: 'Lab tests\n'+fakeDateLab,  title: 'Lab tests data category\n - Click to see sub-categories',  group: 'LabData'});
        this.visNetworkData.edges.add({from: 'patient', to: 'lab', id: 'Patient04'});

        this.visNetworkData.nodes.add({id: 'image', label: 'Images\n'+fakeDateLab, title: 'Images - Click to see sub-categories', group: 'PictureOrScan'});
        this.visNetworkData.edges.add({from: 'patient', to: 'image', id: 'Patient05'});

        this.visNetworkData.nodes.add({id: 'questionnaires', label: 'Questionnaires\n' + '11.03.2017', title: 'Questionnaires \n - Click to see sub-categories',group: 'Questionnaires'});
        this.visNetworkData.edges.add({from: 'questionnaires', to: 'patient', id: 'Patient06' });

        this.visNetworkData.nodes.add({id: 'psychoTest', label: 'Psychological and \nNeuropsychological Testing\n' + '15.10.2016', title: 'Psychological and Neuropsychological Testing\n - Click to see sub-categories', group: 'PsychologicalTest'});
        this.visNetworkData.edges.add({from: 'psychoTest', to: 'patient', id: 'Patient07' });

        this.visNetworkData.nodes.add({id: 'cliMeasurements', label: 'Clinical measurements\n' + '15.11.2016', title: 'Clinical measurements\n - Click to see sub-categories', group: 'CliMeasurement'});
        this.visNetworkData.edges.add({from: 'cliMeasurements', to: 'patient', id: 'Patient08' });

        this.visNetworkData.nodes.add({id: 'surgery', label: 'Surgeries\n' + '(no data)', title: 'Surgery\n - Click to see sub-categories', group: 'Surgery'});
        this.visNetworkData.edges.add({from: 'surgery', to: 'patient', id: 'Patient09' });

        this.visNetworkData.nodes.add({id: 'screening', label: 'Screening\n' + '05.01.2017', title: 'Screening\n - Click to see sub-categories', group: 'Screening'});
        this.visNetworkData.edges.add({from: 'screening', to: 'patient', id: 'Patient10' });

    }


    // NETWORK options //

    private setNetworkOptions(){
        let shadowOn = true;
        this.visNetworkOptions = {
            clickToUse: true,
            interaction: {
                hover: true,
                navigationButtons: true,
                keyboard: true},
            nodes: {
                color: {
                    border: 'grey',
                    highlight: '#7f96e3',
                    hover: '#8ba2f1'
                },
                borderWidth: 3,
                shadow: shadowOn,
                // hidden: true,
            },
            edges: {
                color: {
                    hover: '#2B7CE9',
                    highlight: '#000080'
                },
                title: 'blaaa',
                width: 1,
                shadow: shadowOn,
                smooth: true,
            },

            /*    physics: {
             "forceAtlas2Based": {
             "gravitationalConstant": -50,
             "springLength": 90,
             "avoidOverlap": 0.5
             },
             "minVelocity": 1.2,
             "solver": "forceAtlas2Based",
             "timestep": 0.5

             //TODO - more testing to employ physics:
             // http://visjs.org/examples/network/physics/physicsConfiguration.html

             },*/
            groups: {
                groupCarers: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c0', //&#xf1c0;
                        size: 60,
                        color: '#45ac8b'//'#45ac8b'//color blind schema #0064ac'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                    //shadow: false,
                    //border: '#2B7CE9', // nefunguje
                },
                Carer: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0f0',
                        size: 50,
                        color: '#45ac8b'//color blind schema #0064ac'
                    },

                    // hidden: true
                },
                Surgery: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf12a',
                        size: 50,
                        color: '#d17c3a'//color blind schema #0064ac'
                    }

                },

                Screening: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1de',
                        size: 50,
                        color: '#c0639d'//color blind schema #0064ac'
                    }
                },
                QuestionnaireClinic: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#228540'
                    }
                },
                Patient: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf183',
                        size: 137.5,
                        color: '#8C001A'//color blind schema #c2bc00
                    },
                    borderWidth: 2,

                },
                PictureOrScan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf03e',
                        size: (50*1.0),
                        color: '#52008c'//color blind schema #c2bc00
                    }
                },
                Plan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf15c', //&#xf1c0;
                        size: (60*1.00),
                        color: '#000080'
                    },
                    width: 2,
                    //shadow:true
                    highlight: true,

                },
                Appointment: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf073', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    }
                },
                Calendar: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf073', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    }
                },
                QuestionnairePlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    }
                },
                MedicationPlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0fa', //&#xf1c0;
                        size: (50*1.00),
                        color: '#000080'
                    }
                },
                Observation: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf201',
                        size: 50,
                        color: '#000080'
                    }
                },
                ActivityPlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf17d', //f1c0', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    }
                },
                DataHome: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015', //f1c0', //&#xf1c0;
                        size: (60*1.00),
                        color: '#2B65EC'
                    }
                },
                HomeActivity: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf17d', //f1c0', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },
                QuestionnaireHome: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },

                Questionnaires: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#090456'
                    }
                },
                PsychologicalTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf12e', //&#xf1c0;
                        size: 50,
                        color: '#120c29'
                    }
                },



                Data: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1c0', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },

                HomeHeart: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf21e', //&#xf1c0;
                        size: (50*1.00),
                        color: '#2B65EC'
                    }
                },
                HomeHistory: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1fe', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },
                BarHomeHistory: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf080', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },
                WeightHomeHistory: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0e4', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    }
                },
                CliMeasurement: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1fe', //&#xf1c0;
                        size: 50,
                        color: '#06d16f'
                    }
                },
                LabData: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3',
                        size: 60,
                        color: '#39b2ed'//#9276ff',//1F45FC' asi zhodne  CBS a obyc schemacolor blind schema #39b2ed
                    }
                },
                BloodTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#8b0000'
                    }
                },
                UrineTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#f9d616'
                    }
                },
            }


        };

    }


    private updateLastDispalayedGraphSetUp() {
        //console.log(this.homeDisplayed )
        //console.log(this.homeDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("homeDisplayed", this.homeDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("planDisplayed", this.planDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("carersDisplayed ", this.carersDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("questionairesDisplayed ", this.questionairesDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("imagesDisplayed", this.imagesDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("screeningsDisplayed", this.screeningsDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("cliMeasurementsDisplayed", this.cliMeasurementsDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("labDisplayed", this.labDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("psychoDisplayed", this.psychoDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("memoryDisplayed", this.memoryDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("attentionDisplayed", this.attentionDisplayed ? 'Displayed' : 'Inactive');sessionStorage.setItem("languageDisplayed", this.languageDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("psyHealthDisplayed", this.psyHealthDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("allDisplayed", this.allDisplayed ? 'Displayed' : 'Inactive');

    }
    private readLastDispalyedGraphSetUp(){
        //console.log(localStorage.getItem("homeDisplayed") == 'Displayed' ? true : false);
        this.homeDisplayed = sessionStorage.getItem("homeDisplayed") == 'Displayed' ? true : false;
        this.planDisplayed = sessionStorage.getItem("planDisplayed") == 'Displayed' ? true : false;
        this.carersDisplayed = sessionStorage.getItem("carersDisplayed ") == 'Displayed' ? true : false;
        this.questionairesDisplayed = sessionStorage.getItem("questionairesDisplayed ") == 'Displayed' ? true : false;
        this.imagesDisplayed = sessionStorage.getItem("imagesDisplayed") == 'Displayed' ? true : false;
        this.screeningsDisplayed = sessionStorage.getItem("screeningsDisplayed") == 'Displayed' ? true : false;
        this.cliMeasurementsDisplayed = sessionStorage.getItem("cliMeasurementsDisplayed") == 'Displayed' ? true : false;
        this.labDisplayed = sessionStorage.getItem("labDisplayed") == 'Displayed' ? true : false;
        this.psychoDisplayed = sessionStorage.getItem("psychoDisplayed") == 'Displayed' ? true : false;
        this.memoryDisplayed = sessionStorage.getItem("memoryDisplayed") == 'Displayed' ? true : false;
        this.attentionDisplayed = sessionStorage.getItem("attentionDisplayed") == 'Displayed' ? true : false;
        this.languageDisplayed = sessionStorage.getItem("languageDisplayed") == 'Displayed' ? true : false;
        this.psyHealthDisplayed = sessionStorage.getItem("psyHealthDisplayed") == 'Displayed' ? true : false;
        this.allDisplayed = sessionStorage.getItem("allDisplayed") == 'Displayed' ? true : false;

    }


    private carersCollapse(){
        this.carersDisplayed = false;
        this.visNetworkData.nodes.remove('cardiologist');
        this.visNetworkData.nodes.remove('rheumatologist');
        this.visNetworkData.nodes.remove('neurologist');
        this.visNetworkData.nodes.remove('neuropschologist');
        this.visNetworkData.nodes.remove('radiologist');
        this.visNetworkData.nodes.remove('gp');
        this.visNetworkData.edges.remove('carers01');
        this.visNetworkData.edges.remove('carers02');
        this.visNetworkData.edges.remove('carers03');
        this.visNetworkData.edges.remove('carers04');
        this.visNetworkData.edges.remove('carers05');
        this.visNetworkData.edges.remove('carers06');
    }

    private homeCollapse(){
        this.homeDisplayed = false;
        this.visNetworkData.nodes.remove('sugarHistory');
        this.visNetworkData.nodes.remove('saturationHistory');
        this.visNetworkData.nodes.remove('lungHistory');
        this.visNetworkData.nodes.remove('respirationHistory');
        this.visNetworkData.nodes.remove('weightHistory');
        this.visNetworkData.nodes.remove('homeHeart');
        this.visNetworkData.nodes.remove('homeActivity');
        this.visNetworkData.nodes.remove('questionnaireHome');
        this.visNetworkData.edges.remove('home01');
        this.visNetworkData.edges.remove('home02');
        this.visNetworkData.edges.remove('home03');
        this.visNetworkData.edges.remove('home04');
        this.visNetworkData.edges.remove('home05');
        this.visNetworkData.edges.remove('home06');
        this.visNetworkData.edges.remove('home07');
        this.visNetworkData.edges.remove('home08');
    }

    private planCollapse(){
        this.planDisplayed = false;
        this.visNetworkData.nodes.remove('appointment');
        this.visNetworkData.nodes.remove('medicationPlan');
        this.visNetworkData.nodes.remove('activityPlan');
        this.visNetworkData.nodes.remove('questionnairePlan');
        this.visNetworkData.edges.remove('plan01');
        this.visNetworkData.edges.remove('plan02');
        this.visNetworkData.edges.remove('plan03');
        this.visNetworkData.edges.remove('plan04');
    }

    private questionnaireCollapse(){
        this.questionairesDisplayed = false;
        this.visNetworkData.nodes.remove('questionnaireFFbhHAQHome');
        this.visNetworkData.nodes.remove('questionnaireRADAIHome');
        this.visNetworkData.nodes.remove('questionnaireFFbhHAQClinic');
        this.visNetworkData.nodes.remove('questionnaireRADAIClinic');
        this.visNetworkData.nodes.remove('questionnaireMoriskyClinic');
        this.visNetworkData.edges.remove('quest01');
        this.visNetworkData.edges.remove('quest02');
        this.visNetworkData.edges.remove('quest03');
        this.visNetworkData.edges.remove('quest04');
        this.visNetworkData.edges.remove('quest05');
    }

    private psychoTestCollapse(){
        this.psychoDisplayed = false;
        this.visNetworkData.nodes.remove('memory');
        this.visNetworkData.nodes.remove('attention');
        this.visNetworkData.nodes.remove('language');
        this.visNetworkData.nodes.remove('psychoHealth');
        this.visNetworkData.edges.remove('psychoTest01');
        this.visNetworkData.edges.remove('psychoTest02');
        this.visNetworkData.edges.remove('psychoTest03');
        this.visNetworkData.edges.remove('psychoTest04');
    }

    private memoryCollapse(){

        this.memoryDisplayed = false;
        this.visNetworkData.nodes.remove('15words');
        this.visNetworkData.nodes.remove('figureRecall');
        this.visNetworkData.nodes.remove('praxia');
        this.visNetworkData.nodes.remove('simpleDivided');
        this.visNetworkData.edges.remove('memory01');
        this.visNetworkData.edges.remove('memory02');
        this.visNetworkData.edges.remove('memory03');
        this.visNetworkData.edges.remove('memory04');

    }

    private attentionCollapse(){

        this.attentionDisplayed = false;
        this.visNetworkData.nodes.remove('stroop');
        this.visNetworkData.nodes.remove('trial');
        this.visNetworkData.edges.remove('attention01');
        this.visNetworkData.edges.remove('attention02');
    }

    private languageCollapse(){

        this.languageDisplayed = false;
        this.visNetworkData.nodes.remove('fluency');
        this.visNetworkData.nodes.remove('cardSorting');
        this.visNetworkData.edges.remove('language01');
        this.visNetworkData.edges.remove('language02');
    }

    private psychohealthCollapse(){
        this.psyHealthDisplayed = false;
        this.visNetworkData.nodes.remove('hamiltonDepression');
        this.visNetworkData.nodes.remove('beckDepression');
        this.visNetworkData.nodes.remove('angerExpression');
        this.visNetworkData.nodes.remove('parkinsonPsychosis');
        this.visNetworkData.nodes.remove('euroquol');
        this.visNetworkData.nodes.remove('s-hPleasure');
        this.visNetworkData.edges.remove('pHealth01');
        this.visNetworkData.edges.remove('pHealth02');
        this.visNetworkData.edges.remove('pHealth03');
        this.visNetworkData.edges.remove('pHealth04');
        this.visNetworkData.edges.remove('pHealth05');
        this.visNetworkData.edges.remove('pHealth06');
    }

    private imageCollapse(){
        this.imagesDisplayed = false;
        this.visNetworkData.nodes.remove('MRI');
        this.visNetworkData.nodes.remove('DAT');
        this.visNetworkData.nodes.remove('PET');
        this.visNetworkData.nodes.remove('SPECT');
        this.visNetworkData.edges.remove('image01');
        this.visNetworkData.edges.remove('image02');
        this.visNetworkData.edges.remove('image03');
        this.visNetworkData.edges.remove('image04');
    }

    private cliMeasurementsCollapse(){
        this.cliMeasurementsDisplayed = false;
        this.visNetworkData.nodes.remove('ECG');
        this.visNetworkData.nodes.remove('EEG');
        this.visNetworkData.edges.remove('cliM01');
        this.visNetworkData.edges.remove('cliM02');

    }

    private screeningCollapse(){
        this.screeningsDisplayed = false;
        this.visNetworkData.nodes.remove('painRating');
        this.visNetworkData.nodes.remove('wellBeing');
        this.visNetworkData.edges.remove('pain01');
        this.visNetworkData.edges.remove('pain02');
    }

    private labCollapse(){
        this.labDisplayed = false;
        this.visNetworkData.nodes.remove('bloodTest');
        this.visNetworkData.nodes.remove('urineTest');
        this.visNetworkData.nodes.remove('histTest');
        this.visNetworkData.edges.remove('lab01');
        this.visNetworkData.edges.remove('lab02');
        this.visNetworkData.edges.remove('lab03');
    }

    private coreCollapse(){

        this.visNetworkData.nodes.remove('patient');
        this.visNetworkData.nodes.remove('carers');
        this.visNetworkData.nodes.remove('home');
        this.visNetworkData.nodes.remove('plan');
        this.visNetworkData.nodes.remove('lab');
        this.visNetworkData.nodes.remove('image');
        this.visNetworkData.nodes.remove('questionnaires');
        this.visNetworkData.nodes.remove('psychoTest');
        this.visNetworkData.nodes.remove('cliMeasurements');
        this.visNetworkData.nodes.remove('screening');
        this.visNetworkData.edges.remove('Patient01');
        this.visNetworkData.edges.remove('Patient02');
        this.visNetworkData.edges.remove('Patient03');
        this.visNetworkData.edges.remove('Patient04');
        this.visNetworkData.edges.remove('Patient05');
        this.visNetworkData.edges.remove('Patient06');
        this.visNetworkData.edges.remove('Patient07');
        this.visNetworkData.edges.remove('Patient08');
        this.visNetworkData.edges.remove('Patient09');
        this.visNetworkData.edges.remove('Patient10');
    }


    //DISPALY LAST
    private displayLast(){
        this.coreGraphDispaly()
        //console.log(this.homeDisplayed);
        if (this.carersDisplayed) { this.carersSubGraphDisplay(); }
        //home
        if (this.homeDisplayed) { this.homeSubGraphDisplay(); }
        // PLAN
        if (this.planDisplayed) { this.planSubGraphDisplay(); }
        // questionnaires
        if (this.questionairesDisplayed) { this.questionnaireSubGraphDisplay();}
        // psycho tests (categories)
        if (this.psychoDisplayed) { this.psychoTestSubGraphDisplay(); }
        // MEMORY
        if (this.memoryDisplayed) { this.memorySubGraphDisplay(); }
        // ATTENTION
        if (this.attentionDisplayed) { this.attentionSubGraphDisplay(); }
        // Language
        if (this.languageDisplayed) { this.languageSubGrpahDisplay(); }
        // psycho health
        if (this.psyHealthDisplayed) { this.psychoHealthSubGraphDisplay(); }
        // IMAGE
        if (this.imagesDisplayed) { this.imageSubGraphDisplay(); }
        // cli maesurements - ECG EEG
        if (this.cliMeasurementsDisplayed) { this.cliMeasurementsSubGraphDisplay(); }
        // SCREENING
        if (this.screeningsDisplayed) { this.screeningSubGraphDisplay(); }
        // LAB
        if (this.labDisplayed) { this.labSubgraphDisplay(); }

        // this.visNetwork.fontsize(24).link('http://localhost:4200/#/clinician-dashboard')

        // this.visNetworkService.fit(this.visNetwork);



    }
    // DISPALY ALL subgrahs //
    public displayAll(): void {
        //let newId = this.visNetworkData.nodes.getLength() + 1;
        //   this.visNetworkData.nodes.add({id: newId.toString(), label: 'Node ' + newId});
        //this.visFitOptions = {};
        this.collapseAll();
        if (!this.carersDisplayed) { this.carersSubGraphDisplay(); }
        //home
        if (!this.homeDisplayed) { this.homeSubGraphDisplay(); }
        // PLAN
        if (!this.planDisplayed) { this.planSubGraphDisplay(); }
        // questionnaires
        if (!this.questionairesDisplayed) { this.questionnaireSubGraphDisplay();}
        // psycho tests (categories)
        if (!this.psychoDisplayed) { this.psychoTestSubGraphDisplay(); }
        // MEMORY
        if (!this.memoryDisplayed) { this.memorySubGraphDisplay(); }
        // ATTENTION
        if (!this.attentionDisplayed) { this.attentionSubGraphDisplay(); }
        // Language
        if (!this.languageDisplayed) { this.languageSubGrpahDisplay(); }
        // psycho health
        if (!this.psyHealthDisplayed) { this.psychoHealthSubGraphDisplay(); }
        // IMAGE
        if (!this.imagesDisplayed) { this.imageSubGraphDisplay(); }
        // cli maesurements - ECG EEG
        if (!this.cliMeasurementsDisplayed) { this.cliMeasurementsSubGraphDisplay(); }
        // SCREENING
        if (!this.screeningsDisplayed) { this.screeningSubGraphDisplay(); }
        // LAB
        if (!this.labDisplayed) { this.labSubgraphDisplay(); }
        this.allDisplayed = true;
        this.updateLastDispalayedGraphSetUp()

        this.visNetworkService.fit(this.visNetwork);
    }

    public collapseAll(): void {

        // care proffesionals
        if(this.carersDisplayed) { this.carersCollapse() }
        // home
        if(this.homeDisplayed) { this.homeCollapse() }
        // plan
        if(this.planDisplayed) { this.planCollapse() }
        // questionnaire
        if(this.questionairesDisplayed) { this.questionnaireCollapse() }
        // psycho test with memory, attention, language, psych health
        if(this.psychoDisplayed) {
            this.psychoTestCollapse()
            // memory
            if(this.memoryDisplayed) { this.memoryCollapse() }
            // attention
            if(this.attentionDisplayed) { this.attentionCollapse() }
            // language
            if(this.languageDisplayed) { this.languageCollapse() }
            //psycho health
            if(this.psyHealthDisplayed) { this.psychohealthCollapse() }
        }
        // IMAGE
        if(this.imagesDisplayed) { this.imageCollapse() }
        // cli measurements
        if(this.cliMeasurementsDisplayed) { this.cliMeasurementsCollapse() }
        // SCREENING
        if(this.screeningsDisplayed) { this.screeningCollapse() }
        // LAB
        if(this.labDisplayed) { this.labCollapse()  }

        this.allDisplayed = false;
        this.updateLastDispalayedGraphSetUp()
        // display core graph
        this.coreCollapse()
        this.coreGraphDispaly(); //ngOnInit();
        this.visNetworkService.fit(this.visNetwork);

    }

    public networkInitialized() {
        this.visNetworkService.redraw(this.visNetwork)
        // now we can use the service to register on events
        this.visNetworkService.on(this.visNetwork, 'click');
        //doubleClick
        this.visNetworkService.on(this.visNetwork, 'doubleClick');
        this.visNetworkService.on(this.visNetwork, 'stabilizationIterationsDone')

        // open your console/dev tools to see the click params
        this.visNetworkService.click
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    // CARERS
                    if (eventData[1].nodes == "carers") {
                        if (!this.carersDisplayed) {
                            this.carersSubGraphDisplay()
                        }
                        else {
                            this.carersCollapse()
                        }
                    }
                    // HOME
                    if (eventData[1].nodes == "home") {
                        if (!this.homeDisplayed) {
                            this.homeSubGraphDisplay();
                        }
                        else {
                            this.homeCollapse()
                        }
                    }
                    //plan
                    if (eventData[1].nodes == "plan") {
                        if (!this.planDisplayed) {
                            this.planSubGraphDisplay();
                        }
                        else {
                            this.planCollapse()
                        }
                    }
                    //questionnaires
                    if (eventData[1].nodes == "questionnaires") {
                        if (!this.questionairesDisplayed) {
                            this.questionnaireSubGraphDisplay();
                        }
                        else {
                            this.questionnaireCollapse()
                        }
                    }
                    //PSYCHOTEST//
                    if (eventData[1].nodes == "psychoTest") {
                        if (!this.psychoDisplayed) {
                            this.psychoTestSubGraphDisplay();
                        }
                        else {
                            if (this.memoryDisplayed) {
                                this.memoryCollapse()
                            }
                            if (this.attentionDisplayed) {
                                this.attentionCollapse()
                            }
                            if (this.languageDisplayed) {
                                this.languageCollapse()
                            }
                            if (this.psyHealthDisplayed) {
                                this.psychohealthCollapse()
                            }
                            this.psychoTestCollapse();
                        }
                    }
                    // MEMORY //
                    if (eventData[1].nodes == "memory") {
                        if (!this.memoryDisplayed) {
                            this.memorySubGraphDisplay();
                        }
                        else {
                            this.memoryCollapse()
                        }
                    }
                    // ATTENTION //
                    if (eventData[1].nodes == "attention") {
                        if (!this.attentionDisplayed) {
                            this.attentionSubGraphDisplay();
                        }
                        else {
                            this.attentionCollapse()
                        }
                    }
                    // LANGUAGE //
                    if (eventData[1].nodes == "language") {
                        if (!this.languageDisplayed) {
                            this.languageSubGrpahDisplay();
                        }
                        else {
                            this.languageCollapse()
                        }
                    }
                    // PSYCHO HEALTH //
                    if (eventData[1].nodes == "psychoHealth") {
                        if (!this.psyHealthDisplayed) {
                            this.psychoHealthSubGraphDisplay();
                        }
                        else {
                            this.psychohealthCollapse()
                        }
                    }
                    //IMAGE
                    if (eventData[1].nodes == "image") {
                        if (!this.imagesDisplayed) {
                            this.imageSubGraphDisplay();
                        }
                        else {
                            this.imageCollapse()
                        }
                    }
                    // cliMeasurements ECG, EEG
                    if (eventData[1].nodes == "cliMeasurements") {
                        if (!this.cliMeasurementsDisplayed) {
                            this.cliMeasurementsSubGraphDisplay();
                        }
                        else {
                            this.cliMeasurementsCollapse()
                        }
                    }
                    // SCREENING
                    if (eventData[1].nodes == "screening") {
                        if (!this.screeningsDisplayed) {
                            this.screeningSubGraphDisplay();
                        }
                        else {
                            this.screeningCollapse()
                        }
                    }
                    // LAB
                    if (eventData[1].nodes == "lab") {
                        // console.log(eventData[1].nodes);
                        if (!this.labDisplayed) {
                            this.labSubgraphDisplay()
                        }
                        else {
                            this.labCollapse()
                        }
                    }
                    this.updateLastDispalayedGraphSetUp()
                    console.log(eventData[1].nodes);
                    if (eventData[1].nodes == "patient"
                        || eventData[1].nodes == ""
                        || eventData[1].nodes == "lab"
                        || eventData[1].nodes == "screening"
                        || eventData[1].nodes == "cliMeasurements"
                        || eventData[1].nodes == "image"
                        || eventData[1].nodes == "psychoHealth"
                        || eventData[1].nodes == "language"
                        || eventData[1].nodes == "attention"
                        || eventData[1].nodes == "memory"
                        || eventData[1].nodes == "psychoTest"
                        || eventData[1].nodes == "questionnaires"
                        || eventData[1].nodes == "plan"
                        || eventData[1].nodes == "carers"
                        || eventData[1].nodes == "home"
                    ) {
                        this.visNetworkService.fit(this.visNetwork)
                    }

                    //   this.visNetworkService.redraw(this.visNetwork)
                }
            });

        // ********** DOUBLE CLICK ********* //

        // open your console/dev tools to see the click params
        this.visNetworkService.doubleClick
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    console.log(eventData[1].nodes);

                    if (eventData[1].nodes=="patient"){
                        // console.log(eventData[1].nodes);
                        this.visNetworkService.blurEdge
                        this.visNetworkService.blurNode
                        // waits(10)
                        if(!this.allDisplayed){
                            this.displayAll();
                        }else {
                            this.collapseAll();
                        }
                    }
                    if (eventData[1].nodes=="carers"){

                        // console.log(eventData[1].nodes);
                        //TODO ?
                        //this.visNetworkService.fit(this.visNetwork);


                    }
                    if (eventData[1].nodes=="home"){
                        // console.log(eventData[1].nodes);

                        // TODO navigation towards Clinitian Manager
                        //  templateUrl: './data-resource-browser-card.component.html',

                        //this.visNetworkService.fit(this.visNetwork);

                    }
                    if (eventData[1].nodes=="plan"){
                        // console.log(eventData[1].nodes);
                        // TODO navigation towards Narrative Manager

                        //this.visNetworkService.fit(this.visNetwork);
                        // loadPage("narratives-manager.html");

                    }
                    if (eventData[1].nodes=="cardiologist"){
                        console.log(eventData[1].nodes);
                        let nodesInit = new VisNodes();
                        let edgesInit = new VisEdges();
                        this.visNetworkData = {
                            nodes: nodesInit,
                            edges: edgesInit
                        };
                        this.visNetworkData.nodes.add({id: 'cardiologist1', label: 'Cardiologist', group: 'Carer'});

                        this.visNetworkData.nodes.add({id: 'medicationPlan1', label: 'Meedication\n plan' + '22.01.2017', group: 'MedicationPlan'});
                        this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'cardiologist1', id: 'card01' });


                        this.visNetworkData.nodes.add({id: 'appointment1', label: 'Appointment:\n Discussion on the results\n' + '22.01.2017', group: 'Appointment'});
                        this.visNetworkData.edges.add({from: 'appointment1', to: 'cardiologist1', id: 'card02' });

                        //  this.visNetworkService.fit(this.visNetwork);

                    }
                    if (eventData[1].nodes=="rheumatologist"){
                        console.log(eventData[1].nodes);
                        //this.visNetworkData.nodes.();
                        //this.visNetworkData.edges.flush();
                        let nodesInit = new VisNodes();
                        let edgesInit = new VisEdges();
                        this.visNetworkData = {
                            nodes: nodesInit,
                            edges: edgesInit
                        };

                        this.visNetworkData.nodes.add({id: 'rheumatologist1', label: 'Rheumatologists', group: 'Carer'});
                        this.visNetworkData.nodes.add({id: 'appointment1', label: 'Appointment:\n Discussion on the results\n' + '27.02.2017', group: 'Appointment'});
                        this.visNetworkData.edges.add({from: 'appointment1', to: 'rheumatologist1', id: 'rhe01'});

                        this.visNetworkData.nodes.add({id: 'medicationPlan1', label: 'Meedication\n plan' + '27.02.2017', group: 'MedicationPlan'});
                        this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'rheumatologist1', id: 'rhe02' });

                        this.visNetworkData.nodes.add({id: 'activityPlan1', label: 'Prescribed plan of activities\n' + '27.02.2017', group: 'ActivityPlan'});
                        this.visNetworkData.edges.add({from: 'activityPlan1', to: 'rheumatologist1', id: 'rhe03' });

                        this.visNetworkData.nodes.add({id: 'picture1', label: 'Image' + '12.10.2016', title: 'Picture or Scanned document', group: 'PictureOrScan'});
                        this.visNetworkData.edges.add({from: 'picture1', to: 'rheumatologist1' , id: 'rhe04' });


                        // this.visNetworkData.edges.add({from: '', to: '' });

                        //  this.visNetworkService.fit(this.visNetwork);

                    }
                    if (eventData[1].nodes=="rheumatologist1") {
                        console.log(eventData[1].nodes);
                        this.visNetworkData.nodes.remove('rheumatologist1');
                        this.visNetworkData.nodes.remove('medicationPlan1');
                        this.visNetworkData.nodes.remove('activityPlan1');
                        this.visNetworkData.nodes.remove('picture1');
                        this.visNetworkData.edges.remove('rhe01');
                        this.visNetworkData.edges.remove('rhe02');
                        this.visNetworkData.edges.remove('rhe03');
                        this.visNetworkData.edges.remove('rhe04');
                        this.displayLast();

                        //this.visNetworkService.fit(this.visNetwork);
                    }
                    if (eventData[1].nodes=="cardiologist1") {
                        console.log(eventData[1].nodes);

                        this.visNetworkData.nodes.remove('activityPlan1');
                        this.visNetworkData.nodes.remove('picture1');
                        this.visNetworkData.nodes.remove('cardiologist1');
                        this.visNetworkData.edges.remove('card01');
                        this.visNetworkData.edges.remove('card02');
                        this.displayLast();

                    }
                    if (eventData[1].nodes=="sugarHistory"
                        || eventData[1].nodes=="saturationHistory"
                        || eventData[1].nodes=="lungHistory"
                        || eventData[1].nodes=="respirationHistory"
                        || eventData[1].nodes=="weightHistory"
                        || eventData[1].nodes=="homeHeart"
                        || eventData[1].nodes=="homeActivity"
                        || eventData[1].nodes=="questionnaireHome"
                    ){
                        this.router.navigate(['/clinician-manager'])
                        // TODO navigation towards Clinitian Manager - specifically for Home monitoring
                    }
                    //heree
                    if (eventData[1].nodes == "questionnaireFFbhHAQHome"
                        || eventData[1].nodes == "questionnaireRADAIHome"
                        || eventData[1].nodes == "questionnaireFFbhHAQClinic"
                        || eventData[1].nodes == "questionnaireRADAIClinic"
                        || eventData[1].nodes == "questionnaireMoriskyClinic"
                        || eventData[1].nodes == "MRI"
                        || eventData[1].nodes == "DAT"
                        || eventData[1].nodes == "PET"
                        || eventData[1].nodes == "SPECT"
                        || eventData[1].nodes == "ECG"
                        || eventData[1].nodes == "EEG"
                        || eventData[1].nodes == "painRating"
                        || eventData[1].nodes == "wellBeing"
                        || eventData[1].nodes == "bloodTest"
                        || eventData[1].nodes == "urineTest"
                        || eventData[1].nodes == "histTest"

                    ) {
                        this.router.navigate(['/clinician-manager'])
                        // TODO navigation towards Clinitian Manager - specifically for Home monitoring
                    }
                    if (eventData[1].nodes=="appointment"
                        || eventData[1].nodes=="medicationPlan"
                        || eventData[1].nodes=="activityPlan"
                        || eventData[1].nodes=="questionnairePlan"
                    ){
                        this.router.navigate(['/narratives-manager'])

                        // TODO navigation towards Narrative Manager
                    }
                }
                this.updateLastDispalayedGraphSetUp()

            });
        this.visNetworkService.fit(this.visNetwork);

    }

    public ngOnInit() {


        //  double click presmerovanie parked
        this.readLastDispalyedGraphSetUp()
        this.displayLast();
        this.setNetworkOptions();


    }

    public ngOnDestroy(): void {
        //localStorage.clear();
        this.visNetworkService.off(this.visNetwork, 'click');
    }
}














































