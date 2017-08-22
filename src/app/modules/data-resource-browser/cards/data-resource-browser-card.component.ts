///<reference path="../../../../../node_modules/ng2-vis/components/network/index.d.ts"/>
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router /*Routes, RouterModule, RouterLink,*/} from '@angular/router';
import {
    VisNodes,
    VisNode,
    VisEdges,
    VisNetworkService,
    VisNetworkData,
    VisNetworkOptions, //VisEdgeOptions,// VisFitOptions     //VisNode,
} from 'ng2-vis/components/network';
import {DRBDataService} from "../service/DRB-data.service";
import {PicasoDataService} from "../service/picaso.service";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {PatientData} from '../model/patient-data';

import {GraphNodesDefinition} from '../model/graph-nodes-definition';
import {GraphSetUp} from '../model/graph-set-up';
import {LoadProgress} from "../model/load-progress";
import {TableItem} from "../model/table-item";
import {DataForNodes} from "../model/data-for-nodes";

class PicasoNetworkData implements VisNetworkData {
    public nodes: VisNodes;
    public edges: VisEdges;
}

@Component({
    //templateUrl: 'data-resource-browser.component.html'
    selector: 'resource-browser-tag',
    templateUrl: './data-resource-browser-card.component.html',
    styleUrls: ['./data-resource-browser-card.component.css'],
    providers: [DRBDataService, PicasoDataService]
})

export class DataResourceBrowserCardComponent implements OnInit, OnDestroy {

  //Items table
  public tableData: TableItem[];
  public rowsOnPage = 5;
  public sortBy = "startDate";
  public sortOrder = "desc";

