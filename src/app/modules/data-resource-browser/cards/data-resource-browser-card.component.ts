///<reference path="../../../../../node_modules/ng2-vis/components/network/index.d.ts"/>
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router /*Routes, RouterModule, RouterLink,*/} from '@angular/router';
import {
    VisNodes,
    VisEdges,
    VisNetworkService,
    VisNetworkData,
    VisNetworkOptions, //VisEdgeOptions,// VisFitOptions     //VisNode,
} from 'ng2-vis/components/network';
import {DRBDataService} from "../service/DRB-data.service";
import {GraphNodesDefinition} from '../model/graph-nodes-definition';
import {GraphSetUp} from '../model/graph-set-up';
class PicasoNetworkData implements VisNetworkData {
    public nodes: VisNodes;
    public edges: VisEdges;
}
@Component({
    //templateUrl: 'data-resource-browser.component.html'
    selector: 'resource-browser-tag',
    templateUrl: './data-resource-browser-card.component.html',
    styleUrls: ['./data-resource-browser-card.component.css'],
    providers: [DRBDataService]
})

export class DataResourceBrowserCardComponent implements OnInit, OnDestroy {
    public visNetwork: string = 'networkId1';
    public visNetworkData: PicasoNetworkData;
    public visNetworkOptions: VisNetworkOptions;
    public router: Router
    // public subGraphsAsArray = new Array({
    //     subGraphId: 'id',
    //     parrentGraph: 'parrent graph',
    //     isDisplayed: false,
    //     level: '0 - n'
    // })
   // public subGraphsSetUp: GraphSetUp[]
    public subGraphsAsArray: GraphSetUp[];
    public nodesAsArray: GraphNodesDefinition[];
    public errorMessage: string;
    public allDisplayed: boolean;
    public coreDisplayed: boolean;
    public scaleOfGraph: any

