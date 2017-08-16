import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PatientData} from '../model/patient-data';
import {Observable} from 'rxjs/Observable';
import {PatientObservationGroup} from "../model/patient-observation-group";
import {PatientClinician} from "../model/patient-clinician";
import {ProgressHttp} from "angular-progress-http";
import {PatientNotification} from "../model/patient-notification";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {CdSharedModelService} from "../../../picaso-cd-common/_services/cd-shared-model.service";
import {PatientConcludingComments} from "../model/patient-concluding-comments";
import {PatientFollowUpAppointment} from "../model/patient-follow-up-appointment";
import {PatientImaging} from "../model/patient-imaging";
import {PatientLabTest} from "../model/patient-lab-test";
import {PatientOutClinicTreatment} from "../model/patient-out-clinic-treatment";
import {PatientInClinicTreatment} from "../model/patient-in-clinic-treatment";
import {PatientMedicationIntake} from "../model/patient-medication-intake";
import {PatientMedicationPrescription} from "../model/patient-medication-prescription";
import {PatientDisease} from "../model/patient-disease";


@Injectable()
export class PicasoDataService {

  private patientODSServiceURL = 'assets/fakeODS/db_new.json';
  private patientODSServiceURLRemote = 'http://212.214.80.143:32772/api/v1/patient/11892829/anycall?startDate=2016-01-01T00%3A00%3A00&endDate=2017-11-20T23%3A59%3A59';
  private patientListServiceURL = "http://212.214.80.143:32772/api/v1/patient/all";
  private tokenServiceURL = "http://212.214.80.143:32772/api/v1/authentication/login";

  //11892829


  //private patientDataServiceURL = 'http://147.232.202.101:9004/info';  // URL to web api
  //private observationsDataServiceURL = 'http://147.232.202.101:9004/observations';  // URL to web api
  //private patientMedicationDataServiceURL = 'http://147.232.202.101:9004/medications';
  //private patientCliniciansServiceURL = 'http://147.232.202.101:9004/clinicians';
  //private patientDiseasesServiceURL = 'http://147.232.202.101:9004/diseases';
  //private patientChecksDataServiceURL = 'http://147.232.202.101:9004/treatments';
  //private patientMoriskyDataServiceURL = 'http://147.232.202.101:9004/morisky';
  //private patientFFbHDataServiceURL = 'http://147.232.202.101:9004/ffbh';
  //private patientRADAIServiceURL = 'http://147.232.202.101:9004/radai';
  //private patientImagingServiceURL = 'http://147.232.202.101:9004/imaging';

  constructor(private http: ProgressHttp, private cdSharedModelService: CdSharedModelService) {
  }



  getNotifications(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientNotification[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Progress ${progress.percentage}%`);
      //console.log(`Loading ${progress.loaded} bytes`);
      //console.log(`Total ${progress.total} bytes`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;

    })
      .get(this.patientODSServiceURL)
      .map(response => {
          //console.log("getting notifications for patient", this.cdSharedModelService.get().patient.display);
          return this.extractDataNotifications(response);
        }
      )
      .catch(this.handleError)
      ;
  }


  getDiseases(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientDisease[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Progress ${progress.percentage}%`);
      //console.log(`Loading ${progress.loaded} bytes`);
      //console.log(`Total ${progress.total} bytes`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataDiseases)
      .catch(this.handleError)
      ;
  }


  getClinicians(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientClinician[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURLRemote)
      .map(this.extractDataClinicians)
      .catch(this.handleError)
      ;
  }