  animationToggle: boolean = true;
  public visNetwork: string = 'networkId1';
  public visNetworkData: PicasoNetworkData;
  public visNetworkOptions: VisNetworkOptions;
  private coreLevel: number = 2;
  private R: number = 165;
  private angleBegin: number = 2 / 5 * (Math.PI / 2);
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
  public observations: DataForNodes[];
  public progress: LoadProgress = {percentage: 0, total: 0, loaded: 0}
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
    public constructor(private visNetworkService: VisNetworkService, router: Router, private drbDataService:DRBDataService, private picasoDataService: PicasoDataService) {
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

        //done experiment - displaying all nodes after any action to withdraw the dancing/caused by physics
        let subGraphNodesArray: GraphNodesDefinition[];
        let index: number;
        let subGraphInfo: GraphSetUp;
        //this.nodesAsArray.sort()
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
         //console.log('dlzka 1:', subGraphNodesArray.length)
        if (subGraphNodesArray.length > 0 ) {
            index = this.subGraphsAsArray.findIndex(item => item.subGraphId === subGraphName)
            subGraphInfo = this.subGraphsAsArray[index];
            //console.log('A  ' + this.subGraphsAsArray[index])
            if (subGraphInfo.level >= this.coreLevel && redrawGraph)
            {
                this.coreGraphReset()
                this.displayLast()
            }
            if ((subGraphInfo.isDisplayed == false || subGraphInfo.level < this.coreLevel)) { //subGraphName === 'patient' || subGraphName === 'core' )) {
                this.subGraphsAsArray[index].isDisplayed = true // so show the subgraph .. create Vis network . .and remember the stare
                //console.log('Unsorted: ',subGraphNodesArray)
                subGraphNodesArray.sort((left, right): number => {
                    if(left.label > right.label) return -1;
                    if(left.label < right.label) return 1;
                    return 0;
                });
                //console.log('Sorted: ',subGraphNodesArray)
                //number of nodes to be displayed
                let n: number = 0;
                n = subGraphNodesArray.length;
               // console.log('lengthe: ', n)
                //angles and  x, y
                let x, y, xParOfPar, yParOfPar, angleIteration, angleBegin: number;

                xParOfPar = x = 0;
                yParOfPar = y = 0;
                angleIteration = 0;
                angleBegin = 0;

                let parrentNode: GraphNodesDefinition;
              //  console.log('Level: ', subGraphInfo.level)

                if(subGraphInfo.level > 0) {

                    let parGraph : string = subGraphNodesArray[0].subGraphId == 'core' ? subGraphNodesArray[0].parrentGraph : subGraphNodesArray[0].subGraphId
                   // console.log('trav 1: ', parGraph)

                    let nodeVN: VisNode  = this.visNetworkData.nodes.getById(parGraph)
                   // console.log('node  :   ', nodeVN)

                    parrentNode = this.nodesAsArray.find(item => item.id === parGraph)
                    if(subGraphInfo.level > 1) {
                        let parrentOfParrentNode: GraphNodesDefinition;
                        let parGraph : string = parrentNode.subGraphId == 'core' ? parrentNode.parrentGraph : parrentNode.subGraphId

                     //   console.log('trav 2: ', parGraph)
                        parrentOfParrentNode = this.nodesAsArray.find(item => item.id === parGraph)
                        xParOfPar = parrentOfParrentNode.x == -0 ? 0 : parrentOfParrentNode.x
                        yParOfPar = parrentOfParrentNode.y == -0 ? 0 : parrentOfParrentNode.y
                    }
                }
                if(subGraphInfo.level === 1 ){ //level === 0 takes initial x and y
                    angleIteration = 2*Math.PI/n//(n==1 ? 1 : n-1);
                    angleBegin = this.angleBegin;
                }
                if(subGraphInfo.level > 1) {
                    // a bit less than 1/2 of Circle around [X root node, Y root node] will be evenly/iteratively used
                    angleIteration = Math.PI/(4/3*(n==1 ? 1 : n-1));
                    // find azimut of parent node
                    let parrentX, parrentY: number;
                    parrentX = parrentNode.x == -0 ? 0 : parrentNode.x;
                    parrentY = parrentNode.y == -0 ? 0 : parrentNode.y

                    let R: number
                    R = Math.sqrt(Math.pow((parrentX-xParOfPar),2) + Math.pow((parrentY-yParOfPar),2))
                    //console.log(R)

                    angleBegin = Math.acos((parrentX - xParOfPar)/R) - Math.PI/2 + Math.PI/(3*2);
                    if((parrentY - yParOfPar) < 0)
                    {
                        if((parrentX - xParOfPar) < 0) {
                            angleBegin = angleBegin + 1/2 * Math.PI;
                        }
                        if((parrentX - xParOfPar) > 0){
                            angleBegin = angleBegin - 1/6 * Math.PI;
                        }

                    }

                   // console.log('angleIter:', 180/Math.PI*angleIteration , 'angle begin:', 180/Math.PI*angleBegin, 'par id: ',parrentNode.id,' - parent x: ', parrentX, 'par y: ',parrentY, 'parPar x:', xParOfPar,'parPar y:',yParOfPar, 'Atan: ', 180/Math.PI*Math.atan((parrentY - yParOfPar)/(parrentX - xParOfPar)))

                }
                for (var i = 0; i < n; i++) {
                    //console.log('B')
                    if (subGraphNodesArray[i]) {
                        //todo calculation of position -tuning
                        if(subGraphInfo.level === 1) {
                            x = Math.cos(angleBegin + i*angleIteration)*this.R  //Root (level = 0) has initial [0. 0]
                            y =  Math.sin(angleBegin + i*angleIteration)*this.R//the whole circle around [0, 0] position will be used
                        }
                        if(subGraphInfo.level > 1) {
                            x = Math.cos(angleBegin + i*angleIteration)*this.R + parrentNode.x;
                            y =  Math.sin(angleBegin + i*angleIteration)*this.R  + parrentNode.y ;

                            //console.log('x-par info: ', parrentNode)

                        }

                       // console.log(' x: ',x, ' y: ',y,  ' angle:', 180/Math.PI*(angleBegin +i*angleIteration),' id: ', subGraphNodesArray[i].id, ' label ', subGraphNodesArray[i].label)
                        //console.log('id: ', subGraphNodesArray[i].id, 'title: ', subGraphNodesArray[i].title)
                        //TODO - not x and y do not correspond to what is observable
                        if(x != NaN && y != NaN) {
                            subGraphNodesArray[i].x = x
                            subGraphNodesArray[i].y = y
                        }
                        //Nodes
                        this.visNetworkData.nodes.add({
                            id: subGraphNodesArray[i].id,
                            label: subGraphNodesArray[i].label,
                            title: subGraphNodesArray[i].isLeaf ? subGraphNodesArray[i].label + " - Click to see the elements in table below": subGraphNodesArray[i].label + " - Click to see sub-categories",
                            group: subGraphNodesArray[i].group,/*, x: 100, y: 100*/
                            x: subGraphNodesArray[i].x,
                            y: subGraphNodesArray[i].y
                        });
                        //console.log(subGraphNodesArray[i].x)
                       // console.log(subGraphNodesArray[i].y)
                        if (subGraphNodesArray[i].parrentGraph != '') {
                            //EDGES
                            let edgeId = subGraphNodesArray[i].subGraphId + '-' + i.toString();
                         //   console.log(edgeId) //console.log(subGraphNodesArray[i].id) console.log(subGraphNodesArray[i].subGraphId) console.log(subGraphNodesArray[i].parrentGraph)
                            this.visNetworkData.edges.add({
                                id: edgeId,
                                from: subGraphNodesArray[i].id,
                                to: subGraphNodesArray[i].subGraphId == 'core' ? subGraphNodesArray[i].parrentGraph : subGraphNodesArray[i].subGraphId
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
                      //  console.log('C 1')
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
                           // console.log(edgeId)
                            this.visNetworkData.edges.remove(edgeId)
                        }
                        this.allDisplayed = false
                    }
                }
            }
        }
        if (index != null && this.subGraphsAsArray[index].parrentGraph != "") { //patient-core is handled differently since it is displayed allways
            // remeber the state of displayed subgraphs
            console.log('remembering');
            this.updateLastDispalayedSubGraph(index)
        }
    }

// NETWORK options //
    private setNetworkOptions() {
        let shadowOn = false;

        this.visNetworkOptions = {
            //autoResize: true,
           /* layout: {
                hierarchical: {
                    direction: 'UD'
                }
            },*/
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
                //smooth: true,
            },
            physics:
            {

                "minVelocity": 1.9
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
              HomeSleep: {
                shape: 'icon',
                icon: {
                  face: 'FontAwesome',
                  code: '\uf236', //f1c0', //&#xf1c0;
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
        let subGraphNodesArray: GraphNodesDefinition[];
        subGraphNodesArray = this.nodesAsArray.filter(item => item.subGraphId === subGraphName && item.isDisplayed === true)
        if (subGraphNodesArray.length > 0) {
            let index = this.subGraphsAsArray.findIndex(item => item.subGraphId === subGraphName)
            if (this.subGraphsAsArray[index].isDisplayed == true) {
                this.subGraphsAsArray[index].isDisplayed = false // so collapse/hide the subgraph
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
    private updateUndoDispalayedSubGraph(subGraphIndex) {
      sessionStorage.setItem(this.subGraphsAsArray[subGraphIndex].subGraphId + "UNDO", sessionStorage.getItem(this.subGraphsAsArray[subGraphIndex].subGraphId));

    }
    private updateLastDispalayedSubGraph(subGraphIndex) {
        this.updateUndoDispalayedSubGraph(subGraphIndex)
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

    private readUNDODispalyedGraphSetUp() {
      this.allDisplayed = true
      for (var i = 0; i < this.subGraphsAsArray.length; i++) {
        this.subGraphsAsArray[i].isDisplayed = sessionStorage.getItem(this.subGraphsAsArray[i].subGraphId + "UNDO") == 'Displayed' ? true : false
        if (!this.subGraphsAsArray[i].isDisplayed) {
          this.allDisplayed = false
       }
      }
    }

// DISPALAY //
    //DISPLAY LAST
    private displayLast() {
        //console.log('1 core: ', !this.coreDisplayed)
        if(!this.coreDisplayed) {
            this.coreGraphDisplay()
        }
        else{

        }
        //console.log('2 dlzka: ', this.subGraphsAsArray.length)
        for (var i = 0; i < this.subGraphsAsArray.length; i++) {
            //console.log('2.1 last: ',this.subGraphsAsArray[i].subGraphId )
            //console.log('2.2 last: ',this.subGraphsAsArray[i].isDisplayed)
            if (this.subGraphsAsArray[i].level >= this.coreLevel && this.subGraphsAsArray[i].isDisplayed) { // level 0, 1 are core displayed allways
                //console.log('3 last: ',this.subGraphsAsArray[i].subGraphId )
                this.subGraphsAsArray[i].isDisplayed = false //otherwise the mechanism takes it as really dislayed ...
                this.reflectToVisNetwork(this.subGraphsAsArray[i].subGraphId, false)
            }
        }
        // this.visNetworkService.fit(this.visNetwork);
    }
    //DISPLAY LAST
    private displayUNDO() {
      //console.log('1 core: ', !this.coreDisplayed)
     // if(!this.coreDisplayed) {
        let subgraphToReflect = []
        this.coreGraphReset()
     // }

      //console.log('2 dlzka: ', this.subGraphsAsArray.length)
      for (var i = 0; i < this.subGraphsAsArray.length; i++) {
        //console.log('2.1 last: ',this.subGraphsAsArray[i].subGraphId )
        //console.log('2.2 last: ',this.subGraphsAsArray[i].isDisplayed)
       // console.log(this.subGraphsAsArray[i].isDisplayed, "id: " + this.subGraphsAsArray[i].subGraphId)
        if (this.subGraphsAsArray[i].level >= this.coreLevel && this.subGraphsAsArray[i].isDisplayed ) { // level 0, 1 are core displayed allways
          //console.log('3 last: ',this.subGraphsAsArray[i].subGraphId )
          //if subgraph in UNDO state isDispalyed == true and current isDispalyed == false .. then displaye otherwise do nothing (as it is displayed allready)
          //if(this.subGraphsAsArray[i].isDisplayed != (sessionStorage.getItem(this.subGraphsAsArray[i].subGraphId) == 'Displayed' ? true : false)) {
            this.subGraphsAsArray[i].isDisplayed =  !this.subGraphsAsArray[i].isDisplayed//otherwise the mechanism takes it as really dislayed ...
            subgraphToReflect.push(i)
          //}
        }
      }
      for (var i = 0; i < subgraphToReflect.length; i++) {
          console.log(" UNDO subgrahs: ", subgraphToReflect[i], " ID: ", this.subGraphsAsArray[subgraphToReflect[i]].subGraphId)
          this.reflectToVisNetwork(this.subGraphsAsArray[subgraphToReflect[i]].subGraphId, false)
      }
    // this.visNetworkService.fit(this.visNetwork);
    }
    private reflectUNDO() {
        this.readUNDODispalyedGraphSetUp()
        this.displayUNDO()
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
            if (this.subGraphsAsArray[i].subGraphId && this.subGraphsAsArray[i].level >= this.coreLevel) {
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
        let subGraphsOnLevel: GraphSetUp[];

        this.visNetworkData = {
            nodes: nodes,
            edges: edges
        }
        let index: number;
        for(var i = 0; i < this.coreLevel; i++ ){
            subGraphsOnLevel = this.subGraphsAsArray.filter(item => item.level === i)
            for (var j = 0; j < subGraphsOnLevel.length; j++){
                  this.reflectToVisNetwork(subGraphsOnLevel[j].subGraphId, false)
            }

            //this.reflectToVisNetwork(this.subGraphsAsArray[index].subGraphId, false)
            console.log('core subgraphs',subGraphsOnLevel)
        }

        // this.reflectToVisNetwork('patient', false)
        // this.reflectToVisNetwork('core', false)
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
            if (this.subGraphsAsArray[i].level >= this.coreLevel && this.subGraphsAsArray[i].isDisplayed) {
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
        let subGraphsOnLevel: GraphSetUp[];
        let index: number;
        for(var i = 0; i < this.coreLevel; i++ ){
            subGraphsOnLevel = this.subGraphsAsArray.filter(item => item.level === i)
            for (var j = 0; j < subGraphsOnLevel.length; j++){
                this.removeVisNetwork(subGraphsOnLevel[j].subGraphId)
            }
           // console.log('core subgraph',this.subGraphsAsArray[index].subGraphId)
        }
      //  this.removeVisNetwork('core')
       // this.removeVisNetwork('patient')
        this.coreDisplayed = false
    }

// EVENTS handling (mouse, keyboard, zoom)
    public networkInitialized() {
        //this.visNetworkService.redraw(this.visNetwork)
        // now we can use the service to register on events
        this.visNetworkService.on(this.visNetwork, 'click');
        //doubleClick
        this.visNetworkService.on(this.visNetwork, 'doubleClick');
        //this.visNetworkService.on(this.visNetwork, 'zoom');
       // this.visNetworkService.on(this.visNetwork, 'stabilizationIterationsDone')
        //***** on zoom, OnZoom *****
       /* this.visNetworkService.zoom
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
            });*/
        //***** on click, OnClick *****
        this.visNetworkService.click
            .subscribe((eventData: any[]) => {
           // console.log('event: ', eventData[1])
                if (eventData[0] === this.visNetwork) {
                    // need infos about node - default it is LEaf or not clivcked to the node happend
                    let IsLeafNodeOrCLickedOut: boolean = true; //
                    let nodeNameString: string = eventData[1].nodes.toString();
                    if (eventData[1].nodes != "") {
                        let nodeInfo: GraphNodesDefinition;
                        nodeInfo = this.nodesAsArray.find(item => item.id === nodeNameString)
                        if (nodeInfo) {
                            IsLeafNodeOrCLickedOut = nodeInfo.isLeaf
                          //if(nodeInfo.isLeaf){
                              this.fillTableBelowDRB(nodeInfo.id, nodeInfo.isLeaf)

                         // }//
                        }
                    }
                    if(IsLeafNodeOrCLickedOut) {
                        //is leaf or clicked next to the network ("" event)

                        this.visNetworkService.fit(this.visNetwork)
                    }
                    else{
                        // expand or collapse of subGraph is considerable
                        let subGraphInfo: GraphSetUp;
                        subGraphInfo = this.subGraphsAsArray.find(item => item.subGraphId === nodeNameString )
                        if(subGraphInfo.level >= this.coreLevel) {
                            //within core graph do not reflect clicks, as collapse means you are below core
                            this.reflectToVisNetwork(nodeNameString, true)
                        }
                    }
                }
                    console.log(eventData[1].nodes, 'one: ', eventData[1]);

      });
    // ********** DOUBLE CLICK ********* //
    // open your console/dev tools to see the click params
    this.visNetworkService.doubleClick
      .subscribe((eventData: any[]) => {
        if (eventData[0] === this.visNetwork) {
          //DC Node ) level -> thus A Root node
          let parrentGraph: string = "";
          if (eventData[1].nodes != "") {
            let nodeNameString: string = eventData[1].nodes.toString();
            let nodeInfo: GraphNodesDefinition;
            nodeInfo = this.nodesAsArray.find(item => item.id === nodeNameString)
            if (nodeInfo) {
              parrentGraph = nodeInfo.parrentGraph
            }
          }
          if (parrentGraph === "" && eventData[1].nodes == 'patient') { //thus DoubleClicked on the level = 0 node / a Root node
            // waits(10)
            if (!this.allDisplayed) {
              this.displayAll();
            }
            else {
              this.collapseAll();
            }
            // console.log(eventData[1])
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
              label: 'Cardiologist\n' + '15.02.2015',
              group: 'GroupCarer'
            });
            this.visNetworkData.nodes.add({
              id: 'medicationPlan1',
              label: 'Meedication plan\n' + '15.02.2015',
              group: 'MedicationPlan'
            });
            this.visNetworkData.edges.add({from: 'medicationPlan1', to: 'cardiologist1', id: 'card01'});
            this.visNetworkData.nodes.add({
              id: 'appointment1',
              label: 'Appointment:\n Discussion on the results\n' + '15.02.2015',
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
              label: 'Rheumatologists\n' + '31.05.2017',
              group: 'GroupCarer'
            });
            this.visNetworkData.nodes.add({
              id: 'appointment1',
              label: 'Appointment:\n Discussion on the results\n' + '31.05.2017',
              group: 'Appointment'
            });
            this.visNetworkData.edges.add({from: 'appointment1', to: 'rheumatologist1', id: 'rhe01'});
            this.visNetworkData.nodes.add({
              id: 'medicationPlan1',
              label: 'Meedication plan\n' + '27.02.2017',
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
              label: 'Image\n' + '12.10.2016',
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
            this.coreDisplayed = false
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
            this.coreDisplayed = false
            this.displayLast();
          }
          //DC Navi towards CM (from HM)

          else if (
            eventData[1].nodes == "weightHistory"
          ) {

            this.router.navigate(['/clinician-manager/observations/weight/lastyear'])

          }


          else if (
            eventData[1].nodes == "questionnaireFFbhHAQHome" || eventData[1].nodes == "questionnaireFFbhHAQClinic"
          ) {

            this.router.navigate(['/clinician-manager/observations/ffbh/lastyear'])

          }

          else if (
            eventData[1].nodes == "questionnaireRADAIClinic"
          ) {

            this.router.navigate(['/clinician-manager/observations/radai/lastyear'])

          }

          else if (
            eventData[1].nodes == "questionnaireMoriskyClinic"
          ) {

            this.router.navigate(['/clinician-manager/observations/morisky/lastyear'])

          }

          else if (
            eventData[1].nodes == "wellBeing"
          ) {
            this.router.navigate(['/clinician-manager/observations/wellbeing/lastyear'])


          }

          else if (
            eventData[1].nodes == "painRating"
          ) {
            this.router.navigate(['/clinician-manager/observations/pain/lastyear'])


          }


          else if (eventData[1].nodes == "sugarHistory"
            || eventData[1].nodes == "saturationHistory"
            || eventData[1].nodes == "lungHistory"
            || eventData[1].nodes == "respirationHistory"
            || eventData[1].nodes == "weightHistory"
            || eventData[1].nodes == "homeHeart"
            || eventData[1].nodes == "homeActivity"
            || eventData[1].nodes == "questionnaireHome"
          ) {
            //
            //
            this.router.navigate(['/clinician-manager/treatments/all/lastyear'])
          }
          //DC Navi towards CM
          else if (eventData[1].nodes == "questionnaireFFbhHAQHome"
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

      this.picasoDataService.getPatientInfo(this.progress, "11892829").subscribe(
        patientInfo => {
          this.picasoDataService.getObservationsPerPatient(this.progress, "11892829").subscribe(
            observations => {
              this.drbDataService.getGraphSetUp().subscribe(
                graphSetUp => {
                  this.subGraphsAsArray = graphSetUp;
                  this.drbDataService.getGraphNodes(this.progress).subscribe(
                    node => {
                      this.nodesAsArray = node;
                      //console.log("Picaso name: ", patientInfo)
                      let index = this.nodesAsArray.findIndex(item => item.id === "patient")
                      this.nodesAsArray[index].label = patientInfo.toString()

                      //TODO napojenie: id uzla - id observacie
                      console.log('observaTIONS : ', observations/*.Measurements[0].TypeId*/)
                      this.mapDataToGraph(observations)
                      this.observations = observations
                      //  console.log("result from service 1:", this.nodesAsArray)
                      // this.mapSourceDataToNetworkData()
                      this.readLastDispalyedGraphSetUp()
                      this.displayLast();
                    },
                    error => this.errorMessage = <any>error);
                },
                error => this.errorMessage = <any>error);
            },
            error => this.errorMessage = <any>error);
        },
      )
        //console.log(this.errorMessage);

    }

  private mapDataToGraph(observations: DataForNodes[]): void {
    for(var i = 0; i < observations.length; i++){
      //console.log("pieces: ", resJson[i].TypeId,' ',resJson[i].Timestamp, ' ',resJson[i] )
      let index = this.nodesAsArray.findIndex(item => item.id ===  observations[i].id)
      this.nodesAsArray[index].label = this.nodesAsArray[index].label + '\n' + observations[i].date
      this.nodesAsArray[index].isDisplayed = true


    }

  }
  private fillTableBelowDRB(nodeId: string, isLeafNode: boolean): void {

    this.tableData = []
    if(isLeafNode){
      this.animationToggle = !this.animationToggle;
      let observForNode = this.observations.find(item => item.id === nodeId)
      if(observForNode) {
        this.tableData = observForNode.content
      }
    }
    //TODO in picaso service add substructure with data details as in the table
    // subscribe observations to local structure here
    // clear and then fill here table based on local scructure with relevant ID (nodeID = ID in observation structure)
    // if node is not leaf clear table but not fill it with content
  }

// MAIN routine
    public ngOnInit() {
        this.getGraphNetworkData()
        // this.mapSourceDataToNetworkData()
        // this.readLastDispalyedGraphSetUp()
        // this.displayLast();




        this.setNetworkOptions();


      //TODO
      // this.tableData = [{
      //   name: "Systolic",
      //   date: new Date(),
      //   source: "source1",
      //   link: "/clinician-manager/observations/sys"
      // }, {name: "Diastolic", date: new Date(), source: "source2", link: "/clinician-manager/observations/dia"}];
    }

// Destroy
    public ngOnDestroy(): void {
        //localStorage.clear();
        this.visNetworkService.off(this.visNetwork, 'click');
    }
}