    //     = new Array({
    //     subGraphId: 'graphPart',
    //     parrentGraph: 'parrent graph',
    //     id: 'id',
    //     label: 'Label',
    //     title: 'title',
    //     group: 'Group',
    //     isDisplayed: false
    // });
    //edgesAsArray = new Array ({subGraphId: 'graphPart', parrentGraph: 'parrent graph', id: 'id', from: 'from', to: 'to', isDisplayed: false});
// CONSTRUCTOR
    public constructor(private visNetworkService: VisNetworkService, router: Router, private DRBDataService: DRBDataService) {
        this.router = router
    }

// MAP source data to component data
    private mapSourceDataToNetworkData() {
    /*    let patientID = '11010111'
        let fakeDateCP = '11.02.2017';
        let fakeDateHome = '12.03.2017';
        let fakeDatePlan = '01.02.2017';
        let fakeDateLab = '21.02.2017';
        //todo getters based on the data for all parameters above
        //core graph nodes
       // this.subGraphsAsArray.push({subGraphId: 'patient', parrentGraph: '', isDisplayed: true, level: '0'})
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: '',
            isDisplayed: true,
            id: 'patient',
            label: 'Peter Patient\nID: ' + patientID,
            title: 'Patient',
            group: 'Patient'
        })//is displayed is solved based on authorisation and preferences as well as dates
     //   this.subGraphsAsArray.push({subGraphId: 'patient', parrentGraph: 'patient', isDisplayed: true, level: '1'})
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'carers',
            label: 'Care Professionals\n' + fakeDateCP,
            title: 'Care professionals category\n - Click to see sub-categories',
            group: 'GroupCarers'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'home',
            label: 'Home Measurements\n and Recording\n' + fakeDateHome,
            title: 'Home monitoring data category\n - Click to see sub-categories',
            group: 'GroupHome'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'plan',
            label: 'Care Plans\n' + fakeDatePlan,
            title: 'Care plans data category\n - Click to see sub-categories',
            group: 'GroupPlan'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'lab',
            label: 'Lab tests\n' + fakeDateLab,
            title: 'Lab tests data category\n - Click to see sub-categories',
            group: 'GroupLab'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'image',
            label: 'Images\n' + fakeDateLab,
            title: 'Images - Click to see sub-categories',
            group: 'GroupImage'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'questionnaires',
            label: 'RA-Questionnaires\n' + '11.03.2017',
            title: 'Questionnaires \n - Click to see sub-categories',
            group: 'Questionnaires'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'psychoTest',
            label: 'Psychological and \nNeuropsychological Testing\n' + '15.10.2016',
            title: 'Psychological and Neuropsychological Testing\n - Click to see sub-categories',
            group: 'PsychologicalTest'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'cliMeasurements',
            label: 'Clinical measurements\n' + '15.11.2016',
            title: 'Clinical measurements\n - Click to see sub-categories',
            group: 'GroupCliMeasurements'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'surgery',
            label: 'Surgeries\n' + '(no data)',
            title: 'Surgery\n - Click to see sub-categories',
            group: 'Surgery'
        })
        this.nodesAsArray.push({
            subGraphId: 'patient',
            parrentGraph: 'patient',
            isDisplayed: true,
            id: 'screening',
            label: 'Screening\n' + '05.01.2017',
            title: 'Screening\n - Click to see sub-categories',
            group: 'GroupScreening'
        })
        //edges
        /!*        this.edgesAsArray.push({subGraphId: 'core', parrentGraph: '', isDisplayed: true, from: 'patient', to: 'carers', id: 'Patient01'})
         keeping one sample.. to keeping th first idea *!/
        //carers
        let fakeDate = '11.02.2017';
        let fakeDateCard = '11.11.2016';
       // this.subGraphsAsArray.push({subGraphId: 'carers', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'cardiologist',
            label: 'Cardiologist\n' + fakeDateCard,
            group: 'GroupCarer'
        });
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'rheumatologist',
            label: 'Rheumatologists\n' + fakeDate,
            group: 'GroupCarer'
        });
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'neurologist',
            label: 'Neurologist\n' + fakeDate,
            group: 'GroupCarer'
        });
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'neuropschologist',
            label: 'Neuropschologist\n' + fakeDate,
            group: 'GroupCarer'
        });
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'radiologist',
            label: 'Radiologist\n' + fakeDate,
            group: 'GroupCarer'
        });
        this.nodesAsArray.push({
            subGraphId: 'carers',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'gp',
            label: 'General Practitioner\n' + fakeDate,
            group: 'GroupCarer'
        });
        //home mapping
     //   this.subGraphsAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'sugarHistory',
            label: 'Blood Sugar Level (Home)\n' + '19.03.2017',
            group: 'HomeHistory'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'saturationHistory',
            label: 'Saturation (Home)\n' + '19.03.2017',
            group: 'HomeHistory'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'lungHistory',
            label: 'Lung Capacity (Home)\n' + '19.03.2017',
            group: 'BarHomeHistory'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'respirationHistory',
            label: 'Respiration Rate (Home)\n' + '19.03.2017',
            group: 'BarHomeHistory'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'weightHistory',
            label: 'Weight (Home)\n' + '19.03.2017',
            group: 'WeightHomeHistory'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'homeHeart',
            label: 'Blood Pressure and Heart rate \nHome Measurements\n' + '19.03.2017',
            group: 'HomeHeart'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'homeActivity',
            label: 'ActivityMonitoring (Home)\n' + '19.03.2017',
            group: 'HomeActivity'
        });
        this.nodesAsArray.push({
            subGraphId: 'home',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnaireHome',
            label: 'Questionnaires Answered (Home)\n' + '19.03.2017',
            group: 'QuestionnaireHome'
        });
        //this.edgesAsArray.push({subGraphId: 'home', parrentGraph: 'core', isDisplayed: true,from: 'questionnaireHome', to: 'home',id: 'home08'});
// questionnaire home
        /!*this.subGraphsAsArray.push({
            subGraphId: 'questionnaireHome',
            parrentGraph: 'home',
            isDisplayed: false,
            level: '3'
        })*!/
        this.nodesAsArray.push({
            subGraphId: 'questionnaireHome',
            parrentGraph: 'home',
            isDisplayed: true,
            title: '',
            id: 'questionnaireFFbhHAQ',
            label: 'FFbh/HAQ (at home)\n' + '11.03.2017',
            group: 'QuestionnaireHome'
        });
        this.nodesAsArray.push({
            subGraphId: 'questionnaireHome',
            parrentGraph: 'home',
            isDisplayed: true,
            title: '',
            id: 'questionnaireRADAI',
            label: 'RADAI (at home)\n' + '09.03.2017',
            group: 'QuestionnaireHome'
        });
        this.nodesAsArray.push({
            subGraphId: 'questionnaireHome',
            parrentGraph: 'home',
            isDisplayed: true,
            title: '',
            id: 'questionnaireMorisky',
            label: 'Morisky (at home)\n' + '19.03.2017',
            group: 'QuestionnaireHome'
        });
        // plan
        //this.subGraphsAsArray.push({subGraphId: 'plan', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'plan',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'appointment',
            label: 'Appointment:\n Discussion on the results\n' + '12.03.2017',
            group: 'Appointment'
        });
        this.nodesAsArray.push({
            subGraphId: 'plan',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'medicationPlan',
            label: 'Meedication plan\n' + '12.03.2017',
            group: 'MedicationPlan'
        });
        this.nodesAsArray.push({
            subGraphId: 'plan',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'activityPlan',
            label: 'Prescribed plan of activities\n' + '12.03.2017',
            group: 'ActivityPlan'
        });
        this.nodesAsArray.push({
            subGraphId: 'plan',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnairePlan',
            label: 'Prescribed Questionnaires\n' + '12.01.2017',
            group: 'QuestionnairePlan'
        });
        //Questionnaires
       // this.subGraphsAsArray.push({subGraphId: 'questionnaires', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'questionnaires',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnaireFFbhHAQHome',
            label: 'FFbh/HAQ (at home)\n' + '11.03.2017',
            group: 'QuestionnaireHome'
        });
        this.nodesAsArray.push({
            subGraphId: 'questionnaires',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnaireRADAIHome',
            label: 'RADAI (at home)\n' + '09.03.2017',
            group: 'QuestionnaireHome'
        });
        this.nodesAsArray.push({
            subGraphId: 'questionnaires',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnaireFFbhHAQClinic',
            label: 'FFbh/HAQ (at clinic)\n' + '01.03.2017',
            group: 'QuestionnaireClinic'
        });
        this.nodesAsArray.push({
            subGraphId: 'questionnaires',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'questionnaireRADAIClinic',
            label: 'RADAI (at clinic)\n' + '01.03.2017',
            group: 'QuestionnaireClinic'
        });
        //psych tests
      //  this.subGraphsAsArray.push({subGraphId: 'psychoTest', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'memory',
            label: 'Memory\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'attention',
            label: 'Attention\n' + '08.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'language',
            label: 'Language\n' + '03.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'psychoHealth',
            label: 'Psychological health:\n' + '15.10.2016',
            group: 'PsychologicalTest'
        });
        //Trial part B
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'trialPartB',
            label: 'Trial Making Test\npart B\n' + '01.05.2016',
            group: 'PsychologicalTest'
        });

//  psycho Tests MEMORY
      //  this.subGraphsAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: false, level: '3'})

        this.nodesAsArray.push({
            subGraphId: 'memory',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: '15words',
            label: 'Learning curve 15 words of Rey\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'memory',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'figureRecall',
            label: 'Recall of the figure of Rey - Osterrieth\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        //Agostino FB this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'praxia',label: 'Praxia\n' + '11.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({
            subGraphId: 'memory',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'ravlt',
            label: 'Rey Auditory Verbal Learning TOT\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
        //Agostino FB this.nodesAsArray.push({subGraphId: 'memory', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'simpleDivided',label: 'Simple and Divided\n' + '11.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({
            subGraphId: 'memory',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'roravlt',
            label: 'Recall of Rey Auditory Verbal Learning\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
//  psycho test Attention
     /!*   this.subGraphsAsArray.push({
            subGraphId: 'attention',
            parrentGraph: 'psychoTest',
            isDisplayed: false,
            level: '3'
        })*!/

        this.nodesAsArray.push({
            subGraphId: 'attention',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'stroop',
            label: 'Stroop Reduced\n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'attention',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'trial',
            label: 'Trail Making A\n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
//  psycho test language
       // this.subGraphsAsArray.push({subGraphId: 'language', parrentGraph: 'psychoTest', isDisplayed: false, level: '3'})

        this.nodesAsArray.push({
            subGraphId: 'language',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'fluency',
            label: ' Test of Semantic Fluency\n' + '05.03.2016',
            group: 'PsychologicalTest'
        });
        //Agostino FB this.nodesAsArray.push({subGraphId: 'language', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'cardSorting',label: ' Wisconsin Card Sorting Test\n' + '04.03.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({
            subGraphId: 'language',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'phonoFluency',
            label: 'Test of Phonological Fluency,\n' + '04.03.2016',
            group: 'PsychologicalTest'
        });
//  psycho test psycho health
     /!*   this.subGraphsAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: false,
            level: '3'
        })*!/
        //Agostino FB this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'hamiltonDepression',label: 'Hamilton Depression Rating Scale TOT\n' + '01.03.2016',group: 'PsychologicalTest'});
        //Agostino FB this.nodesAsArray.push({subGraphId: 'psychoHealth', parrentGraph: 'psychoTest', isDisplayed: true, title: '',id: 'beckDepression',label: 'Beck Depression Inventory TOT \n' + '01.02.2016',group: 'PsychologicalTest'});
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'depression',
            label: 'Depression Tests\n' + '01.02.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'anxiety',
            label: 'Anxiety\n(Hamilton Anxiety Scale)\n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 's-hPleasure',
            label: 'Snaith-Hamilton Pleasure Scale \n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'angerExpression',
            label: 'State-Trait Anger Expression Inventory TOT \n' + '01.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'parkinsonPsychosis',
            label: 'Parkinson Psychosis Rating Scale \n' + '10.03.2016',
            group: 'PsychologicalTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'psychoHealth',
            parrentGraph: 'psychoTest',
            isDisplayed: true,
            title: '',
            id: 'euroquol',
            label: 'Euroquol Rating Scale \n' + '01.05.2016',
            group: 'PsychologicalTest'
        });
//  psycho Tests EXECUTIVE Functions
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: 'evaluated by Wisconsin Card Sorting Test',
            id: 'executive',
            label: 'Executive Functions\n' + '11.03.2016',
            group: 'PsychologicalTest'
        })
//  psycho Tests PRAXIA
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: 'evaluated by Copy of the figure Rey-Osterrieth',
            id: 'praxia',
            label: 'Praxia\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
//  psycho Tests Global Congnitive status
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: 'evaluated by Mini-Mental State Examination',
            id: 'gloCongStatus',
            label: 'Global Congnitive Status\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
//  psycho Tests PD SEVERITY
        this.nodesAsArray.push({
            subGraphId: 'psychoTest',
            parrentGraph: 'core',
            isDisplayed: true,
            title: 'evaluated by H&amp;Y score and UPDRS III score',
            id: 'pdSecerity',
            label: 'PD Severity\n' + '11.03.2016',
            group: 'PsychologicalTest'
        });
//  IMage
     //   this.subGraphsAsArray.push({subGraphId: 'image', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'image',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'MRI',
            label: 'MRI\n' + '01.02.2017',
            group: 'GroupImage'
        });
        this.nodesAsArray.push({
            subGraphId: 'image',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'DAT',
            label: 'Dat Scan\n' + '21.02.2017',
            group: 'GroupImage'
        });
        this.nodesAsArray.push({
            subGraphId: 'image',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'PET',
            label: 'PET\n' + '22.03.2016',
            group: 'GroupImage'
        });
        this.nodesAsArray.push({
            subGraphId: 'image',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'MYSC',
            label: 'Myocardial scintigraphy\n' + '10.01.2017',
            group: 'GroupImage'
        });
//  Cli measurements
    /!*    this.subGraphsAsArray.push({
            subGraphId: 'cliMeasurements',
            parrentGraph: 'core',
            isDisplayed: false,
            level: '2'
        })*!/
        this.nodesAsArray.push({
            subGraphId: 'cliMeasurements',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'ECG',
            label: 'ECG\n' + '01.02.2015',
            group: 'GroupCliMeasurements'
        });
        this.nodesAsArray.push({
            subGraphId: 'cliMeasurements',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'EEG',
            label: 'EEG\n' + '15.11.2016',
            group: 'GroupCliMeasurements'
        });
//screenings
       // this.subGraphsAsArray.push({subGraphId: 'screening', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'screening',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'painRating',
            label: 'Pain rating\n' + '03.01.2017',
            group: 'GroupScreening'
        });
        //this.visNetworkData.edges.add({from: 'painRating', to: 'screening',id: 'pain01'});
        this.nodesAsArray.push({
            subGraphId: 'screening',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'wellBeing',
            label: 'Well-Being rating\n' + '05.01.2017',
            group: 'GroupScreening'
        });
//lab
        let fakeLab = '21.02.2017';
       // this.subGraphsAsArray.push({subGraphId: 'lab', parrentGraph: 'core', isDisplayed: false, level: '2'})
        this.nodesAsArray.push({
            subGraphId: 'lab',
            parrentGraph: 'core',
            isDisplayed: true,
            id: 'bloodTest',
            label: 'Blood Analysis:\n' + fakeLab,
            title: 'Blood anaysis data category\n - Click to see sub-categories',
            group: 'BloodTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'lab',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'urineTest',
            label: 'Urine exam:\n' + fakeLab,
            group: 'UrineTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'lab',
            parrentGraph: 'core',
            isDisplayed: true,
            title: '',
            id: 'histTest',
            label: 'Histology:\n' + '31.10.2015',
            group: 'HistTest'
        });
// blood
        //this.subGraphsAsArray.push({subGraphId: 'bloodTest', parrentGraph: 'lab', isDisplayed: false, level: '3'})
        this.nodesAsArray.push({
            subGraphId: 'bloodTest',
            parrentGraph: 'lab',
            isDisplayed: true,
            id: 'hemoChrome',
            label: 'Hemochrome\n' + fakeLab,
            title: '3 hemochrome tests found',
            group: 'BloodTest'
        });
        this.nodesAsArray.push({
            subGraphId: 'bloodTest',
            parrentGraph: 'lab',
            isDisplayed: true,
            title: '',
            id: 'Thyroid',
            label: 'Thyroid hormones\n' + fakeLab,
            group: 'BloodTest'
        });
        // this.subGraphsAsArray.push({subGraphId: 'hemoChrome', parrentGraph: 'bloodTest', isDisplayed: false, level: '4'})
        // this.nodesAsArray.push({subGraphId: 'hemoChrome' , parrentGraph: 'bloodTest', isDisplayed: true,id: 'tst',label: 'tst\n' + fakeLab,title: 'tst',group: 'GroupHome'});*/
    }

// Reflect in Visual network - i.e. Create or Remove Visual Network representation (and thus it is (or NOT) displayed after this operation)
    private reflectToVisNetwork(subGraphName: String, redrawGraph: boolean) {
        if (subGraphName != 'patient' && redrawGraph){
            this.coreGraphReset()
            this.displayLast()
        }
        //todo experiment - displaying all nodes after any action to withdraw the dancing/caused by physics
        let subGraphNodesArray: any;
        let index: any;
        //this.nodesAsArray.sort()
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
        console.log('dlzka 1:', subGraphNodesArray.length)
        console.log('level :', subGraphNodesArray.level)
        if (subGraphNodesArray.length > 0 /* && !subGraphNodesArray.isLeaf*/) {
            index = this.subGraphsAsArray.findIndex(item => item.subGraphId === subGraphName)
            console.log('A  ' + this.subGraphsAsArray[index].isDisplayed)
            if (this.subGraphsAsArray[index].isDisplayed == false || subGraphName === 'patient') {
                //
                this.subGraphsAsArray[index].isDisplayed = true // so show the subgraph .. create Vis network
                for (var i = 0; i < subGraphNodesArray.length; i++) {
                    console.log('B')
                    if (subGraphNodesArray[i]) {
                        //Nodes
                        this.visNetworkData.nodes.add({
                            id: subGraphNodesArray[i].id,
                            label: subGraphNodesArray[i].label,
                            title: subGraphNodesArray[i].title,
                            group: subGraphNodesArray[i].group/*, x: 100, y: 100*/
                        });
                        if (subGraphNodesArray[i].parrentGraph != '') {
                            //EDGES
                            let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                            //console.log(edgeId) console.log(subGraphNodesArray[i].id) console.log(subGraphNodesArray[i].subGraphId) console.log(subGraphNodesArray[i].parrentGraph)
                            this.visNetworkData.edges.add({
                                id: edgeId,
                                from: subGraphNodesArray[i].id,
                                to: subGraphNodesArray[i].subGraphId
                            });
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.subGraphsAsArray.length; i++) {
                    //    // for all displayed subgraphs within current subgraph
                    if (this.subGraphsAsArray[i].isDisplayed && this.subGraphsAsArray[i].parrentGraph == subGraphName) {
                        this.reflectToVisNetwork(this.subGraphsAsArray[i].subGraphId, false)
                        //console.log('C 1')
                    }
                }
                //console.log('C 0')
                this.subGraphsAsArray[index].isDisplayed = false
                for (var i = 0; i < subGraphNodesArray.length; i++) {
                    if (subGraphNodesArray[i]) {
                        //Nodes
                        this.visNetworkData.nodes.remove(subGraphNodesArray[i].id)
                        if (subGraphNodesArray[i].parrentGraph != '') {
                            //EDGES
                            let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                            //console.log(edgeId)
                            this.visNetworkData.edges.remove(edgeId)
                        }
                        this.allDisplayed = false
                    }
                }
            }
        }
        if (index != null && this.subGraphsAsArray[index].subGraphId != 'patient') { //patient-core is handled differently since it is displayed allways
            this.updateLastDispalayedSubGraph(index)
        }
    }

// NETWORK options //
    private setNetworkOptions() {
        let shadowOn = true;
        this.visNetworkOptions = {
            clickToUse: true,
            interaction: {
                hover: true,
                navigationButtons: true,
                keyboard: true
            },
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
               // smooth: true,
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
                GroupCarers: {
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
                    //border: '#2B7CE9', // nefunguje
                },
                GroupCarer: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0f0',
                        size: 50,
                        color: '#45ac8b'//color blind schema #0064ac'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                Surgery: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf12a',
                        size: 50,
                        color: '#d17c3a'//color blind schema #0064ac'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },

                GroupScreening: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1de',
                        size: 50,
                        color: '#c0639d'//color blind schema #0064ac'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                QuestionnaireClinic: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#228540'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                Patient: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf183',
                        size: 125,
                        color: '#8C001A'//color blind schema #c2bc00
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                GroupImage: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf03e',
                        size: (50 * 1.0),
                        color: '#52008c'//color blind schema #c2bc00
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                GroupPlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf15c', //&#xf1c0;
                        size: (60 * 1.00),
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,

                },
                Appointment: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf073', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                Calendar: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf073', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                QuestionnairePlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                MedicationPlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0fa', //&#xf1c0;
                        size: (50 * 1.00),
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                Observation: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf201',
                        size: 50,
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                ActivityPlan: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf17d', //f1c0', //&#xf1c0;
                        size: 50,
                        color: '#000080'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                GroupHome: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015', //f1c0', //&#xf1c0;
                        size: (60 * 1.00),
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                HomeActivity: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf17d', //f1c0', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                QuestionnaireHome: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },

                Questionnaires: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0cb', //&#xf1c0;
                        size: 50,
                        color: '#090456'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                PsychologicalTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf12e', //&#xf1c0;
                        size: 50,
                        color: '#120c29'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                Data: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1c0', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                HomeHeart: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf21e', //&#xf1c0;
                        size: (50 * 1.00),
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                HomeHistory: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1fe', //&#xf1c0;
                        size: 50,
                        color: '#2B65EC'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
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
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                GroupCliMeasurements: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1fe', //&#xf1c0;
                        size: 50,
                        color: '#06d16f'
                    }
                },
                GroupLab: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3',
                        size: 60,
                        color: '#39b2ed'//#9276ff',//1F45FC' asi zhodne  CBS a obyc schemacolor blind schema #39b2ed
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                BloodTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#8b0000'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                HistTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#D0926E'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
                UrineTest: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c3', //&#xf1c0;
                        size: 50,
                        color: '#f9d616'
                    },
                    font: {strokeWidth: 3, strokeColor: 'white'},
                    width: 2,
                    borderWidth: 3,
                },
            }
        }
        /*     this.visNetworkOptions.groups.add({UrineTest: {
         shape: 'icon',
         icon: {
         face: 'FontAwesome',
         code: '\uf0c3', //&#xf1c0;
         size: 50,
         color: '#f9d616'
         }
         }
         })
         */
    }

