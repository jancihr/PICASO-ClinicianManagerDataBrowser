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
  private PicasoDataServiceURL = 'assets/fakeODS/graphHomeOds.json';
  private PicasoDataServiceURL1 = 'assets/fakeODS/graphPatientInfo.json';
  private PicasoDataServiceDRBlocalURL = 'assets/fakeODS/graphODStoDRB.json';
  private PicasoDataServiceDRBURL = 'http://212.214.80.143:32772/api/v1/patient/';
  // TODO private PicasoDataServiceURL = 'http://212.214.80.143:32772/';  // URL to web api
  constructor(private http: ProgressHttp) {
  }

  getPatientInfo(progressResult: PatientLoadProgress, patientId: string): Observable<String> {
    return this.http.withDownloadProgressListener(progress => {
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.PicasoDataServiceURL1 /*+ 'api/v1/patient/' + patientId*/)
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
      .get(this.PicasoDataServiceURL /*+ 'api/v1/patient/' + patientId + '/overview'*/) //?take=n
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
    //console.log("extract data - observation: ", resJson.length, ' ', resJson)
    var length = resJson.length
    for(var i = 0; i < length; i++){
      //console.log("pieces: ", resJson[i].TypeId,' ',resJson[i].Timestamp, ' ',resJson[i] )
      //console.log("pieces: ", resJson )
      let tableItems: TableItem[]
      tableItems = []
      let measurements = resJson[i].measurements
      for(var j = 0; j < measurements.length; j++){
        tableItems.push({
          name: measurements[j].TypeId,
          date: resJson[i].Timestamp,
          source: "ODS 1",
          clinicianId: "",
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
  getDRBDataPerPatient(progressResult: PatientLoadProgress, patientId: string): Observable<DataForNodes[]> {
    return this.http.withDownloadProgressListener(progress => {
      progressResult.percentage = progress.percentage;
      progressResult.total = progress.total;
      progressResult.loaded = progress.loaded;
    })
      .get(this.PicasoDataServiceDRBlocalURL /*PicasoDataServiceDRBURL  + patientId + '/forDRB?startDate=2017-08-01&endDate=2017-08-31'*/) //TODO
      .map(response => {
        return this.extractFromOrchestratorRes(response);
      })
      .catch(this.handleError)
      ;
  }

  private extractFromOrchestratorRes(res: Response) {

    var resJson = res.json();
    var resNodesData: DataForNodes[]
    var resNodesDataOneCat: DataForNodes[]
    resNodesData = []


    //console.log("DRB: ", ' ', resJson)
    //console.log("DRB home measur. :  ", ' ', resJson.resultForDRB.homeMeasurements, "length: ", resJson.resultForDRB.homeMeasurements.length)

    // **
    resNodesDataOneCat = []
    resNodesData = resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.homeMeasurements, 'observations');
    //resNodesData.concat(resNodesData,resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.homeMeasurements) );
    resNodesData.push({
      id: 'homeMeasurements',
      date: !(resNodesDataOneCat == null) ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("A: ",resNodesDataOneCat, 'added', resNodesData)

    // ** TODO ID harmonisation test data gener - questionnaire na pd a ra
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.carePlan, 'careplan');
    resNodesData = resNodesData.concat(resNodesDataOneCat);
    resNodesData.push({
      id: 'carePlan',
      date: (resNodesDataOneCat[0]) ? resNodesDataOneCat[0].date  : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("B: ",resNodesDataOneCat, resNodesData )

    // **
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.funcDiagnostics, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat);
    resNodesData.push({
      id: 'funcDiagnostics',
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });

    //console.log("C: ",resNodesDataOneCat, resNodesData  )

    // **
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.imaging, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat );
    resNodesData.push({
      id: 'imaging',
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("D: ",resNodesDataOneCat, resNodesData  )


    // **
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.labTest, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat );
    resNodesData.push({
      id: 'labTest', // TODO level 2+
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("E: ",resNodesDataOneCat, resNodesData  )
    // ** TODO level 2+
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.psychoTests, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat );
    resNodesData.push({
      id: 'psychoTests',
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("F: ",resNodesDataOneCat, resNodesData  )
    // ** TODO
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.questionnaires, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat);
    resNodesData.push({
      id: 'questionnaires',
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("G: ",resNodesDataOneCat, resNodesData  )

    // ** patReported
    resNodesDataOneCat = []
    resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.patReported, 'treatment')
    resNodesData = resNodesData.concat(resNodesDataOneCat );
    resNodesData.push({
      id: 'patReported',
      date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
      content: []
    });
    //console.log("H: ",resNodesDataOneCat, resNodesData  )




    resNodesDataOneCat = []
    // TODO clinicians
    // resNodesData.concat(resNodesData,resNodesDataOneCat = this.getNodeData(resJson.resultForDRB.careProfessionals) );
    // resNodesData.push({
    //   id: 'careProfessionals',
    //   date: resNodesDataOneCat[0] ? resNodesDataOneCat[0].date : "(no data)",//newestDateCoreNode,
    //   content: []
    // });
    // console.log("H: ",resNodesDataOneCat )



   //console.log('node data:', resNodesData)
    //var result = resNodesData

    return resNodesData;
  }

  private getNodeData(dataJson: any, linkMode: string) {
    var nodeDataOneCat: DataForNodes[]
    nodeDataOneCat = []

    let newestDateCoreNode
    newestDateCoreNode = "2000-08-31T00:00:00.000Z"
    //console.log('json part: ', dataJson, dataJson.ListOfEntries,dataJson.length) // ? go into  loE
    let lengthCycle = dataJson.length ;
    for(var i = 0; i < lengthCycle; i++) {
      let newestDate;
      let newestDate3level;
      newestDate = null
      newestDate3level = null
      //console.log("pieces: ", resJson[i].TypeId,' ',resJson[i].Timestamp, ' ',resJson[i] )
      //console.log("pieces: ", resJson )
      let tableItems: TableItem[]
      tableItems = []
      //console.log(' I ')

      let listOfEntries = dataJson[i].ListOfEntries
      //console.log('I was here', listOfEntries, listOfEntries.length)
      let level3Treatment = false
      let name3levelNode: string
      for (var j = 0; j < listOfEntries.length; j++) {
        newestDate = newestDate > listOfEntries[j].Timestamp ? newestDate : listOfEntries[j].Timestamp
        let nodeName = listOfEntries[j].TypeId ? listOfEntries[j].TypeId : dataJson[i].TypeId

        let link: string
        switch(linkMode) {
          case 'observations': {
            link = "/clinician-manager/observations/" + nodeName.toString()
            break;
          }
          case 'treatment': {
            link = "/clinician-manager/treatments/all"
            level3Treatment = false
            if (listOfEntries[j].TypeId) {
              level3Treatment = true
            }
            break;
          }
          case 'careplan': {
            link = "/narratives-manager"
            break;
          }
          default: {
            //statements;
            link = "/clinician-manager/treatments/all"
            break;
          }
        }
        //console.log(j ,nodeName, newestDate, level3Treatment)
        //level3Treatment = true
        if(level3Treatment){ /// level 3 data in API can be mapped to level 3 + (psychotest) or level 2 (questionnaires) in the Mind map .. level 3 allowas to easily filter low levels e.g. based on authorisations
          if (j>0 && name3levelNode != nodeName){
            nodeDataOneCat.push({
              id: name3levelNode,
              date: newestDate3level,
              content: tableItems
            });
            newestDate3level = ""
            tableItems = []

          }
          newestDate3level =  newestDate3level > listOfEntries[j].Timestamp ? newestDate3level : listOfEntries[j].Timestamp
          tableItems.push({
            name: nodeName,
            date: listOfEntries[j].Timestamp,
            source: "ODS 1",
            clinicianId: listOfEntries[j].ClinicianId ? listOfEntries[j].ClinicianId : "",
            link: link
          })
          name3levelNode = nodeName
        }
        else { // no data in Level 3 provided by API
          tableItems.push({
            name: nodeName,
            date: listOfEntries[j].Timestamp,
            source: "ODS 1",
            clinicianId: "",
            link: link
          })
        }
      }
      if(level3Treatment){
        nodeDataOneCat.push({
          id: name3levelNode,
          date: newestDate3level,
          content: tableItems
        });
        tableItems = []
      }
      nodeDataOneCat.push({
        id: dataJson[i].TypeId,
        date: newestDate,
        content: tableItems
      });
      if(!(newestDate == null) ) {
        newestDateCoreNode = newestDateCoreNode > newestDate ? newestDateCoreNode : newestDate
        //console.log(dataJson[i].TypeId, ' date: ', newestDate, 'core', newestDateCoreNode)
      }

    }
    //console.log(' date core ', newestDateCoreNode)
    nodeDataOneCat.sort((left, right): number => {
      if (left.date > right.date) return -1;
      if (left.date < right.date) return 1;
      return 0;
    });


    return nodeDataOneCat; // one part
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
