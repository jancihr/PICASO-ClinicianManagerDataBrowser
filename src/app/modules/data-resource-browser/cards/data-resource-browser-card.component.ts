///<reference path="../../../../../node_modules/ng2-vis/components/network/index.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Routes,
    RouterModule }             from '@angular/router';

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

    public constructor(private visNetworkService: VisNetworkService) {
    }

    public addNode(): void {
        let newId = this.visNetworkData.nodes.getLength() + 1;
        let fakeDate = '11.02.2017';
     //   this.visNetworkData.nodes.add({id: newId.toString(), label: 'Node ' + newId});
        //this.visFitOptions = {};

            //let idNew : string = newId.toString() ;

        this.visNetworkData.nodes.add({id: 'sugarHistory', label: 'Blood Sugar Level \nHome Measurements', group: 'HomeHistory'});
        this.visNetworkData.edges.add({from: 'sugarHistory', to: 'home' });
        this.visNetworkData.nodes.add({id: 'saturationHistory', label: 'Saturation Home \nMeasurements', group: 'HomeHistory'});
        this.visNetworkData.edges.add({from: 'saturationHistory', to: 'home' });
        this.visNetworkData.nodes.add({id: 'lungHistory', label: 'Lung Capacity \nHome Measurements', group: 'BarHomeHistory'});
        this.visNetworkData.edges.add({from: 'lungHistory', to: 'home' });
        this.visNetworkData.nodes.add({id: 'respirationHistory', label: 'Respiration Rate \nHome Measurements', group: 'BarHomeHistory'});
        this.visNetworkData.edges.add({from: 'respirationHistory', to: 'home' });
        this.visNetworkData.nodes.add({id: 'weightHistory', label: 'Weight Home \nMeasurements', group: 'HomeHistory'});
        this.visNetworkData.edges.add({from: 'weightHistory', to: 'home' });
        this.visNetworkData.nodes.add({id: 'homeHeart', label: 'Blood Pressure and Heart rate \nHome Measurements', group: 'HomeHeart'});
        this.visNetworkData.edges.add({from: 'homeHeart', to: 'home' });
        this.visNetworkData.nodes.add({id: 'homeActivity', label: 'Activity  Monitoring\n at Home', group: 'HomeActivity'});
        this.visNetworkData.edges.add({from: 'homeActivity', to: 'home' });
        this.visNetworkData.nodes.add({id: 'questionnaireHome', label: 'Questionnaires Answered', group: 'QuestionnaireHome'});
        this.visNetworkData.edges.add({from: 'questionnaireHome', to: 'home' });


        this.visNetworkData.nodes.add({id: 'appointment', label: 'Appointment:\n Discussion on the results', group: 'Appointment'});
        this.visNetworkData.edges.add({from: 'appointment', to: 'plan' });

        this.visNetworkData.nodes.add({id: 'medicationPlan', label: 'Meedication\n plan', group: 'MedicationPlan'});
        this.visNetworkData.edges.add({from: 'medicationPlan', to: 'plan' });

        this.visNetworkData.nodes.add({id: 'activityPlan', label: 'Prescribed\n plan of activities', group: 'ActivityPlan'});
        this.visNetworkData.edges.add({from: 'activityPlan', to: 'plan' });

        this.visNetworkData.nodes.add({id: 'questionnairePlan', label: 'Prescribed Questionnaires', group: 'QuestionnairePlan'});
        this.visNetworkData.edges.add({from: 'questionnairePlan', to: 'plan' });

        this.visNetworkData.nodes.add({id: 'rheumatologist', label: 'Rheumatologists\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'rheumatologist', to: 'carers' });

        this.visNetworkData.nodes.add({id: 'cardiologist', label: 'Cardiologist\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'cardiologist', to: 'carers' });

        this.visNetworkData.nodes.add({id: 'neurologist', label: 'Neurologist\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'neurologist', to: 'carers' });

        this.visNetworkData.nodes.add({id: 'neuropschologist', label: 'Neuropschologist\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'neuropschologist', to: 'carers' });

        this.visNetworkData.nodes.add({id: 'radiologist', label: 'Radiologist\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'radiologist', to: 'carers' });

        this.visNetworkData.nodes.add({id: 'gp', label: 'General Practitioner\n'+fakeDate, group: 'Carer'});
        this.visNetworkData.edges.add({from: 'gp', to: 'carers' });

        this.visNetworkService.fit(this.visNetwork);
      //  {id: '7', label: 'Blood Pressure Home \nMeasurements', group: 'heartData'},
        //{id: '8', label: 'Appointment:\n Discussion on the results...', group: 'calendar'},
        //{id: '9', label: 'Meedication\n plan', group: 'treatmentMedication'},
        //{id: '10', label: 'Observation:\n Use BPM at home', group: 'observation'},
        //{id: '11', label: 'Cardiologists', group: 'userDoctor'},
        //{id: '12', label: 'Rheumatologists', group: 'userDoctor'},
        //{id: '13', label: 'Activity  Monitoring\n at Home', group: 'dataActivityHome'},
        //{id: '14', label: 'Picture or \nScanned Document', title: 'Picture or Scanned document', group: 'pictureOrScan'},
        }

    public networkInitialized() {
    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetwork, 'click');
    //doubleClick
    this.visNetworkService.on(this.visNetwork, 'doubleClick');

    // open your console/dev tools to see the click params
    this.visNetworkService.click
        .subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetwork) {
                //console.log(eventData[1].nodes);
                if (eventData[1].nodes=="carers"){
                    let fakeDate = '11.02.2017'
                    let fakeDateCard = '11.11.2016'
                  //  this.networkInitialized();
                    if(!(this.visNetworkData.nodes.getById('cardiologist')
                        || this.visNetworkData.nodes.getById('rheumatologist')
                        || this.visNetworkData.nodes.getById('neurologist')
                        || this.visNetworkData.nodes.getById('neuropschologist')
                        || this.visNetworkData.nodes.getById('radiologist')
                        || this.visNetworkData.nodes.getById('gp'))
                    ) {
                        // console.log( newId);

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


                        //Neurologist, Neuropschologist, Radiologist,
                        //General Practitioner
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

                        this.visNetworkService.fit(this.visNetwork);
                    }
                    else{
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

                }
                //HOME
                if (eventData[1].nodes=="home"){
                    if(!(this.visNetworkData.nodes.getById('sugarHistory')
                        || this.visNetworkData.nodes.getById('saturationHistory')
                        || this.visNetworkData.nodes.getById('lungHistory')
                        || this.visNetworkData.nodes.getById('respirationHistory')
                        || this.visNetworkData.nodes.getById('weightHistory')
                        || this.visNetworkData.nodes.getById('homeHeart')
                        || this.visNetworkData.nodes.getById('homeActivity')
                        || this.visNetworkData.nodes.getById('questionnaireHome')
                        )
                    ) { //if none node exists add nodes
                        // console.log(eventData[1].nodes);
                        this.visNetworkData.nodes.add({
                            id: 'sugarHistory',
                            label: 'Blood Sugar Level \nHome Measurements',
                            group: 'HomeHistory'
                        });
                        this.visNetworkData.edges.add({from: 'sugarHistory', to: 'home', id: 'home01'});
                        this.visNetworkData.nodes.add({
                            id: 'saturationHistory',
                            label: 'Saturation Home \nMeasurements',
                            group: 'HomeHistory'
                        });
                        this.visNetworkData.edges.add({from: 'saturationHistory', to: 'home', id: 'home02'});
                        this.visNetworkData.nodes.add({
                            id: 'lungHistory',
                            label: 'Lung Capacity \nHome Measurements',
                            group: 'BarHomeHistory'
                        });
                        this.visNetworkData.edges.add({from: 'lungHistory', to: 'home', id: 'home03'});
                        this.visNetworkData.nodes.add({
                            id: 'respirationHistory',
                            label: 'Respiration Rate \nHome Measurements',
                            group: 'BarHomeHistory'
                        });
                        this.visNetworkData.edges.add({from: 'respirationHistory', to: 'home', id: 'home04'});
                        this.visNetworkData.nodes.add({
                            id: 'weightHistory',
                            label: 'Weight Home \nMeasurements',
                            group: 'WeightHomeHistory'
                        });
                        this.visNetworkData.edges.add({from: 'weightHistory', to: 'home', id: 'home05'});
                        this.visNetworkData.nodes.add({
                            id: 'homeHeart',
                            label: 'Blood Pressure and Heart rate \nHome Measurements',
                            group: 'HomeHeart'
                        });
                        this.visNetworkData.edges.add({from: 'homeHeart', to: 'home', id: 'home06'});
                        this.visNetworkData.nodes.add({
                            id: 'homeActivity',
                            label: 'Activity  Monitoring\n at Home',
                            group: 'HomeActivity'
                        });
                        this.visNetworkData.edges.add({from: 'homeActivity', to: 'home', id: 'home07'});
                        this.visNetworkData.nodes.add({
                            id: 'questionnaireHome',
                            label: 'Questionnaires Answered',
                            group: 'QuestionnaireHome'
                        });
                        this.visNetworkData.edges.add({from: 'questionnaireHome', to: 'home', id: 'home08'});

                    }
                    else{
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


                    this.visNetworkService.fit(this.visNetwork);


                }
                if (eventData[1].nodes=="plan"){
                    if(!(this.visNetworkData.nodes.getById('appointment')
                            || this.visNetworkData.nodes.getById('medicationPlan')
                            || this.visNetworkData.nodes.getById('activityPlan')
                            || this.visNetworkData.nodes.getById('questionnairePlan')
                        )
                    ) {
                        // console.log(eventData[1].nodes);
                        this.visNetworkData.nodes.add({
                            id: 'appointment',
                            label: 'Appointment:\n Discussion on the results',
                            group: 'Appointment'
                        });
                        this.visNetworkData.edges.add({from: 'appointment', to: 'plan', id: 'plan01'});

                        this.visNetworkData.nodes.add({
                            id: 'medicationPlan',
                            label: 'Meedication\n plan',
                            group: 'MedicationPlan'
                        });
                        this.visNetworkData.edges.add({from: 'medicationPlan', to: 'plan', id: 'plan02'});

                        this.visNetworkData.nodes.add({
                            id: 'activityPlan',
                            label: 'Prescribed\n plan of activities',
                            group: 'ActivityPlan'
                        });
                        this.visNetworkData.edges.add({from: 'activityPlan', to: 'plan', id: 'plan03'});

                        this.visNetworkData.nodes.add({
                            id: 'questionnairePlan',
                            label: 'Prescribed Questionnaires',
                            group: 'QuestionnairePlan'
                        });
                        this.visNetworkData.edges.add({from: 'questionnairePlan', to: 'plan', id: 'plan04'});

                        this.visNetworkService.fit(this.visNetwork);
                    }
                    else{
                        this.visNetworkData.nodes.remove('appointment');
                        this.visNetworkData.nodes.remove('medicationPlan');
                        this.visNetworkData.nodes.remove('activityPlan');
                        this.visNetworkData.nodes.remove('questionnairePlan');

                        this.visNetworkData.edges.remove('plan01');
                        this.visNetworkData.edges.remove('plan02');
                        this.visNetworkData.edges.remove('plan03');
                        this.visNetworkData.edges.remove('plan04');
                    }

                    this.visNetworkService.fit(this.visNetwork);


                }
                if (eventData[1].nodes=="questionnaires"){
                    if(!(this.visNetworkData.nodes.getById('questionnaireFFbhHAQHome')
                            || this.visNetworkData.nodes.getById('questionnaireRADAIHome')
                            || this.visNetworkData.nodes.getById('questionnaireFFbhHAQClinic')
                            || this.visNetworkData.nodes.getById('questionnaireRADAIClinic')
                            || this.visNetworkData.nodes.getById('questionnaireMoriskyClinic')
                        )
                    ) {
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
                    else{
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

                    this.visNetworkService.fit(this.visNetwork);

                }
                //PSYCHOTEST//
                if (eventData[1].nodes=="psychoTest"){
                    //this.visNetworkData.edges.remove('Patient3');
                   // this.visNetworkData.nodes.remove('home');
                    if(!(this.visNetworkData.nodes.getById('memory')
                            || this.visNetworkData.nodes.getById('attention')
                            || this.visNetworkData.nodes.getById('language')
                            || this.visNetworkData.nodes.getById('psychoHealth')
                        )
                    ) {
                        console.log(this.visNetworkData.edges.getLength());

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

                        this.visNetworkService.fit(this.visNetwork);
                    }
                    else { // REMOVE nodes and edges
                        this.visNetworkData.nodes.remove('memory');
                        this.visNetworkData.nodes.remove('attention');
                        this.visNetworkData.nodes.remove('language');
                        this.visNetworkData.nodes.remove('psychoHealth');
                        this.visNetworkData.edges.remove('psychoTest01');
                        this.visNetworkData.edges.remove('psychoTest02');
                        this.visNetworkData.edges.remove('psychoTest03');
                        this.visNetworkData.edges.remove('psychoTest04');

                        this.visNetworkData.nodes.remove('15words');
                        this.visNetworkData.nodes.remove('figureRecall');
                        this.visNetworkData.nodes.remove('praxia');
                        this.visNetworkData.nodes.remove('simpleDivided');
                        this.visNetworkData.edges.remove('memory01');
                        this.visNetworkData.edges.remove('memory02');
                        this.visNetworkData.edges.remove('memory03');
                        this.visNetworkData.edges.remove('memory04');

                        this.visNetworkData.nodes.remove('stroop');
                        this.visNetworkData.nodes.remove('trial');
                        this.visNetworkData.edges.remove('attention01');
                        this.visNetworkData.edges.remove('attention02');

                        this.visNetworkData.nodes.remove('fluency');
                        this.visNetworkData.nodes.remove('cardSorting');
                        this.visNetworkData.edges.remove('language01');
                        this.visNetworkData.edges.remove('language02');

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
                }
                // MEMORY //
                if (eventData[1].nodes=="memory"){
                    if(!(this.visNetworkData.nodes.getById('15words')
                            || this.visNetworkData.nodes.getById('figureRecall')
                            || this.visNetworkData.nodes.getById('praxia')
                            || this.visNetworkData.nodes.getById('simpleDivided')
                        )
                    ) {
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


                        this.visNetworkService.fit(this.visNetwork);
                    }
                else { // REMOVE nodes and edges
                    this.visNetworkData.nodes.remove('15words');
                    this.visNetworkData.nodes.remove('figureRecall');
                    this.visNetworkData.nodes.remove('praxia');
                    this.visNetworkData.nodes.remove('simpleDivided');
                    this.visNetworkData.edges.remove('memory01');
                    this.visNetworkData.edges.remove('memory02');
                    this.visNetworkData.edges.remove('memory03');
                    this.visNetworkData.edges.remove('memory04');

                }
                }

                // ATTENTION //

                if (eventData[1].nodes=="attention"){
                    if(!(this.visNetworkData.nodes.getById('stroop')
                            || this.visNetworkData.nodes.getById('trial')
                        )
                    ) {
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
                    else{ //remove nodes and edges
                        this.visNetworkData.nodes.remove('stroop');
                        this.visNetworkData.nodes.remove('trial');
                        this.visNetworkData.edges.remove('attention01');
                        this.visNetworkData.edges.remove('attention02');
                    }

                    this.visNetworkService.fit(this.visNetwork);
                }
                // LANGUAGE //
                if (eventData[1].nodes=="language"){
                    if(!(this.visNetworkData.nodes.getById('fluency')
                            || this.visNetworkData.nodes.getById('cardSorting')
                        )
                    ) {
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
                else{//remove nodes and edges
                    this.visNetworkData.nodes.remove('fluency');
                    this.visNetworkData.nodes.remove('cardSorting');
                    this.visNetworkData.edges.remove('language01');
                    this.visNetworkData.edges.remove('language02');
                }

                        this.visNetworkService.fit(this.visNetwork);
                }

                // PSYCHO HEALTH //
                if (eventData[1].nodes=="psychoHealth"){
                    if(!(this.visNetworkData.nodes.getById('hamiltonDepression')
                            || this.visNetworkData.nodes.getById('beckDepression')
                            || this.visNetworkData.nodes.getById('s-hPleasure')
                            || this.visNetworkData.nodes.getById('angerExpression')
                            || this.visNetworkData.nodes.getById('parkinsonPsychosis')
                            || this.visNetworkData.nodes.getById('euroquol')
                        )
                    ) {
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
                        this.visNetworkData.edges.add({from: 'parkinsonPsychosis', to: 'psychoHealth',  id: 'pHealth05'});

                        this.visNetworkData.nodes.add({
                            id: 'euroquol',
                            label: 'Euroquol Rating Scale \n' + '01.05.2016',
                            group: 'PsychologicalTest'
                        });
                        this.visNetworkData.edges.add({from: 'euroquol', to: 'psychoHealth', id: 'pHealth06'});

//  Hamilton Depression Rating Scale TOT, Beck Depression Inventory TOT, Snaith-Hamilton Pleasure Scale, State-Trait Anger Expression Inventory TOT,
//  Parkinson Psychosis Rating Scale, Euroquol Rating Scale
                    }
                else{//remove nodes and edges
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

                    this.visNetworkService.fit(this.visNetwork);
                }
                if (eventData[1].nodes=="image"){
                    if(!(this.visNetworkData.nodes.getById('MRI')
                            || this.visNetworkData.nodes.getById('DAT')
                            || this.visNetworkData.nodes.getById('PET')
                            || this.visNetworkData.nodes.getById('SPECT')
                        )
                    ) {
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
                    else{
                        this.visNetworkData.nodes.remove('MRI');
                        this.visNetworkData.nodes.remove('DAT');
                        this.visNetworkData.nodes.remove('PET');
                        this.visNetworkData.nodes.remove('SPECT');

                        this.visNetworkData.edges.remove('image01');
                        this.visNetworkData.edges.remove('image02');
                        this.visNetworkData.edges.remove('image03');
                        this.visNetworkData.edges.remove('image04');
                    }

                    this.visNetworkService.fit(this.visNetwork);
                }
               // MRI, DAT, PET, SPECT
                // cliMeasurements ECG, EEG
                if (eventData[1].nodes=="cliMeasurements"){
                    if(!(this.visNetworkData.nodes.getById('ECG')
                            || this.visNetworkData.nodes.getById('EEG')
                        )
                    ) {

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
                    else{
                        this.visNetworkData.nodes.remove('ECG');
                        this.visNetworkData.nodes.remove('EEG');

                        this.visNetworkData.edges.remove('cliM01');
                        this.visNetworkData.edges.remove('cliM02');
                    }

                    this.visNetworkService.fit(this.visNetwork);
                }

                if (eventData[1].nodes=="screening"){
                    if(!(this.visNetworkData.nodes.getById('painRating')
                            || this.visNetworkData.nodes.getById('wellBeing')
                        )
                    ) {
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
                    else{
                        this.visNetworkData.nodes.remove('painRating');
                        this.visNetworkData.nodes.remove('wellBeing');

                        this.visNetworkData.edges.remove('pain01');
                        this.visNetworkData.edges.remove('pain02');
                    }
                    this.visNetworkService.fit(this.visNetwork);
                }



                //
            //    this.visNetworkData.nodes.add({id: 'screening', label: 'Screening\n' + '05.01.2017', title: 'Screening\n - Click to see sub-categories', group: 'Screening'});
          //      this.visNetworkData.edges.add({from: 'screening', to: 'patient' });

                if (eventData[1].nodes=="lab"){
                    // console.log(eventData[1].nodes);
                    if(!(this.visNetworkData.nodes.getById('bloodTest')
                            || this.visNetworkData.nodes.getById('urineTest')
                            || this.visNetworkData.nodes.getById('histTest')
                        )
                    ) {
                       // this.ngOnInit();
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
                    else{
                        this.visNetworkData.nodes.remove('bloodTest');
                        this.visNetworkData.nodes.remove('urineTest');
                        this.visNetworkData.nodes.remove('histTest');

                        this.visNetworkData.edges.remove('lab01');
                        this.visNetworkData.edges.remove('lab02');
                        this.visNetworkData.edges.remove('lab03');
                    }


                    //this.visNetworkData.nodes.remove({idType: 'bloodTest'});
                    this.visNetworkService.fit(this.visNetwork);

                }
            }
        });

    // ********** DOUBLE CLICK ********* //

        // open your console/dev tools to see the click params
        this.visNetworkService.doubleClick
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    console.log(eventData[1].nodes);
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
                        this.visNetworkData.nodes.add({id: 'cardiologist1', label: 'Cardiologist', group: 'Carer'});


                        this.visNetworkData.edges.add({from: '', to: 'cardiologist1' });

                        this.visNetworkService.fit(this.visNetwork);

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
                       // TODO let next = new Rou;

                        this.visNetworkData.nodes.add({id: 'rheumatologist1', label: 'Rheumatologists', group: 'Carer'});
                        this.visNetworkData.nodes.add({id: 'appointment1', label: 'Appointment:\n Discussion on the results', group: 'Appointment'});
                        this.visNetworkData.edges.add({from: 'appointment1', to: 'rheumatologist1' });

                        this.visNetworkData.nodes.add({id: 'medicationPlan1', label: 'Meedication\n plan', group: 'MedicationPlan'});
                        this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'rheumatologist1' });

                        this.visNetworkData.nodes.add({id: 'activityPlan1', label: 'Prescribed\n plan of activities', group: 'ActivityPlan'});
                        this.visNetworkData.edges.add({from: 'activityPlan1', to: 'rheumatologist1' });

                        this.visNetworkData.nodes.add({id: 'picture1', label: 'Picture or \nScanned Document', title: 'Picture or Scanned document', group: 'PictureOrScan'});
                        this.visNetworkData.edges.add({from: 'picture1', to: 'rheumatologist1' });


                        // this.visNetworkData.edges.add({from: '', to: '' });

                        this.visNetworkService.fit(this.visNetwork);

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
                        // console.log(eventData[1].nodes);
                        // TODO navigation towards Clinitian Manager
                        //this.visNetworkService.fit(this.visNetwork);

                    }
                    if (eventData[1].nodes=="appointment"
                        || eventData[1].nodes=="medicationPlan"
                        || eventData[1].nodes=="activityPlan"
                        || eventData[1].nodes=="questionnairePlan"
                    ){
                        // console.log(eventData[1].nodes);
                        // TODO navigation towards Narrative Manager
                        //this.visNetworkService.fit(this.visNetwork);

                    }
                }
            });
}

    public ngOnInit() {
        let txt1 = 'home device 1';
        let txt2 = 'home device 2';
        let fakeDateCP = '11.02.2017';
        let fakeDateHome = '12.03.2017';
        let fakeDatePlan = '01.02.2017';
        let fakeDateLab = '21.02.2017';
        //let txt = "{id: '1', label: 'Peter Patient', title: 'Patient', group: 'patient', cid: 1}, {id: '2', label: 'Care Professionals',  group: 'groupUserDoctor'}, {id: '3', label: 'Home Measurements\n and Recording', title: txt1+txt2, group: 'dataHome'}, {id: '4', label: 'Care Plans', group: 'plan'}, {id: '5', label: 'Lab examinations', group: 'labData'}, {id: '6', label: 'Historical Home \nMeasurements', group: 'historyData'},{id: '7', label: 'Blood Pressure Home \nMeasurements', group: 'heartData'}, {id: '8', label: 'Appointment:\n Discussion on the results...', group: 'calendar'},";
        let nodes = new VisNodes([

            {id: 'patient', label: 'Peter Patient', title: 'Patient', group: 'Patient', cid: 1},
            {id: 'carers', label: 'Care Professionals\n' + fakeDateCP, title: 'Care professionals category\n - Click to see sub-categories', group: 'groupCarers'},
            {id: 'home', label: 'Home Measurements\n and Recording\n'+fakeDateHome, title: 'Home monitoring data category\n - Click to see sub-categories', group: 'DataHome'},
            {id: 'plan', label: 'Care Plans\n'+fakeDatePlan, title: 'Care plans data category\n - Click to see sub-categories', group: 'Plan'},
            {id: 'lab', label: 'Lab tests\n'+fakeDateLab,  title: 'Lab tests data category\n - Click to see sub-categories',  group: 'LabData'},
            {id: 'image', label: 'Images\n'+fakeDateLab, title: 'Images - Click to see sub-categories', group: 'PictureOrScan'},
           // {id: '6', label: 'Historical Home \nMeasurements', group: 'historyData'},
            //{id: '7', label: 'Blood Pressure Home \nMeasurements', group: 'heartData'},
            //{id: '8', label: 'Appointment:\n Discussion on the results...', group: 'calendar'},
            //{id: 'customise', label: 'Customise Categories\n (hide not relevant icons)', shape: 'box'}
        ]);
        //let edgesTXT = '[{from: "1", to: "2"}]'
        let edges = new VisEdges([
            {from: 'patient', to: 'carers', id: 'Patient1'},
            {from: 'patient', to: 'home', id: 'Patient2'},
            {from: 'patient', to: 'plan', id: 'Patient3'},
            {from: 'patient', to: 'lab', id: 'Patient4'},
            {from: 'patient', to: 'image', id: 'Patient5'},
        ]);

        this.visNetworkData = {
            nodes: nodes,
            edges: edges
        };
        this.visNetworkData.nodes.add({id: 'questionnaires', label: 'Questionnaires\n' + '11.03.2017', title: 'Questionnaires \n - Click to see sub-categories',group: 'Questionnaires'});
        this.visNetworkData.edges.add({from: 'questionnaires', to: 'patient' });

        this.visNetworkData.nodes.add({id: 'psychoTest', label: 'Psychological and \nNeuropsychological Testing\n' + '15.10.2016', title: 'Psychological and Neuropsychological Testing\n - Click to see sub-categories', group: 'PsychologicalTest'});
        this.visNetworkData.edges.add({from: 'psychoTest', to: 'patient' });

        this.visNetworkData.nodes.add({id: 'cliMeasurements', label: 'Clinical measurements\n' + '15.11.2016', title: 'Clinical measurements\n - Click to see sub-categories', group: 'CliMeasurement'});
        this.visNetworkData.edges.add({from: 'cliMeasurements', to: 'patient' });

        this.visNetworkData.nodes.add({id: 'surgery', label: 'Surgeries\n' + '15.04.2013', title: 'Surgery\n - Click to see sub-categories', group: 'Surgery'});
        this.visNetworkData.edges.add({from: 'surgery', to: 'patient' });

        this.visNetworkData.nodes.add({id: 'screening', label: 'Screening\n' + '05.01.2017', title: 'Screening\n - Click to see sub-categories', group: 'Screening'});
        this.visNetworkData.edges.add({from: 'screening', to: 'patient' });


        let shadowOn = true;
        this.visNetworkOptions = {
            clickToUse: true,
            interaction: {hover: true},
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
                shadow: true,
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

        //this.visNetworkService.fit(this.visNetwork);

        /*
    function loadGraph(){
       // let network = new vis.Network(containerBrowser, data1, options1);
        //browserLoaded = true;
        setTimeout(function() {
          //  network.redraw();
        }, 100);
        network.on("doubleClick", function (params) {
            params.event = "[original event]";
            if(params.nodes[0] === 1)
            {
                //loadPage("patient.html");
            }
            else
            {
                //loadPage("narratives-manager.html");
            }
        });*/


        }

    public ngOnDestroy(): void {
        this.visNetworkService.off(this.visNetwork, 'click');
    }
}
    //var network = new vis.Network(containerBrowser, data1, options1);
 /*   var network;


    if(browserLoaded){
        loadGraph();
    }
    $("#go").on("click", function(){
    loadGraph();
});

    function loadGraph(){
    network = new vis.Network(containerBrowser, data1, options1);
    browserLoaded = true;
    setTimeout(function() {
        network.redraw();
    }, 100);
    network.on("doubleClick", function (params) {
        params.event = "[original event]";
        if(params.nodes[0] === 1)
        {
            loadPage("patient.html");
        }
        else
        {
            loadPage("narratives-manager.html");
        }
    });
}*/


/*
import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    templateUrl: 'data-resource-browser.component.html'
})
export class DataResourceBrowserComponent implements OnInit {

    constructor( ) { }

    ngOnInit(): void {
        
    }
}
*/