// REMOVE Visual Network representation (and thus it is NOT displayed)
    private removeVisNetwork(subGraphName: String) {
        let subGraphNodesArray: any;
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
        if (subGraphNodesArray.length > 0) {
            let index = this.subGraphsAsArray.findIndex(item => item.subGraphId === subGraphName)
            if (this.subGraphsAsArray[index].isDisplayed == true) {
                this.subGraphsAsArray[index].isDisplayed = false // so collapse the subgraph
                for (var i = 0; i < subGraphNodesArray.length; i++) {
                    if (subGraphNodesArray[i]) {
                        //Nodes
                        this.visNetworkData.nodes.remove(subGraphNodesArray[i].id)
                        if (subGraphNodesArray[i].parrentGraph != '') {
                            //EDGES
                            let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                            //console.log(edgeId)
                            this.visNetworkData.edges.remove(edgeId)
                        }
                    }
                }
            }
        }

    }

// Memory - what graph was displayed
    private updateLastDispalayedSubGraph(subGraphIndex) {
        sessionStorage.setItem(this.subGraphsAsArray[subGraphIndex].subGraphId, this.subGraphsAsArray[subGraphIndex].isDisplayed ? 'Displayed' : 'Inactive');
    }

    private updateLastDispalayedGraphOverall() {
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            this.updateLastDispalayedSubGraph(i)
        }
    }

    private readLastDispalyedGraphSetUp() {
        this.allDisplayed = true
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            this.subGraphsAsArray[i].isDisplayed = sessionStorage.getItem(this.subGraphsAsArray[i].subGraphId) == 'Displayed' ? true : false
            if (!this.subGraphsAsArray[i].isDisplayed) {
                this.allDisplayed = false
            }
        }
    }

