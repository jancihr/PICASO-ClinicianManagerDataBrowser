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
import {PatientMoriskyResultsComponent} from "../cards/patient-morisky-results.component";
import {PatientFFbHResult} from "../model/patient-ffbh-result";
import {PatientRADAIResult} from "../model/patient-RADAI-result";
import {PatientImage} from "../model/patient-image";

@Injectable()
export class PicasoDataService {

    private patientDataServiceURL = 'http://localhost:3000/info';  // URL to web api
    private observationsDataServiceURL = 'http://localhost:3000/observations';  // URL to web api
    private patientMedicationDataServiceURL = 'http://localhost:3000/medications';
    private patientCliniciansServiceURL = 'http://localhost:3000/clinicians';
    private patientDiseasesServiceURL = 'http://localhost:3000/diseases';
    private patientChecksDataServiceURL = 'http://localhost:3000/checks';
    private patientMoriskyDataServiceURL = 'http://localhost:3000/morisky';
    private patientFFbHDataServiceURL = 'http://localhost:3000/ffbh';
    private patientRADAIServiceURL = 'http://localhost:3000/radai';
    private patientImagingServiceURL = 'http://localhost:3000/imaging';

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

    private extractData(res: Response) {

        return res.json();
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




