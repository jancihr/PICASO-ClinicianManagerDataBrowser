import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {PatientData} from '../model/patient-data';
import {Observable} from 'rxjs/Observable';
import {ProgressHttp} from "angular-progress-http";

import {CdSharedModelService} from
  "../../../picaso-cd-common/_services/cd-shared-model.service";
import {PatientLoadProgress} from "../../clinician-manager/model/patient-loadprogress";
import {DataForNodes} from "../model/data-for-nodes";
import {TableItem} from "../model/table-item";


@Injectable()
export class PicasoDataService {
  //public resNodesData: DataForNodes[];

  private PicasoDataServiceURL =
    'http://212.214.80.143:32772/';  // URL to web api
  constructor(private http: ProgressHttp) {
  }

  getPatientInfo(progressResult: PatientLoadProgress, patientId: string): Observable<String> {
    return this.http.withDownloadProgressListener(progress => {
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.PicasoDataServiceURL + 'api/v1/patient/' + patientId)
      .map(response => {
        return this.extractPatientInfo(response);
      })
      .catch(this.handleError)
      ;
  }

  private extractPatientInfo(res: Response) {

    var result = res.json().Person.FirstName + ' ' + res.json().Person.LastName + '\n' + res.json().Patient.PatientId;
    //console.log("extract data:  ", result)
    return result;
  }
  getObservationsPerPatient(progressResult: PatientLoadProgress, patientId: string): Observable<DataForNodes[]> {
    return this.http.withDownloadProgressListener(progress => {
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.PicasoDataServiceURL + 'api/v1/patient/' + patientId + '/overview') //?take=n
      .map(response => {
        return this.extractObservationInfo(response);
      })
      .catch(this.handleError)
      ;
  }

  private extractObservationInfo(res: Response) {

    var resJson = res.json();
    var resNodesData: DataForNodes[]
    resNodesData = []
    console.log("extract data - observation: ", resJson.length, ' ', resJson)
    var length = resJson.length
    for(var i = 0; i < length; i++){
      //console.log("pieces: ", resJson[i].TypeId,' ',resJson[i].Timestamp, ' ',resJson[i] )
      console.log("pieces: ", resJson )
      let tableItems: TableItem[]
      tableItems = []
      let measurements = resJson[i].measurements
      for(var j = 0; j < measurements.length; j++){
        tableItems.push({
          name: measurements[j].TypeId,
          date: resJson[i].Timestamp,
          source: "ODS 1",
          link:"/clinician-manager/observations/" + measurements[j].TypeId.toString()
        })

      }

      resNodesData.push({
        id: resJson[i].TypeId ,
        date: resJson[i].Timestamp ,
        content: tableItems

      });

    }
    //var result = resNodesData

    return resNodesData;
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