// DISPALAY //
    //DISPLAY LAST
    private displayLast() {
        console.log('1 core: ', !this.coreDisplayed)
        if(!this.coreDisplayed) {
            this.coreGraphDisplay()
        }
        else{

        }
        console.log('2 dlzka: ', this.subGraphsAsArray.length)
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            console.log('2.1 last: ',this.subGraphsAsArray[i].subGraphId )
            console.log('2.2 last: ',this.subGraphsAsArray[i].isDisplayed)
            if (this.subGraphsAsArray[i].subGraphId != 'patient' && this.subGraphsAsArray[i].isDisplayed) {
                console.log('3 last: ',this.subGraphsAsArray[i].subGraphId )
                this.subGraphsAsArray[i].isDisplayed = false //otherwise the mechanism takes it as really dislayed ...
                this.reflectToVisNetwork(this.subGraphsAsArray[i].subGraphId, false)
            }
        }
        // this.visNetworkService.fit(this.visNetwork);
    }

    // DISPALY ALL subgrahs //
    private displayAll(): void {
        if (this.allDisplayed) {
            return
        }
        //collapse all subgrpahs that are displayed
        this.collapseAll(); // since the building of overall graph starts from 1st node the oscilations are not displayed (desired state)
        //display all subgraphs
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            if (this.subGraphsAsArray[i].subGraphId && this.subGraphsAsArray[i].subGraphId != 'patient') {
                this.reflectToVisNetwork(this.subGraphsAsArray[i].subGraphId, false)
            }
        }
        this.allDisplayed = true;
        this.updateLastDispalayedGraphOverall()
        this.visNetworkService.fit(this.visNetwork);
    }

    //display core
    private coreGraphDisplay() {
        //this.visNetworkService.
        let nodes = new VisNodes();
        let edges = new VisEdges();

        this.visNetworkData = {
            nodes: nodes,
            edges: edges
        }
        this.reflectToVisNetwork('patient', false)
        this.coreDisplayed = true
    }

    private coreGraphReset() {
        //this.visNetworkService.
        this.coreCollapse()
        this.coreGraphDisplay();
    }

