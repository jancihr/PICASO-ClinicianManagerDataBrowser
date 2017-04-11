///<reference path="../../../../../node_modules/ng2-vis/components/network/index.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router /*Routes, RouterModule, RouterLink,*/} from '@angular/router';
import {
    VisNodes,
    VisEdges,
    VisNetworkService,
    VisNetworkData,
    VisNetworkOptions, //VisEdgeOptions,// VisFitOptions     //VisNode,
} from 'ng2-vis/components/network';
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
  //  public visEdgeOptions: VisEdgeOptions;
 //   public visFitOptions: VisFitOptions;
    public router: Router
    public allDisplayed: boolean;
    public homeDisplayed: boolean;
    public questHomeDisplayed: boolean;
    public planDisplayed: boolean;
    public carersDisplayed: boolean;
    public questionairesDisplayed: boolean;
    public imagesDisplayed: boolean;
    public screeningsDisplayed: boolean;
    public cliMeasurementsDisplayed: boolean;
    public labDisplayed: boolean;
    public bloodDisplayed: boolean;
    public psychoDisplayed: boolean;
    public memoryDisplayed: boolean;
    public attentionDisplayed: boolean;
    public languageDisplayed: boolean;
    public psyHealthDisplayed: boolean;
    public trialPartBDisplayed: boolean;
    public scaleOfGraph: any
    nodesAsArray = new Array ({subGraphId: 'graphPart', parrentGraph: 'parrent graph', id: 'id', label: 'Label', title: 'title', group: 'Group', isDisplayed: false});
    //edgesAsArray = new Array ({subGraphId: 'graphPart', parrentGraph: 'parrent graph', id: 'id', from: 'from', to: 'to', isDisplayed: false});
// CONSTRUCTOR
    public constructor(private visNetworkService: VisNetworkService, router: Router) {
        this.router = router
    }
// MAP source data to component data
    private mapSourceDataToNetworkData(){
        let patientID = '11010111'
        let fakeDateCP = '11.02.2017';
        let fakeDateHome = '12.03.2017';
        let fakeDatePlan = '01.02.2017';
        let fakeDateLab = '21.02.2017';
        //todo getters based on the data for all parameters above
        //core graph nodes
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: '', isDisplayed: true, id: 'patient', label: 'Peter Patient\nID: ' +  patientID , title: 'Patient', group: 'Patient'})//is displayed is solved based on authorisation and preferences as well as dates
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'carers', label: 'Care Professionals\n' + fakeDateCP, title: 'Care professionals category\n - Click to see sub-categories', group: 'groupCarers'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'home', label: 'Home Measurements\n and Recording\n'+fakeDateHome, title: 'Home monitoring data category\n - Click to see sub-categories', group: 'DataHome'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'plan', label: 'Care Plans\n'+fakeDatePlan, title: 'Care plans data category\n - Click to see sub-categories', group: 'Plan'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'lab', label: 'Lab tests\n'+fakeDateLab,  title: 'Lab tests data category\n - Click to see sub-categories',  group: 'LabData'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'image', label: 'Images\n'+fakeDateLab, title: 'Images - Click to see sub-categories', group: 'PictureOrScan'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'questionnaires', label: 'RA-Questionnaires\n' + '11.03.2017', title: 'Questionnaires \n - Click to see sub-categories',group: 'Questionnaires'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'psychoTest', label: 'Psychological and \nNeuropsychological Testing\n' + '15.10.2016', title: 'Psychological and Neuropsychological Testing\n - Click to see sub-categories', group: 'PsychologicalTest'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'cliMeasurements', label: 'Clinical measurements\n' + '15.11.2016', title: 'Clinical measurements\n - Click to see sub-categories', group: 'CliMeasurement'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'surgery', label: 'Surgeries\n' + '(no data)', title: 'Surgery\n - Click to see sub-categories', group: 'Surgery'})
        this.nodesAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, id: 'screening', label: 'Screening\n' + '05.01.2017', title: 'Screening\n - Click to see sub-categories', group: 'Screening'})
        //edges