  getConcludingComments(startDate: Date, endDate: Date, clinicianId: string, progressResult: PatientLoadProgress): Observable<PatientConcludingComments[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractConcludingComments)
      .catch(this.handleError)
      ;
  }


  getFollowUps(startDate: Date, endDate: Date, clinicianId: string, progressResult: PatientLoadProgress): Observable<PatientFollowUpAppointment[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractFollowUps)
      .catch(this.handleError)
      ;
  }

  getObservations(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientObservationGroup[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURLRemote)
      .map(this.extractDataObservations)
      .catch(this.handleError)
      ;
  }

  getMorisky(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientObservationGroup[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataMorisky)
      .catch(this.handleError)
      ;
  }


  getMedicationIntakeHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientMedicationIntake[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataMedicationIntake)
      .catch(this.handleError)
      ;
  }

  getMedicationPrescriptionHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientMedicationPrescription[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataMedicationPrescription)
      .catch(this.handleError)
      ;
  }

  getInClinicTreatmentsResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientInClinicTreatment[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractInClinicTreatmentsResult)
      .catch(this.handleError)
      ;
  }

  getOutClinicTreatmentsResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientOutClinicTreatment[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractOutClinicTreatmentsResult)
      .catch(this.handleError)
      ;
  }

  getImagingResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientImaging[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractImagingResult)
      .catch(this.handleError)
      ;
  }

  getLabtestResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientLabTest[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractLabtestResult)
      .catch(this.handleError)
      ;
  }


  getPatient(progressResult: PatientLoadProgress): Observable<PatientData> {

    return this.http.withDownloadProgressListener(progress => {

      //TODO to be deleted later - fake progress
      setTimeout(() => {
        progressResult.percentage = 0;
      }, 300);
      setTimeout(() => {
        progressResult.percentage = 25
      }, 600);
      setTimeout(() => {
        progressResult.percentage = 50
      }, 900);
      setTimeout(() => {
        progressResult.percentage = 75
      }, 1200);
      setTimeout(() => {
        progressResult.percentage = 100
      }, 1500);

      setTimeout(() => {
        progressResult.total = progress.total
      }, 1800);


      // TODO to be uncommented later - real progress
      // progressResult.percentage = progress.percentage;
      // progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURLRemote)
      .map(response => {
        return this.extractDataInfo(response, this.cdSharedModelService.get().patient.display);
      })
      .catch(this.handleError)
      ;
  }

  //private  extractData(res: Response) {
  //    return res.json();
  //}

  private extractDataInfo(res: Response, name: string) {

    var result: PatientData = res.json().infoResult;

    //result.name = name;

    return result;

  }


  private extractDataMorisky(res: Response) {
    let result = res.json();
    return [result.moriskyResult]
  }

  private extractConcludingComments(res: Response) {
    return res.json().concludingCommentsResult;
  }

  private extractFollowUps(res: Response) {
    return res.json().followUpsResult;
  }

  private extractDataObservations(res: Response) {
    let result = res.json();
    let resultList = [];
    if (result.heartRateResult !== null) {
      resultList.push(result.heartRateResult)
    }
    if (result.systolicResult !== null) {
      resultList.push(result.systolicResult)
    }
    if (result.diastolicResult !== null) {
      resultList.push(result.diastolicResult)
    }
    if (result.weightResult !== null) {
      resultList.push(result.weightResult)
    }
    if (result.stepsResult !== null) {
      resultList.push(result.stepsResult)
    }
    if (result.distanceResult !== null) {
      resultList.push(result.distanceResult)
    }
    if (result.sleepResult !== null) {
      resultList.push(result.sleepResult)
    }
    if (result.painResult !== null) {
      resultList.push(result.painResult)
    }
    if (result.radaiResult !== null) {
      resultList.push(result.radaiResult)
    }
    if (result.ffbhResult !== null) {
      resultList.push(result.ffbhResult)
    }
    if (result.haqResult !== null) {
      resultList.push(result.haqResult)
    }
    if (result.eq5dResult !== null) {
      resultList.push(result.eq5dResult)
    }
    return resultList;
  }

  private extractDataMedicationPrescription(res: Response) {
    return res.json().medicationPrescriptionsResult;
  }

  private extractDataMedicationIntake(res: Response) {
    return res.json().medicationIntakesResult;
  }

  private extractDataClinicians(res: Response) {
    return res.json().cliniciansResult;
  }

  private extractInClinicTreatmentsResult(res: Response) {
    return res.json().inClinicTreatmentsResult;

  }

  private extractOutClinicTreatmentsResult(res: Response) {
    return res.json().outClinicTreatmentsResult;

  }

  private extractImagingResult(res: Response) {
    return res.json().imagingResult;

  }

  private extractLabtestResult(res: Response) {
    return res.json().labtestResult;

  }






  private extractDataDiseases(res: Response) {
    return res.json().diseasesResult;
  }

  private extractDataNotifications(res: Response) {
    return res.json().notificationsResult;
  }


  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  getPatients(progressResult: PatientLoadProgress): Observable<string[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Progress ${progress.percentage}%`);
      //console.log(`Loading ${progress.loaded} bytes`);
      //console.log(`Total ${progress.total} bytes`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;

    }).get(this.patientListServiceURL)
      .map(response => {
        return this.extractPatientList(response);
      })
      .catch(this.handleError)
      ;
  }

  private extractPatientList(res: Response) {

    //console.log("listcallresult", result);
    var result = res.json();


    var returnValue = result.usernames;

    return returnValue
  }

  getToken(user: string, pass: string, progressResult: PatientLoadProgress): Observable<string> {

    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Progress ${progress.percentage}%`);
      //console.log(`Loading ${progress.loaded} bytes`);
      //console.log(`Total ${progress.total} bytes`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;

    })
      .get(this.tokenServiceURL, {body: {UserNAme: user, Password: pass}})
      .map(response => {
        return this.extracTokenInfo(response);
      })
      .catch(this.handleError)
      ;
  }

  private extracTokenInfo(res: Response) {
    return res.json().Message;
  }

}