// COLLAPSE
    private collapseAll(): void {
        let anyCollapsingDone = false
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            //all subgrpahs displayed except core (is is handeled differently as it is displayed allways)
            if (this.subGraphsAsArray[i].subGraphId != 'patient' && this.subGraphsAsArray[i].isDisplayed) {
                this.reflectToVisNetwork(this.subGraphsAsArray[i].subGraphId, false)
                anyCollapsingDone = true
            }
        }
        if (anyCollapsingDone) {
            this.allDisplayed = false;
            this.updateLastDispalayedGraphOverall()
        }
        // display core graph
        this.coreGraphReset()
       //ngOnInit();
        this.visNetworkService.fit(this.visNetwork);

    }

    private coreCollapse() {
        this.removeVisNetwork('patient')
        this.coreDisplayed = false
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
                    if (eventData[1].direction == '-') {
                        if (eventData[1].scale > 0.25) {
                            //console.log(this.visNetworkService.getScale(this.visNetwork))
                            //console.log(eventData[1] + '  -')
                            this.scaleOfGraph = eventData[1].scale
                        } else {
                            //eventData[1].scale = this.scaleOfGraph
                            //this.visNetworkService.redraw(this.visNetwork)
                            //console.log(eventData[1])
                        }
                    }
                    else {
                        if (eventData[1].scale < 3.0) {
                            this.scaleOfGraph = eventData[1].scale
                            //console.log(eventData[1] + '  +')
                        } else {
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
                    if (!(eventData[1].nodes == "patient"
                        || eventData[1].nodes == "")) {
                        let nodeNameString = eventData[1].nodes.toString();
                        this.reflectToVisNetwork(nodeNameString, true)
                    }
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
                }
            });
        // ********** DOUBLE CLICK ********* //
        // open your console/dev tools to see the click params
        this.visNetworkService.doubleClick
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visNetwork) {
                    //DC Node Patient
                    if (eventData[1].nodes == "patient") {
                        // waits(10)
                        if (!this.allDisplayed) {
                            this.displayAll();
                        }
                        else {
                            this.collapseAll();
                        }
                    }
                    // if (eventData[1].nodes=="carers"){ // maybe something ?}
                    // if (eventData[1].nodes=="home"){}
                    // if (eventData[1].nodes=="plan"){}
                    //DC Node Cardiologist
                    if (eventData[1].nodes == "cardiologist") {
                        let nodesInit = new VisNodes();
                        let edgesInit = new VisEdges();
                        this.visNetworkData = {
                            nodes: nodesInit,
                            edges: edgesInit
                        };
                        this.visNetworkData.nodes.add({
                            id: 'cardiologist1',
                            label: 'Cardiologist',
                            group: 'GroupCarer'
                        });
                        this.visNetworkData.nodes.add({
                            id: 'medicationPlan1',
                            label: 'Meedication\n plan' + '22.01.2017',
                            group: 'MedicationPlan'
                        });
                        this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'cardiologist1', id: 'card01'});
                        this.visNetworkData.nodes.add({
                            id: 'appointment1',
                            label: 'Appointment:\n Discussion on the results\n' + '22.01.2017',
                            group: 'Appointment'
                        });
                        this.visNetworkData.edges.add({from: 'appointment1', to: 'cardiologist1', id: 'card02'});
                        //  this.visNetworkService.fit(this.visNetwork);
                    }
                    //DC NODE  RHEUMATOLOGIST
                    if (eventData[1].nodes == "rheumatologist") {
                        //this.visNetworkData.edges.flush();
                        let nodesInit = new VisNodes();
                        let edgesInit = new VisEdges();
                        this.visNetworkData = {
                            nodes: nodesInit,
                            edges: edgesInit
                        };
                        this.visNetworkData.nodes.add({
                            id: 'rheumatologist1',
                            label: 'Rheumatologists',
                            group: 'GroupCarer'
                        });
                        this.visNetworkData.nodes.add({
                            id: 'appointment1',
                            label: 'Appointment:\n Discussion on the results\n' + '27.02.2017',
                            group: 'Appointment'
                        });
                        this.visNetworkData.edges.add({from: 'appointment1', to: 'rheumatologist1', id: 'rhe01'});
                        this.visNetworkData.nodes.add({
                            id: 'medicationPlan1',
                            label: 'Meedication\n plan' + '27.02.2017',
                            group: 'MedicationPlan'
                        });
                        this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'rheumatologist1', id: 'rhe02'});
                        this.visNetworkData.nodes.add({
                            id: 'activityPlan1',
                            label: 'Prescribed plan of activities\n' + '27.02.2017',
                            group: 'ActivityPlan'
                        });
                        this.visNetworkData.edges.add({from: 'activityPlan1', to: 'rheumatologist1', id: 'rhe03'});
                        this.visNetworkData.nodes.add({
                            id: 'picture1',
                            label: 'Image' + '12.10.2016',
                            title: 'Picture or Scanned document',
                            group: 'GroupImage'
                        });
                        this.visNetworkData.edges.add({from: 'picture1', to: 'rheumatologist1', id: 'rhe04'});
                        //  this.visNetworkService.fit(this.visNetwork);
                    }
                    // DC Graph Rheumatologist1
                    if (eventData[1].nodes == "rheumatologist1") {
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
                    if (eventData[1].nodes == "cardiologist1") {
                        this.visNetworkData.nodes.remove('activityPlan1');
                        this.visNetworkData.nodes.remove('picture1');
                        this.visNetworkData.nodes.remove('cardiologist1');
                        this.visNetworkData.edges.remove('card01');
                        this.visNetworkData.edges.remove('card02');
                        this.displayLast();
                    }
                    //DC Navi towards CM (from HM)
                    if (eventData[1].nodes == "sugarHistory"
                        || eventData[1].nodes == "saturationHistory"
                        || eventData[1].nodes == "lungHistory"
                        || eventData[1].nodes == "respirationHistory"
                        || eventData[1].nodes == "weightHistory"
                        || eventData[1].nodes == "homeHeart"
                        || eventData[1].nodes == "homeActivity"
                        || eventData[1].nodes == "questionnaireHome"
                    ) {
                        this.router.navigate(['/clinician-manager'])
                    }
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

                    ) {
                        this.router.navigate(['/clinician-manager'])
                    }
                    //DC NAVI towards CPM
                    if (eventData[1].nodes == "appointment"
                        || eventData[1].nodes == "medicationPlan"
                        || eventData[1].nodes == "activityPlan"
                        || eventData[1].nodes == "questionnairePlan"
                    ) {
                        this.router.navigate(['/narratives-manager'])
                    }
                }
                //this.updateLastDispalayedSubGraph()
            });
        this.visNetworkService.fit(this.visNetwork);
    }

    // Get Graph/network data
    private getGraphNetworkData(): void {


        this.DRBDataService.getGraphSetUp().subscribe(
            graphSetUp => {
                this.subGraphsAsArray = graphSetUp;
                this.DRBDataService.getGraphNodes().subscribe(
                    node => {
                        this.nodesAsArray = node;
                        //  console.log("result from service 1:", this.nodesAsArray)
                        // this.mapSourceDataToNetworkData()
                        this.readLastDispalyedGraphSetUp()
                        this.displayLast();
                    },
                    error => this.errorMessage = <any>error);

                // console.log("result from service 2:", this.subGraphsAsArray)

            },
            error => this.errorMessage = <any>error);

        //console.log(this.errorMessage);

    }
// MAIN routine
    public ngOnInit() {
        this.getGraphNetworkData()
        // this.mapSourceDataToNetworkData()
        // this.readLastDispalyedGraphSetUp()
        // this.displayLast();
        this.setNetworkOptions();
    }

// Destroy
    public ngOnDestroy(): void {
        //localStorage.clear();
        this.visNetworkService.off(this.visNetwork, 'click');
    }
}