/*        this.edgesAsArray.push({subGraphId: 'core', parrentGraph: '', isDisplayed: true, from: 'patient', to: 'carers', id: 'Patient01'})
         keeping one sample.. to keeping th first idea*/
        //carers
        let fakeDate = '11.02.2017';
        let fakeDateCard = '11.11.2016';
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'cardiologist',label: 'Cardiologist\n' + fakeDateCard,group: 'Carer'});
        //this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'cardiologist', to: 'carers',id: 'carers01'});
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'rheumatologist',label: 'Rheumatologists\n' + fakeDate,group: 'Carer'});
        //this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'rheumatologist', to: 'carers',id: 'carers02'});
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'neurologist',label: 'Neurologist\n' + fakeDate,group: 'Carer'});
        // this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'neurologist', to: 'carers',id: 'carers03'});
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'neuropschologist',label: 'Neuropschologist\n' + fakeDate,group: 'Carer'});
        // this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'neuropschologist', to: 'carers',id: 'carers04'});
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'radiologist',label: 'Radiologist\n' + fakeDate,group: 'Carer'});
        // this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'radiologist', to: 'carers',id: 'carers05'});
        this.nodesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, title: '',id: 'gp',label: 'General Practitioner\n' + fakeDate,group: 'Carer'});
        // this.edgesAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: true, from: 'gp', to: 'carers',id: 'carers06'});
        //home mapping
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'sugarHistory',label: 'Blood Sugar Level (Home)\n' + '19.03.2017',group: 'HomeHistory'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'sugarHistory', to: 'home',id: 'home01'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'saturationHistory',label: 'Saturation (Home)\n' + '19.03.2017',group: 'HomeHistory'});
        // this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'saturationHistory', to: 'home',id: 'home02'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'lungHistory',label: 'Lung Capacity (Home)\n' + '19.03.2017',group: 'BarHomeHistory'});
        // this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'lungHistory', to: 'home',id: 'home03'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'respirationHistory',label: 'Respiration Rate (Home)\n' + '19.03.2017',group: 'BarHomeHistory'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'respirationHistory', to: 'home',id: 'home04'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'weightHistory',label: 'Weight (Home)\n' + '19.03.2017',group: 'WeightHomeHistory'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'weightHistory', to: 'home',id: 'home05'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'homeHeart',label: 'Blood Pressure and Heart rate \nHome Measurements\n' + '19.03.2017',group: 'HomeHeart'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'homeHeart', to: 'home',id: 'home06'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'homeActivity',label: 'ActivityMonitoring (Home)\n' + '19.03.2017',group: 'HomeActivity'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'homeActivity', to: 'home',id: 'home07'});
        this.nodesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnaireHome',label: 'Questionnaires Answered (Home)\n' + '19.03.2017',group: 'QuestionnaireHome'});
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'questionnaireHome', to: 'home',id: 'home08'});
// questionnaire home
        this.nodesAsArray.push({subGraphId: 'questionnaireHome', parrentGraph: 'home', isDisplayed: true, title: '',id: 'questionnaireFFbhHAQ',label: 'FFbh/HAQ (at home)\n' + '11.03.2017',group: 'QuestionnaireHome'});
        this.nodesAsArray.push({subGraphId: 'questionnaireHome', parrentGraph: 'home', isDisplayed: true, title: '',id: 'questionnaireRADAI',label: 'RADAI (at home)\n' + '09.03.2017',group: 'QuestionnaireHome'});
        this.nodesAsArray.push({subGraphId: 'questionnaireHome', parrentGraph: 'home', isDisplayed: true, title: '',id: 'questionnaireMorisky',label: 'Morisky (at home)\n' + '19.03.2017',group: 'QuestionnaireHome'});
        // plan
        this.nodesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, title: '',id: 'appointment',label: 'Appointment:\n Discussion on the results\n' + '12.03.2017',group: 'Appointment'});
        // this.edgesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, from: 'appointment', to: 'plan',id: 'plan01'});
        this.nodesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, title: '',id: 'medicationPlan',label: 'Meedication plan\n' + '12.03.2017',group: 'MedicationPlan'});
        //this.edgesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, from: 'medicationPlan', to: 'plan',id: 'plan02'});
        this.nodesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, title: '',id: 'activityPlan',label: 'Prescribed plan of activities\n' + '12.03.2017',group: 'ActivityPlan'});
        //this.edgesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, from: 'activityPlan', to: 'plan',id: 'plan03'});
        this.nodesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnairePlan',label: 'Prescribed Questionnaires\n' + '12.01.2017',group: 'QuestionnairePlan'});
        // this.edgesAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: true, from: 'questionnairePlan', to: 'plan',id: 'plan04'});
        //Questionnaires
        this.nodesAsArray.push({subGraphId: 'questionnaires', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnaireFFbhHAQHome',label: 'FFbh/HAQ (at home)\n' + '11.03.2017',group: 'QuestionnaireHome'});
//({from: 'questionnaireFFbhHAQHome', to: 'questionnaires',id: 'quest01'});
        this.nodesAsArray.push({subGraphId: 'questionnaires', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnaireRADAIHome',label: 'RADAI (at home)\n' + '09.03.2017',group: 'QuestionnaireHome'});
//({from: 'questionnaireRADAIHome', to: 'questionnaires',id: 'quest02'});
        this.nodesAsArray.push({subGraphId: 'questionnaires', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnaireFFbhHAQClinic',label: 'FFbh/HAQ (at clinic)\n' + '01.03.2017',group: 'QuestionnaireClinic'});
//({from: 'questionnaireFFbhHAQClinic', to: 'questionnaires',id: 'quest03'});
        this.nodesAsArray.push({subGraphId: 'questionnaires', parrentGraph: 'core', isDisplayed: true, title: '',id: 'questionnaireRADAIClinic',label: 'RADAI (at clinic)\n' + '01.03.2017',group: 'QuestionnaireClinic'});
//({from: 'questionnaireRADAIClinic', to: 'questionnaires',id: 'quest04'});
        //psych tests
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: '',id: 'memory',label: 'Memory\n' + '11.03.2016',group: 'PsychologicalTest'});
//({from: 'memory', to: 'psychoTest',id: 'psychoTest01'});
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: '',id: 'attention',label: 'Attention\n' + '08.03.2016',group: 'PsychologicalTest'});
//({from: 'attention', to: 'psychoTest',id: 'psychoTest02'});
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: '',id: 'language',label: 'Language\n' + '03.03.2016',group: 'PsychologicalTest'});
//({from: 'language', to: 'psychoTest',id: 'psychoTest03'});
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: '',id: 'psychoHealth',label: 'Psychological health:\n' + '15.10.2016',group: 'PsychologicalTest'});
//({from: 'psychoHealth', to: 'psychoTest',id: 'psychoTest04'});
        //Trial part B
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: '',id: 'trialPartB',label: 'Trial Making Test\npart B\n' + '01.05.2016',group: 'PsychologicalTest'});

