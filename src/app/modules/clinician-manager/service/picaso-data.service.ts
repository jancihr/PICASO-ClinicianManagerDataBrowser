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
import {PatientCheck} from "../model/patient-check";
import {PatientFFbHResult} from "../model/patient-ffbh-result";
import {PatientRADAIResult} from "../model/patient-RADAI-result";
import {PatientImage} from "../model/patient-image";


@Injectable()
export class PicasoDataService {

    private patientDataServiceURL = 'http://147.232.202.101:9004/info';  // URL to web api
    private observationsDataServiceURL = 'http://147.232.202.101:9004/observations';  // URL to web api
    private patientMedicationDataServiceURL = 'http://147.232.202.101:9004/medications';
    private patientCliniciansServiceURL = 'http://147.232.202.101:9004/clinicians';
    private patientDiseasesServiceURL = 'http://147.232.202.101:9004/diseases';
    private patientChecksDataServiceURL = 'http://147.232.202.101:9004/checks';
    private patientMoriskyDataServiceURL = 'http://147.232.202.101:9004/morisky';
    private patientFFbHDataServiceURL = 'http://147.232.202.101:9004/ffbh';
    private patientRADAIServiceURL = 'http://147.232.202.101:9004/radai';
    private patientImagingServiceURL = 'http://147.232.202.101:9004/imaging';

    constructor(private http: Http) {
    }


    getDiseases(): Observable<PatientDisease[]> {
        return this.http.get(this.patientDiseasesServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getImaging(): Observable<PatientImage[]> {
        return this.http.get(this.patientImagingServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getClinicians(): Observable<PatientClinician[]> {


        return this.http.get(this.patientCliniciansServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getMoriskyResults(startDate: Date, endDate: Date): Observable<PatientMoriskyResult[]> {
        return this.http.get(this.patientMoriskyDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getFFbHResults(startDate: Date, endDate: Date): Observable<PatientFFbHResult[]> {
        return this.http.get(this.patientFFbHDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getRADAIResults(startDate: Date, endDate): Observable<PatientRADAIResult[]>{
        return this.http.get(this.patientRADAIServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getObservations(startDate: Date, endDate: Date): Observable<PatientObservationGroup[]> {


        return this.http.get(this.observationsDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }


    getMedicationHistory(startDate: Date, endDate: Date): Observable<PatientMedication[]> {
        return this.http.get(this.patientMedicationDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    getCheckHistory(startDate: Date, endDate: Date): Observable<PatientCheck[]> {

        return this.http.get(this.patientChecksDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }


    getPatient(): Observable<PatientData> {

        return this.http.get(this.patientDataServiceURL)
            .map(this.extractData)
            .catch(this.handleError)
            ;
    }

    private  extractData(res: Response) {


        return res.json();
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




