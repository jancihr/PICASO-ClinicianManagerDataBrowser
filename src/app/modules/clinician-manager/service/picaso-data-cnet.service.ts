import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PatientData} from '../model/patient-data';
import {Observable} from 'rxjs/Observable';
import {ProgressHttp} from "angular-progress-http";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {CdSharedModelService} from "../../../picaso-cd-common/_services/cd-shared-model.service";


@Injectable()
export class PicasoDataService {

  private patientOverviewServiceURL = 'http://212.214.80.143:32772/api/v1/patient/';  // URL to web api
  private tokenServiceURL = "http://212.214.80.143:32772/api/v1/authentication/login";
  private patientListServiceURL = "http://212.214.80.143:32772/api/v1/patient/all";

  constructor(private http: ProgressHttp, private cdSharedModelService: CdSharedModelService) {
  }

  getPatient(patient: string, progressResult: PatientLoadProgress): Observable<PatientData> {
    return this.http.withDownloadProgressListener(progress => {
      //console.log(`Progress ${progress.percentage}%`);
      //console.log(`Loading ${progress.loaded} bytes`);
      //console.log(`Total ${progress.total} bytes`);
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;

    })
      .get(this.patientOverviewServiceURL + patient)
      .map(response => {
        return this.extractDataInfo(response, this.cdSharedModelService.get().patient.display);
      })
      .catch(this.handleError)
      ;
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

    console.log("listcallresult", result);
    var result = res.json();


    var returnValue = result.usernames;

    return returnValue
  }

  private extractDataInfo(res: Response, name: string) {

    var result = res.json();
    var patient = new PatientData();
    patient.name = result.Person.FirstName + " " + result.Person.LastName
    patient.dob = result.Patient.DateOfBirth;
    patient.height = result.Patient.Height;
    patient.address1 = result.Person.Address;
    patient.gender = result.Patient.Gender;
    patient.bloodType = "AB Negative";
    patient.livesAlone = false;
    patient.occupancy = "";
    patient.insurer = "";
    patient.insurerId = "";
    patient.id = result.UserAccountId;
    return patient;
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


}