//  psycho Tests MEMORY
        this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: '15words',label: 'Learning curve 15 words of Rey\n' + '11.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'figureRecall',label: 'Recall of the figure of Rey - Osterrieth\n' + '11.03.2016',group: 'PsychologicalTest'});
        //Agostino FB this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'praxia',label: 'Praxia\n' + '11.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'ravlt',label: 'Rey Auditory Verbal Learning TOT\n' + '11.03.2016',group: 'PsychologicalTest'});
       //Agostino FB this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'simpleDivided',label: 'Simple and Divided\n' + '11.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'roravlt',label: 'Recall of Rey Auditory Verbal Learning\n' + '11.03.2016',group: 'PsychologicalTest'});
//  psycho test Attention
        this.nodesAsArray.push({subGraphId: 'attention', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'stroop',label: 'Stroop Reduced\n' + '10.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'attention', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'trial',label: 'Trail Making A\n' + '10.03.2016',group: 'PsychologicalTest'});
//  psycho test language
        this.nodesAsArray.push({subGraphId: 'language', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'fluency',label: ' Test of Semantic Fluency\n' + '05.03.2016',group: 'PsychologicalTest'});
        //Agostino FB this.nodesAsArray.push({subGraphId: 'language', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'cardSorting',label: ' Wisconsin Card Sorting Test\n' + '04.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'language', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'phonoFluency',label: 'Test of Phonological Fluency,\n' + '04.03.2016',group: 'PsychologicalTest'});
        // this.visNetworkData.edges.add({from: 'cardSorting', to: 'language',id: 'language02'});
//  psycho test psycho health
        //Agostino FB this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'hamiltonDepression',label: 'Hamilton Depression Rating Scale TOT\n' + '01.03.2016',group: 'PsychologicalTest'});
        //Agostino FB this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'beckDepression',label: 'Beck Depression Inventory TOT \n' + '01.02.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'depression',label: 'Depression Tests\n' + '01.02.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'anxiety',label: 'Anxiety\n(Hamilton Anxiety Scale)\n' + '01.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 's-hPleasure',label: 'Snaith-Hamilton Pleasure Scale \n' + '01.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'angerExpression',label: 'State-Trait Anger Expression Inventory TOT \n' + '01.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'parkinsonPsychosis',label: 'Parkinson Psychosis Rating Scale \n' + '10.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'euroquol',label: 'Euroquol Rating Scale \n' + '01.05.2016',group: 'PsychologicalTest'});
//  psycho Tests EXECUTIVE Functions
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: 'evaluated by Wisconsin Card Sorting Test',id: 'executive',label: 'Executive Functions\n' + '11.03.2016',group: 'PsychologicalTest'})
//  psycho Tests PRAXIA
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: 'evaluated by Copy of the figure Rey-Osterrieth',id: 'praxia',label: 'Praxia\n' + '11.03.2016',group: 'PsychologicalTest'});
//  psycho Tests Global Congnitive status
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: 'evaluated by Mini-Mental State Examination',id: 'gloCongStatus',label: 'Global Congnitive Status\n' + '11.03.2016',group: 'PsychologicalTest'});
//  psycho Tests PD SEVERITY
        this.nodesAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: true, title: 'evaluated by H&amp;Y score and UPDRS III score',id: 'pdSecerity',label: 'PD Severity\n' + '11.03.2016',group: 'PsychologicalTest'});
//  IMage
        this.nodesAsArray.push({subGraphId: 'image', parrentGraph: 'core', isDisplayed: true, title: '',id: 'MRI',label: 'MRI\n' + '01.02.2017',group: 'PictureOrScan'});
        this.nodesAsArray.push({subGraphId: 'image', parrentGraph: 'core', isDisplayed: true, title: '',id: 'DAT',label: 'Dat Scan\n' + '21.02.2017',group: 'PictureOrScan'});
        this.nodesAsArray.push({subGraphId: 'image', parrentGraph: 'core', isDisplayed: true, title: '',id: 'PET',label: 'PET\n' + '22.03.2016',group: 'PictureOrScan'});
        this.nodesAsArray.push({subGraphId: 'image', parrentGraph: 'core', isDisplayed: true, title: '',id: 'MYSC',label: 'Myocardial scintigraphy\n' + '10.01.2017',group: 'PictureOrScan'});
        //cli measurements
        this.nodesAsArray.push({subGraphId: 'cliMeasurements', parrentGraph: 'core', isDisplayed: true, title: '',id: 'ECG',label: 'ECG\n' + '01.02.2015',group: 'CliMeasurement'});
        //this.visNetworkData.edges.add({from: 'ECG', to: 'cliMeasurements',id: 'cliM01'});
        this.nodesAsArray.push({subGraphId: 'cliMeasurements' , parrentGraph: 'core', isDisplayed: true, title: '',id: 'EEG',label: 'EEG\n' + '15.11.2016',group: 'CliMeasurement'});
        //this.visNetworkData.edges.add({from: 'EEG', to: 'cliMeasurements',id: 'cliM02'});
