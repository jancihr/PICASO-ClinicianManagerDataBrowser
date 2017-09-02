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
export class PicasoOdsCmDataService {

  private patientODSServiceURL = 'assets/fakeODS/cm_db_new.ods.json';
  //private patientODSServiceURL = 'http://212.214.80.143:32772/api/v1/patient/11892829/anycall?startDate=2015-01-01T00%3A00%3A00&endDate=2017-12-31T23%3A59%3A59';

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

  constructor(private http: ProgressHttp) {
    //console.log("service constructor");
  }

  ngOnInit() {
    //console.log("service ngoninit");
  }


  getPatientResult(progressResult: PatientLoadProgress): Observable<InfoResult> {


    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).infoResult);
    } else
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


    console.log("storing json:", res.json());
    sessionStorage.setItem("temporaryCmServiceResult", JSON.stringify(res.json()));
    //console.log("after service getPatientResult");

    return res.json().infoResult;
  }

  getObservations(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<ObservationResult[]> {


    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).observationResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
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

  getDiseases(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<DiseasesResult[]> {


    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).diseasesResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Progress ${progress.percentage}%`);
        ////console.log(`Loading ${progress.loaded} bytes`);
        ////console.log(`Total ${progress.total} bytes`);
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


    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).cliniciansResult);
    } else
      return this.http.withDownloadProgressListener(progress => {

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

    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).concludingCommentsResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getConcludingComments");

    return res.json().concludingCommentsResult;
  }


  getFollowUps(startDate: Date, endDate: Date, clinicianId: string, progressResult: PatientLoadProgress): Observable<FollowUpsResult[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).followUpsResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getFollowUps");

    return res.json().followUpsResult;
  }




  getMedicationIntakeHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<MedicationIntakesResult[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).medicationIntakesResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getMedicationIntakeHistory");

    return res.json().medicationIntakesResult;
  }

  getMedicationPrescriptionHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<MedicationPrescriptionsResult[]> {

    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).medicationPrescriptionsResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getMedicationPrescriptionHistory");

    return res.json().medicationPrescriptionsResult;
  }

  getProfessionalVisits(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<CareProfessionalVisit[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).careProfessionalVisit);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getProfessionalVisits");

    return res.json().careProfessionalVisit;
  }

  getLabTestResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<LabTestResult[]> {

    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).labTestResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getLabTestResults");

    return res.json().labTestResult;
  }

  getImagingResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<ImagingResult[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).imagingResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getImagingResults");

    return res.json().imagingResult;
  }

  getPsychologicalNeurologicalTestsPerformedResults(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PsychologicalNeurologicalTestsPerformed[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");

    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).psychologicalNeurologicalTestsPerformed);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getPsychologicalNeurologicalTestsPerformedResults");

    return res.json().psychologicalNeurologicalTestsPerformed;
  }


  getFunctionalDiagnosticsResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<FunctionalDiagnosticsResult[]> {

    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).functionalDiagnosticsResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getFunctionalDiagnosticsResult");

    return res.json().functionalDiagnosticsResult;
  }

  getPatientReportedOutcomesResultResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientReportedOutcomesResult[]> {
    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).patientReportedOutcomesResult);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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

    //console.log("after service getPatientReportedOutcomesResultResult");

    return res.json().patientReportedOutcomesResult;
  }

  getQuestionaryFilledResult(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<QuestionaryFilled[]> {

    let tempStored = sessionStorage.getItem("temporaryCmServiceResult");


    if (tempStored && tempStored !== null) {
      progressResult.percentage = 100;
      progressResult.total = 0;
      progressResult.loaded = 0;
      return Observable.of((JSON.parse(tempStored)).questionaryFilled);
    } else
      return this.http.withDownloadProgressListener(progress => {
        ////console.log(`Loading ${progress.percentage}%`);
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


    //console.log("after service getQuestionaryFilledResult");

    return res.json().questionaryFilled;

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
      ////console.log(`Progress ${progress.percentage}%`);
      ////console.log(`Loading ${progress.loaded} bytes`);
      ////console.log(`Total ${progress.total} bytes`);
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

    ////console.log("listcallresult", result);
    var result = res.json();


    var returnValue = result.usernames;

    return returnValue
  }

  getToken(user: string, pass: string, progressResult: PatientLoadProgress): Observable<string> {

    return this.http.withDownloadProgressListener(progress => {
      ////console.log(`Progress ${progress.percentage}%`);
      ////console.log(`Loading ${progress.loaded} bytes`);
      ////console.log(`Total ${progress.total} bytes`);
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




