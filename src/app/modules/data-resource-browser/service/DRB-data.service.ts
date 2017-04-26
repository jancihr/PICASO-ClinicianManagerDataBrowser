import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable}     from 'rxjs/Observable';
import {ProgressHttp} from "angular-progress-http";
import {GraphNodesDefinition} from '../model/graph-nodes-definition';
import {GraphSetUp} from '../model/graph-set-up';
import {LoadProgress} from "../model/load-progress";
//import {PatientMoriskyResultsComponent} from "../cards/patient-morisky-results.component";


@Injectable()
export class DRBDataService {

    private graphServiceURL = 'assets/fakeODS/graphDef.json';
    constructor(private http: ProgressHttp) {
    }

    getGraphSetUp(): Observable<GraphSetUp[]> {
        return this.http.withDownloadProgressListener(
            progress => {console.log(`Loading ${progress.percentage}%`);}
        )
            .get(this.graphServiceURL)
            .map(this.extractGraphSetUp)
            .catch(this.handleError)

    }
    getGraphNodes(inProgress: LoadProgress): Observable<GraphNodesDefinition[]> {
        return this.http.withDownloadProgressListener(
            progress => {console.log(`Loading ${progress.percentage}%`);
            inProgress.percentage = progress.percentage;
            inProgress.total = progress.total;
            inProgress.loaded = progress.loaded;}
        )
            .get(this.graphServiceURL)
            .map(this.extractGraphNodes)
            .catch(this.handleError)

    }


    private  extractGraphSetUp(res: Response) {


        //console.log("cely json", res.json());
        //console.log("vykuchany json", res.json().GraphSetUp);
        return res.json().GraphSetUp;
    }

    private  extractGraphNodes(res: Response) {
        return res.json().GraphNodes;
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




