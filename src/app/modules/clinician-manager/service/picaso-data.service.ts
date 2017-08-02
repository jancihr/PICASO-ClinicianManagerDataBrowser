import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PatientData} from '../model/patient-data';
import {PatientMoriskyResult} from '../model/patient-morisky-result';
import {Observable}     from 'rxjs/Observable';
import {PatientObservationGroup} from "../model/patient-observation-group";
import {PatientMedication} from "../model/patient-medication";
import {PatientDisease} from "../model/patient-disease";
import {PatientClinician} from "../model/patient-clinician";
import {PatientTreatment} from "../model/patient-treatment";
import {PatientFFbHResult} from "../model/patient-ffbh-result";
import {PatientRADAIResult} from "../model/patient-RADAI-result";
import {PatientImage} from "../model/patient-image";
import {ProgressHttp} from "angular-progress-http";
import {PatientNotification} from "../model/patient-notification";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {CdSharedModelService} from "../../../picaso-cd-common/_services/cd-shared-model.service";
import {PatientConcludingComments} from "../model/patient-concluding-comments";


@Injectable()
export class PicasoDataService {

    private patientODSServiceURL = 'assets/fakeODS/db.json';

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

    getImaging(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientImage[]> {
        return this.http.withDownloadProgressListener(progress => {
          //console.log(`Loading ${progress.percentage}%`);
            progressResult.percentage = progress.percentage;
            progressResult.total = progress.total;
            progressResult.loaded = progress.loaded;
        })
            .get(this.patientODSServiceURL)
            .map(this.extractDataImaging)
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
            .get(this.patientODSServiceURL)
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


    getObservations(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientObservationGroup[]> {


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


    getMedicationHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientMedication[]> {
        return this.http.withDownloadProgressListener(progress => {
          //console.log(`Loading ${progress.percentage}%`);
            progressResult.percentage = progress.percentage;
            progressResult.total = progress.total;
            progressResult.loaded = progress.loaded;
        })
            .get(this.patientODSServiceURL)
            .map(this.extractDataMedications)
            .catch(this.handleError)
            ;
    }

  getTreatmentsHistory(startDate: Date, endDate: Date, progressResult: PatientLoadProgress): Observable<PatientTreatment[]> {

        return this.http.withDownloadProgressListener(progress => {
          //console.log(`Loading ${progress.percentage}%`);
            progressResult.percentage = progress.percentage;
            progressResult.total = progress.total;
            progressResult.loaded = progress.loaded;
        })
            .get(this.patientODSServiceURL)
            .map(this.extractDataChecks)
            .catch(this.handleError)
            ;
    }


    getPatient(progressResult: PatientLoadProgress): Observable<PatientData> {

        return this.http.withDownloadProgressListener(progress => {

            //TODO to be deleted later - fake progress
            setTimeout(() => {
                progressResult.percentage = 0;
            }, 100);
            setTimeout(() => {
                progressResult.percentage = 25
            }, 200);
            setTimeout(() => {
                progressResult.percentage = 50
            }, 300);
            setTimeout(() => {
                progressResult.percentage = 75
            }, 400);
            setTimeout(() => {
                progressResult.percentage = 100
            }, 500);

            setTimeout(() => {
                progressResult.total = progress.total
            }, 600);


            // TODO to be uncommented later - real progress
            // progressResult.percentage = progress.percentage;
            // progressResult.total = progress.total;
            progressResult.loaded = progress.loaded;
        })
            .get(this.patientODSServiceURL)
            .map(response => {
                return this.extractDataInfo(response, this.cdSharedModelService.get().patient.display);
            })
            .catch(this.handleError)
            ;
    }

    //private  extractData(res: Response) {
    //    return res.json();
    //}

    private  extractDataInfo(res: Response, name: string) {

        var result: PatientData = res.json().info;

        result.name = name;

        return result;

    }



    private  extractDataMorisky(res: Response) {
        return res.json().morisky;
    }

  private extractConcludingComments(res: Response) {
    return res.json().concludingComments;
  }



    private  extractDataObservations(res: Response) {
        return res.json().observations;
    }

    private  extractDataMedications(res: Response) {
        return res.json().medications;
    }

    private  extractDataClinicians(res: Response) {
        return res.json().clinicians;
    }

    private  extractDataChecks(res: Response) {
      return res.json().treatments;
    }

    private  extractDataDiseases(res: Response) {
        return res.json().diseases;
    }

    private  extractDataNotifications(res: Response) {
        return res.json().notifications;
    }

    private  extractDataImaging(res: Response) {
        return res.json().imaging;
    }


    private  handleError(error: Response | any) {
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