//screenings
        this.nodesAsArray.push({subGraphId: 'screening' , parrentGraph: 'core', isDisplayed: true, title: '',id: 'painRating',label: 'Pain rating\n' + '03.01.2017',group: 'Screening'});
        //this.visNetworkData.edges.add({from: 'painRating', to: 'screening',id: 'pain01'});
        this.nodesAsArray.push({subGraphId: 'screening' , parrentGraph: 'core', isDisplayed: true, title: '',id: 'wellBeing',label: 'Well-Being rating\n' + '05.01.2017',group: 'Screening'});
// this.visNetworkData.edges.add({from: 'wellBeing', to: 'screening',id: 'pain02'});
//lab
        let fakeLab = '21.02.2017';
        this.nodesAsArray.push({subGraphId: 'lab' , parrentGraph: 'core', isDisplayed: true,id: 'bloodTest',label: 'Blood Analysis:\n' + fakeLab, title: 'Blood anaysis data category\n - Click to see sub-categories',group: 'BloodTest'});
// this.visNetworkData.edges.add({from: 'bloodTest', to: 'lab',id: 'lab01'});
        this.nodesAsArray.push({subGraphId: 'lab' , parrentGraph: 'core', isDisplayed: true, title: '',id: 'urineTest',label: 'Urine exam:\n' + fakeLab,group: 'UrineTest'});
        //this.visNetworkData.edges.add({from: 'urineTest', to: 'lab',id: 'lab02'});

        this.nodesAsArray.push({subGraphId: 'lab' , parrentGraph: 'core', isDisplayed: true, title: '',id: 'histTest',label: 'Histology:\n' + '31.10.2015',group: 'HistTest'});
// this.visNetworkData.edges.add({from: 'histTest', to: 'lab',id: 'lab03'});
// blood
        this.nodesAsArray.push({subGraphId: 'bloodTest' , parrentGraph: 'lab', isDisplayed: true,id: 'hemoChrome',label: 'Hemochrome\n' + fakeLab,title: '3 hemochrome tests found',group: 'BloodTest'
        });
// this.visNetworkData.edges.add({from: 'hemoChrome', to: 'bloodTest',id: 'blood01'});
        this.nodesAsArray.push({subGraphId: 'bloodTest' , parrentGraph: 'lab', isDisplayed: true, title: '',id: 'Thyroid',label: 'Thyroid hormones\n' + fakeLab,group: 'BloodTest'});
// this.visNetworkData.edges.add({from: 'Thyroid', to: 'bloodTest',id: 'blood02'});
    }
