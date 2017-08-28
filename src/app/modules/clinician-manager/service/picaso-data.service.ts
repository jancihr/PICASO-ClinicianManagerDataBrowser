import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {ProgressHttp} from "angular-progress-http";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {CdSharedModelService} from "../../../picaso-cd-common/_services/cd-shared-model.service";

import {
  CareProfessionalVisit,
  CliniciansResult, ConcludingCommentsResult, DiseasesResult, FollowUpsResult, FunctionalDiagnosticsResult,
  ImagingResult, InfoResult,
  LabTestResult, MedicationIntakesResult,
  MedicationPrescriptionsResult,
  ObservationResult,
  ODSResult, PatientReportedOutcomesResult, PsychologicalNeurologicalTestsPerformed, QuestionaryFilled
} from "../model/generated-interfaces";


@Injectable()
export class PicasoDataService {

  private patientODSServiceURL = 'assets/fakeODS/cm_db_new.ods.json';
  //private patientODSServiceURL = 'assets/fakeODS/cm_db_from_ods.ods.json';

  private patientODSServiceURLRemote = 'http://212.214.80.143:32772/api/v1/patient/11892829/anycall?startDate=2016-01-01T00%3A00%3A00&endDate=2017-11-20T23%3A59%3A59';
  private patientListServiceURL = "http://212.214.80.143:32772/api/v1/patient/all";
  private tokenServiceURL = "http://212.214.80.143:32772/api/v1/authentication/login";

  private fullJson: ODSResult = null;

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


  getDiseases(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<DiseasesResult[]> {
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

  private extractDataDiseases(res: Response) {
    return res.json().diseasesResult;
  }


  getClinicians(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<CliniciansResult[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataClinicians)
      .catch(this.handleError)
      ;
  }

  private extractDataClinicians(res: Response) {
    return res.json().cliniciansResult;
  }

  getConcludingComments(startDate: Date, endDate: Date, clinicianId: string, progressResult: PatientLoadProgress): Observable<ConcludingCommentsResult[]> {


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

  private extractConcludingComments(res: Response) {
    return res.json().concludingCommentsResult;
  }


  getFollowUps(startDate: Date, endDate: Date, clinicianId: string, progressResult: PatientLoadProgress): Observable<FollowUpsResult[]> {


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

  private extractFollowUps(res: Response) {
    return res.json().followUpsResult;
  }

  getObservations(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<ObservationResult[]> {


    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataObservations)
      .catch(this.handleError)
      ;
  }

  private extractDataObservations(res: Response) {
    return res.json().observationResult;
  }


  getMedicationIntakeHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<MedicationIntakesResult[]> {
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

  private extractDataMedicationIntake(res: Response) {
    return res.json().medicationIntakesResult;
  }

  getMedicationPrescriptionHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<MedicationPrescriptionsResult[]> {
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

  private extractDataMedicationPrescription(res: Response) {
    return res.json().medicationPrescriptionsResult;
  }

  getProfessionalVisits(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<CareProfessionalVisit[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractProfessionalVisits)
      .catch(this.handleError)
      ;
  }

  private extractProfessionalVisits(res: Response) {
    return res.json().careProfessionalVisit;
  }

  getLabTestResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<LabTestResult[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractLabTestResult)
      .catch(this.handleError)
      ;
  }

  private extractLabTestResult(res: Response) {
    return res.json().labTestResult;
  }

  getImagingResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<ImagingResult[]> {
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

  private extractImagingResult(res: Response) {
    return res.json().imagingResult;
  }

  getPsychologicalNeurologicalTestsPerformedResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PsychologicalNeurologicalTestsPerformed[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractPsychologicalNeurologicalTestsPerformed)
      .catch(this.handleError)
      ;
  }

  private extractPsychologicalNeurologicalTestsPerformed(res: Response) {
    return res.json().psychologicalNeurologicalTestsPerformed;
  }


  getFunctionalDiagnosticsResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<FunctionalDiagnosticsResult[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractFunctionalDiagnosticsResult)
      .catch(this.handleError)
      ;
  }

  private extractFunctionalDiagnosticsResult(res: Response) {
    return res.json().functionalDiagnosticsResult;
  }

  getPatientReportedOutcomesResultResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientReportedOutcomesResult[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractPatientReportedOutcomesResult)
      .catch(this.handleError)
      ;
  }

  private extractPatientReportedOutcomesResult(res: Response) {
    return res.json().patientReportedOutcomesResult;
  }

  getQuestionaryFilledResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<QuestionaryFilled[]> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Loading ${progress.percentage}%`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractQuestionaryFilled)
      .catch(this.handleError)
      ;
  }

  private extractQuestionaryFilled(res: Response) {

    return res.json().questionaryFilled;

  }


  getPatient(progressResult: PatientLoadProgress): Observable<InfoResult> {

    return this.http.withDownloadProgressListener(progress => {
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.patientODSServiceURL)
      .map(this.extractDataInfo)
      .catch(this.handleError)
      ;
  }

  private extractDataInfo(res: Response) {
    return res.json().infoResult;
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