// Create Visual Network representation (and thus it is displayed)
    private createVisNetwork(subGraphName: String){
        let  subGraphNodesArray: any;
        //this.nodesAsArray.sort()
        //console.log(this.nodesAsArray)
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
        for(var i = 0; i < subGraphNodesArray.length; i++) {
            if(subGraphNodesArray[i]) {
                //Nodes
                this.visNetworkData.nodes.add({id: subGraphNodesArray[i].id, label: subGraphNodesArray[i].label, title: subGraphNodesArray[i].title, group: subGraphNodesArray[i].group/*, x: 100, y: 100*/ });
                if(subGraphNodesArray[i].parrentGraph!=''){
                    //EDGES
                    let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                    //console.log(edgeId) console.log(subGraphNodesArray[i].id) console.log(subGraphNodesArray[i].subGraphId) console.log(subGraphNodesArray[i].parrentGraph)
                    this.visNetworkData.edges.add({id: edgeId, from: subGraphNodesArray[i].id, to: subGraphNodesArray[i].subGraphId});
                }
            }
        }
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
            "physics": {
                "minVelocity": 0.85
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
                        size: 125,
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
                HistTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#D0926E'
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
// REMOVE Visual Network representation (and thus it is NOT displayed)
    private removeVisNetwork(subGraphName: String){
        let  subGraphNodesArray: any;
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
        for(var i = 0; i < subGraphNodesArray.length; i++) {
            if(subGraphNodesArray[i]) {
                //Nodes
                this.visNetworkData.nodes.remove(subGraphNodesArray[i].id)
                if(subGraphNodesArray[i].parrentGraph!=''){
                    //EDGES
                    let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                    //console.log(edgeId)
                    this.visNetworkData.edges.remove(edgeId)
                }
            }
        }
    }
    // memory - what graph was displayed
    private updateLastDispalayedGraphSetUp() {
        //console.log(this.homeDisplayed )
        sessionStorage.setItem("homeDisplayed", this.homeDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("questHomeDisplayed", this.questHomeDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("planDisplayed", this.planDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("carersDisplayed ", this.carersDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("questionairesDisplayed ", this.questionairesDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("imagesDisplayed", this.imagesDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("screeningsDisplayed", this.screeningsDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("cliMeasurementsDisplayed", this.cliMeasurementsDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("labDisplayed", this.labDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("bloodDisplayed", this.bloodDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("psychoDisplayed", this.psychoDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("memoryDisplayed", this.memoryDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("attentionDisplayed", this.attentionDisplayed ? 'Displayed' : 'Inactive');sessionStorage.setItem("languageDisplayed", this.languageDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("psyHealthDisplayed", this.psyHealthDisplayed ? 'Displayed' : 'Inactive');
        sessionStorage.setItem("allDisplayed", this.allDisplayed ? 'Displayed' : 'Inactive');
    }
    private readLastDispalyedGraphSetUp(){
        //console.log(localStorage.getItem("homeDisplayed") == 'Displayed' ? true : false);
        this.homeDisplayed = sessionStorage.getItem("homeDisplayed") == 'Displayed' ? true : false;
        this.questHomeDisplayed = sessionStorage.getItem("questHomeDisplayed") == 'Displayed' ? true : false;
        this.planDisplayed = sessionStorage.getItem("planDisplayed") == 'Displayed' ? true : false;
        this.carersDisplayed = sessionStorage.getItem("carersDisplayed ") == 'Displayed' ? true : false;
        this.questionairesDisplayed = sessionStorage.getItem("questionairesDisplayed ") == 'Displayed' ? true : false;
        this.imagesDisplayed = sessionStorage.getItem("imagesDisplayed") == 'Displayed' ? true : false;
        this.screeningsDisplayed = sessionStorage.getItem("screeningsDisplayed") == 'Displayed' ? true : false;
        this.cliMeasurementsDisplayed = sessionStorage.getItem("cliMeasurementsDisplayed") == 'Displayed' ? true : false;
        this.labDisplayed = sessionStorage.getItem("labDisplayed") == 'Displayed' ? true : false;
        this.bloodDisplayed = sessionStorage.getItem("bloodDisplayed") == 'Displayed' ? true : false;
        this.psychoDisplayed = sessionStorage.getItem("psychoDisplayed") == 'Displayed' ? true : false;
        this.memoryDisplayed = sessionStorage.getItem("memoryDisplayed") == 'Displayed' ? true : false;
        this.attentionDisplayed = sessionStorage.getItem("attentionDisplayed") == 'Displayed' ? true : false;
        this.languageDisplayed = sessionStorage.getItem("languageDisplayed") == 'Displayed' ? true : false;
        this.psyHealthDisplayed = sessionStorage.getItem("psyHealthDisplayed") == 'Displayed' ? true : false;
        this.allDisplayed = sessionStorage.getItem("allDisplayed") == 'Displayed' ? true : false;
    }
// DISPALAY //
    //DISPLAY LAST
    private displayLast(){
        this.coreGraphDispaly()
        //console.log(this.homeDisplayed);
        if (this.carersDisplayed) {             this.carersSubGraphDisplay(); }
        if (this.homeDisplayed) {               this.homeSubGraphDisplay(); }
        if (this.questHomeDisplayed) {          this.questHomeSubGraphDisplay(); }
        if (this.planDisplayed) {               this.planSubGraphDisplay(); }
        if (this.questionairesDisplayed) {      this.questionnaireSubGraphDisplay();}
        if (this.psychoDisplayed) {             this.psychoTestSubGraphDisplay(); }
        if (this.memoryDisplayed) {             this.memorySubGraphDisplay(); }
        if (this.attentionDisplayed) {          this.attentionSubGraphDisplay(); }
        if (this.languageDisplayed) {           this.languageSubGrpahDisplay(); }
        if (this.imagesDisplayed) {             this.imageSubGraphDisplay(); }
        if (this.cliMeasurementsDisplayed) {    this.cliMeasurementsSubGraphDisplay(); }
        if (this.screeningsDisplayed) {         this.screeningSubGraphDisplay(); }
        if (this.labDisplayed) {                this.labSubgraphDisplay(); }
        if (this.bloodDisplayed) {              this.bloodSubgraphDisplay(); }

        // this.visNetworkService.fit(this.visNetwork);
    }
    // DISPALY ALL subgrahs //
    private displayAll(): void {
        //collapse all subgrpahs that are displayed
        this.collapseAll();
        //display all subgraphs
        this.carersSubGraphDisplay();
        this.homeSubGraphDisplay();
        this.questHomeSubGraphDisplay()
        this.planSubGraphDisplay();
        this.questionnaireSubGraphDisplay();
        this.psychoTestSubGraphDisplay();
        this.memorySubGraphDisplay();
        this.attentionSubGraphDisplay();
        this.languageSubGrpahDisplay();
        this.psychoHealthSubGraphDisplay();
        this.imageSubGraphDisplay();
        this.cliMeasurementsSubGraphDisplay();
        this.screeningSubGraphDisplay();
        this.labSubgraphDisplay();
        this.bloodSubgraphDisplay();
        this.allDisplayed = true;
        this.updateLastDispalayedGraphSetUp()
        this.visNetworkService.fit(this.visNetwork);
    }
    //display core
    private coreGraphDispaly(){
        //this.visNetworkService.
        let nodes = new VisNodes();
        let edges = new VisEdges();

        this.visNetworkData = {
            nodes: nodes,
            edges: edges
        }
        this.createVisNetwork('patient')
    }
    //display subgraphs
    private carersSubGraphDisplay(){
        this.carersDisplayed = true;
        this.createVisNetwork('carers')
    }
    private homeSubGraphDisplay(){
        this.homeDisplayed = true;
        this.createVisNetwork('home')
    }
    private questHomeSubGraphDisplay(){
        this.questHomeDisplayed = true;
        this.createVisNetwork('questionnaireHome')
    }
    private planSubGraphDisplay() {
        this.planDisplayed = true
        this.createVisNetwork('plan')
    }
    private questionnaireSubGraphDisplay(){
        this.questionairesDisplayed = true;
        this.createVisNetwork('questionnaires')
    }
    private psychoTestSubGraphDisplay(){
        this.psychoDisplayed = true;
        this.createVisNetwork('psychoTest')
    }
    private memorySubGraphDisplay(){
        this.memoryDisplayed = true;
        this.createVisNetwork('memory')
    }
    private attentionSubGraphDisplay(){
        this.attentionDisplayed = true;
        this.createVisNetwork('attention')

    }
    private languageSubGrpahDisplay() {
        this.languageDisplayed = true;
        this.createVisNetwork('language')
    }
    private psychoHealthSubGraphDisplay(){
        this.psyHealthDisplayed = true;
        this.createVisNetwork('psychoHealth')
    }
    private trialPartBSubGraphDisplay(){
        this.trialPartBDisplayed = true;
        this.createVisNetwork('trialPartB')
    }
    private imageSubGraphDisplay() {
        this.imagesDisplayed = true;
        this.createVisNetwork('image')
    }
    private cliMeasurementsSubGraphDisplay(){
        this.cliMeasurementsDisplayed = true;
        this.createVisNetwork('cliMeasurements')
    }
    private screeningSubGraphDisplay(){
        this.screeningsDisplayed = true;
        this.createVisNetwork('screening')
    }
    private labSubgraphDisplay(){
        this.labDisplayed = true;
        this.createVisNetwork('lab')
    }
    private bloodSubgraphDisplay(){
        this.bloodDisplayed = true
        this.createVisNetwork('bloodTest')
    }
// COLLAPSE
    private collapseAll(): void {
        if(this.carersDisplayed) {        this.carersCollapse() }
        if(this.homeDisplayed) {          this.homeCollapse() }
        if(this.planDisplayed) {          this.planCollapse() }
        if(this.questionairesDisplayed) { this.questionnaireCollapse() }
        if(this.psychoDisplayed) {        this.psychoTestCollapse()
            if(this.memoryDisplayed) {          this.memoryCollapse() }
            if(this.attentionDisplayed) {       this.attentionCollapse() }
            if(this.languageDisplayed) {        this.languageCollapse() }
            if(this.psyHealthDisplayed) {       this.psychohealthCollapse() }  }
        if(this.imagesDisplayed) {          this.imageCollapse() }
        if(this.cliMeasurementsDisplayed) { this.cliMeasurementsCollapse() }
        if(this.screeningsDisplayed) {      this.screeningCollapse() }
        if(this.labDisplayed) {             this.labCollapse()  }
        if(this.bloodDisplayed) {           this.bloodCollapse() }
        if(this.questHomeDisplayed) {       this.questHomeCollapse() }

    this.allDisplayed = false;
        this.updateLastDispalayedGraphSetUp()
        // display core graph
        this.coreCollapse()
        this.coreGraphDispaly(); //ngOnInit();
        this.visNetworkService.fit(this.visNetwork);
    }
    private coreCollapse(){ this.removeVisNetwork('patient') }
    private carersCollapse(){
        this.carersDisplayed = false;
        this.removeVisNetwork('carers')
    }
    private homeCollapse(){
        this.homeDisplayed = false;
        this.removeVisNetwork('home')
    }
    private questHomeCollapse(){
        this.questHomeDisplayed = false;
        this.removeVisNetwork('questionnaireHome')
    }
    private planCollapse(){
        this.planDisplayed = false;
        this.removeVisNetwork('plan')
    }
    private questionnaireCollapse(){
        this.questionairesDisplayed = false;
        this.removeVisNetwork('questionnaires')
    }
    private psychoTestCollapse(){
        this.psychoDisplayed = false;
        this.removeVisNetwork('psychoTest')
    }
    private memoryCollapse(){
        this.memoryDisplayed = false;
        this.removeVisNetwork('memory')
    }
    private attentionCollapse(){
        this.attentionDisplayed = false;
        this.removeVisNetwork('attention')
    }
    private languageCollapse(){
        this.languageDisplayed = false;
        this.removeVisNetwork('language')
    }
    private psychohealthCollapse(){
        this.psyHealthDisplayed = false;
        this.removeVisNetwork('psychoHealth')
    }
    private trialPartBCollapse(){

        this.trialPartBDisplayed = true;
        this.removeVisNetwork('trialPartB')
    }
    private imageCollapse(){
        this.imagesDisplayed = false;
        this.removeVisNetwork('image')
    }
    private cliMeasurementsCollapse(){
        this.cliMeasurementsDisplayed = false;
        this.removeVisNetwork('cliMeasurements')
    }
    private screeningCollapse(){
        this.screeningsDisplayed = false;
        this.removeVisNetwork('screening')
    }
    private labCollapse(){
        this.labDisplayed = false;
        this.removeVisNetwork('lab')
    }
    private bloodCollapse(){
        this.bloodDisplayed = false
        this.removeVisNetwork('bloodTest')
    }
// EVENTS handling (mouse, keyboard, zoom)
    public networkInitialized() {
        this.visNetworkService.redraw(this.visNetwork)
        // now we can use the service to register on events
        this.visNetworkService.on(this.visNetwork, 'click');
        //doubleClick
        this.visNetworkService.on(this.visNetwork, 'doubleClick');
        this.visNetworkService.on(this.visNetwork, 'zoom');
        this.visNetworkService.on(this.visNetwork, 'stabilizationIterationsDone')
        //***** on zoom, OnZoom *****
        this.visNetworkService.zoom
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    console.log(eventData[1])
                    if(eventData[1].direction == '-'){
                        if( eventData[1].scale > 0.25){
                            //console.log(this.visNetworkService.getScale(this.visNetwork))
                            //console.log(eventData[1] + '  -')
                            this.scaleOfGraph = eventData[1].scale
                        }else {
                            //eventData[1].scale = this.scaleOfGraph
                            //this.visNetworkService.redraw(this.visNetwork)
                            //console.log(eventData[1])
                        }
                    }
                    else{
                        if( eventData[1].scale < 3.0){
                            this.scaleOfGraph = eventData[1].scale
                            //console.log(eventData[1] + '  +')
                        }else {
                            //eventData[1].scale = this.scaleOfGraph
                           // this.visNetworkService.redraw(this.visNetwork)
                        }
                    }
                }
            });
        //***** on click, OnClick *****
        this.visNetworkService.click
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    // CARERS
                    if (eventData[1].nodes == "carers") {
                        if (!this.carersDisplayed) { this.carersSubGraphDisplay() }
                        else {                       this.carersCollapse()        }
                    }
                    // HOME
                    if (eventData[1].nodes == "home") {
                        if (!this.homeDisplayed) {  this.homeSubGraphDisplay();}
                        else {
                            if (this.questHomeDisplayed){ this.questHomeCollapse() }
                                                    this.homeCollapse()        }
                    }
                    //questionnaire home
                    if (eventData[1].nodes == "questionnaireHome") {
                        if (!this.questHomeDisplayed) { this.questHomeSubGraphDisplay();}
                        else {                     this.questHomeCollapse()        }
                    }
                    //plan
                    if (eventData[1].nodes == "plan") {
                        if (!this.planDisplayed) {  this.planSubGraphDisplay(); }
                        else {                      this.planCollapse() }
                    }
                    //questionnaires
                    if (eventData[1].nodes == "questionnaires") {
                        if (!this.questionairesDisplayed) { this.questionnaireSubGraphDisplay(); }
                        else {                              this.questionnaireCollapse() }
                    }
                    //PSYCHOTEST//
                    if (eventData[1].nodes == "psychoTest") {
                        if (!this.psychoDisplayed) {        this.psychoTestSubGraphDisplay();  }
                        else { if (this.memoryDisplayed) {      this.memoryCollapse()       }
                            if (this.attentionDisplayed) {      this.attentionCollapse()    }
                            if (this.languageDisplayed) {       this.languageCollapse()     }
                            if (this.psyHealthDisplayed) {      this.psychohealthCollapse() }
                                                            this.psychoTestCollapse();         }
                    }
                    // MEMORY //
                    if (eventData[1].nodes == "memory") {
                        if (!this.memoryDisplayed) { this.memorySubGraphDisplay(); }
                        else {                       this.memoryCollapse() }
                    }
                    // ATTENTION //
                    if (eventData[1].nodes == "attention") {
                        if (!this.attentionDisplayed) { this.attentionSubGraphDisplay(); }
                        else {                          this.attentionCollapse()         }
                    }
                    // LANGUAGE //
                    if (eventData[1].nodes == "language") {
                        if (!this.languageDisplayed) { this.languageSubGrpahDisplay(); }
                        else {                         this.languageCollapse() }
                    }
                    // PSYCHO HEALTH //
                    if (eventData[1].nodes == "psychoHealth") {
                        if (!this.psyHealthDisplayed) { this.psychoHealthSubGraphDisplay(); }
                        else {                          this.psychohealthCollapse()  }
                    }
                    //IMAGE
                    if (eventData[1].nodes == "image") {
                        if (!this.imagesDisplayed) { this.imageSubGraphDisplay(); }
                        else {                       this.imageCollapse() }
                    }
                    // cliMeasurements ECG, EEG
                    if (eventData[1].nodes == "cliMeasurements") {
                        if (!this.cliMeasurementsDisplayed) { this.cliMeasurementsSubGraphDisplay(); }
                        else {                                this.cliMeasurementsCollapse() }
                    }
                    // SCREENING
                    if (eventData[1].nodes == "screening") {
                        if (!this.screeningsDisplayed) { this.screeningSubGraphDisplay(); }
                        else {                           this.screeningCollapse() }
                    }
                    // LAB
                    if (eventData[1].nodes == "lab") {
                        if (!this.labDisplayed) { this.labSubgraphDisplay()         }
                        else {                    this.labCollapse()
                            if (this.bloodDisplayed) {     this.bloodCollapse()}    }
                    }
                    if (eventData[1].nodes == "bloodTest") {
                        // console.log(eventData[1].nodes);
                        if (!this.bloodDisplayed) { this.bloodSubgraphDisplay() }
                        else {                      this.bloodCollapse()        }
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
                    ) { this.visNetworkService.fit(this.visNetwork)  }
                }
            });
        // ********** DOUBLE CLICK ********* //
        // open your console/dev tools to see the click params
        this.visNetworkService.doubleClick
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    //DC Node Patient
                    if (eventData[1].nodes=="patient"){
                        // console.log(eventData[1].nodes);
                        this.visNetworkService.blurEdge
                        this.visNetworkService.blurNode
                        // waits(10)
                        if(!this.allDisplayed){  this.displayAll();  }
                        else {                   this.collapseAll(); }
                    }
                    // if (eventData[1].nodes=="carers"){ // maybe something ?}
                    // if (eventData[1].nodes=="home"){}
                    // if (eventData[1].nodes=="plan"){}
                    //DC Node Cardiologist
                    if (eventData[1].nodes=="cardiologist"){
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
                    //DC NODE  RHEUMATOLOGIST
                    if (eventData[1].nodes=="rheumatologist"){
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
                        //  this.visNetworkService.fit(this.visNetwork);
                    }
                    // DC Graph Rheumatologist1
                    if (eventData[1].nodes=="rheumatologist1") {
                       // console.log(eventData[1].nodes);
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
                    // DC Graph Cardiologist1
                    if (eventData[1].nodes=="cardiologist1") {
                        this.visNetworkData.nodes.remove('activityPlan1');
                        this.visNetworkData.nodes.remove('picture1');
                        this.visNetworkData.nodes.remove('cardiologist1');
                        this.visNetworkData.edges.remove('card01');
                        this.visNetworkData.edges.remove('card02');
                        this.displayLast();
                    }
                    //DC Navi towards CM (from HM)
                    if (eventData[1].nodes=="sugarHistory"
                        || eventData[1].nodes=="saturationHistory"
                        || eventData[1].nodes=="lungHistory"
                        || eventData[1].nodes=="respirationHistory"
                        || eventData[1].nodes=="weightHistory"
                        || eventData[1].nodes=="homeHeart"
                        || eventData[1].nodes=="homeActivity"
                        || eventData[1].nodes=="questionnaireHome"
                    ){  this.router.navigate(['/clinician-manager'])}
                    //DC Navi towards CM
                    if (eventData[1].nodes == "questionnaireFFbhHAQHome"
                        || eventData[1].nodes == "questionnaireRADAIHome"
                        || eventData[1].nodes == "questionnaireFFbhHAQClinic"
                        || eventData[1].nodes == "questionnaireRADAIClinic"
                        || eventData[1].nodes == "questionnaireMoriskyClinic"
                        || eventData[1].nodes == "MRI"
                        || eventData[1].nodes == "DAT"
                        || eventData[1].nodes == "PET"
                        || eventData[1].nodes == "MYSC"
                        || eventData[1].nodes == "ECG"
                        || eventData[1].nodes == "EEG"
                        || eventData[1].nodes == "painRating"
                        || eventData[1].nodes == "wellBeing"
                        || eventData[1].nodes == "hemoChrome"
                        || eventData[1].nodes == "Thyroid"
                        || eventData[1].nodes == "urineTest"
                        || eventData[1].nodes == "histTest"

                    ) { this.router.navigate(['/clinician-manager']) }
                    //DC NAVI towards CPM
                    if (eventData[1].nodes=="appointment"
                        || eventData[1].nodes=="medicationPlan"
                        || eventData[1].nodes=="activityPlan"
                        || eventData[1].nodes=="questionnairePlan"
                    ){  this.router.navigate(['/narratives-manager']) }
                }
                this.updateLastDispalayedGraphSetUp()
            });
        this.visNetworkService.fit(this.visNetwork);
    }
// MAIN routine
    public ngOnInit() {
        this.mapSourceDataToNetworkData()
        this.readLastDispalyedGraphSetUp()
        this.displayLast();
        this.setNetworkOptions();
    }
// Destroy
    public ngOnDestroy(): void {
        //localStorage.clear();
        this.visNetworkService.off(this.visNetwork, 'click');
    }
}