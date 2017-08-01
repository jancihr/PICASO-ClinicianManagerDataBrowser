import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';

import {VisTimelineService, VisTimelineItems, VisTimelineItem, VisTimelineOptions} from 'ng2-vis/ng2-vis';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientMedication} from "../model/patient-medication";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {PatientLoadProgress} from "../model/patient-loadprogress";


@Component({
    selector: 'medication-history',
    templateUrl: 'patient-medication-history.component.html',
    styleUrls: [
        'patient-medication-history.component.css'
    ],
    providers: [PicasoDataService, VisTimelineService]
})

export class PatientMedicationHistoryComponent implements OnInit, OnDestroy {

    @ViewChild('myMedicationModal')

    myModal: ModalComponent;

    close() {
        this.myModal.close();
    }

    openModal() {
        for (var medication of this.medications){
            if (medication.id === this.selectedId) {
                this.selectedMedication = medication;
                break
            }
        }

        this.myModal.open();
    }

    progress: PatientLoadProgress = {
        percentage: 0,
        loaded: 0,
        total: 0
    };

    public startDate: Date;
    public endDate: Date;

    selectedItem: string;
    selectedId: string;
    selectedMedication: PatientMedication;

    listOfItems: string[];

    errorMessage: string;
    medications: PatientMedication[];


    public visTimelineMedications: string = 'medicationTimelineGraph';
    public visTimelineItemsMedications: VisTimelineItems;
    public visTimelineMedicationsOptions: VisTimelineOptions;

    public constructor(private visTimelineService: VisTimelineService,
                       private picasoDataService: PicasoDataService) {
    }

    public timelineInitialized(): void {
        // console.log('timeline initialized');

        // now we can use the service to register on events
        this.visTimelineService.on(this.visTimelineMedications, 'click');

        this.visTimelineService.click
            .subscribe((eventData: any[]) => {
                if (eventData[0] === this.visTimelineMedications) {



                    //console.log(itemId);
                    //console.log(this.selectedItem);



                    this.selectedId = eventData[1].item;
                    //console.log("itemid: ", eventData[1].item);
                    if (eventData[1].item!== null) this.openModal();


                }
            });
    }


    public refreshRange(start: Date, end: Date): void {

        this.visTimelineService.setWindow('medicationTimelineGraph', start, end);

    }

    public ngOnInit(): void {

        this.selectedItem = '';
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setFullYear(this.endDate.getFullYear() - 1);

        this.getMedications();


        this.visTimelineItemsMedications = new VisTimelineItems([]);
        this.visTimelineMedicationsOptions = {
            selectable: false,
          // showCurrentTime: true,
            //zoomMax: 61556926000, //year
            zoomMin: 86400000, //day
          clickToUse: true,
          rollingMode: false,
          start: this.startDate,
          end: this.endDate
        };


    }


    setMedications(medications: PatientMedication[]): void {

        this.medications = medications;

        this.visTimelineItemsMedications = new VisTimelineItems([]);


        this.listOfItems = [];
        for (var item of medications) {

            this.listOfItems.push(item.id);

            var vistimelineitem: VisTimelineItem;

            vistimelineitem =
                {
                    id: item.id,
                    style: "background: #"+item.color,

                    content: `<div>
                              <div class="w3-large">${item.name}</div>
                              <div class="w3-small">${item.dosage} - ${item.frequency} - ${item.stopReason}</div>
                              </div>`
                    ,
                    start: item.startDate,
                    end: item.endDate
                };
            vistimelineitem.className = " w3-border w3-border-lime w3-round-large";

            this.visTimelineItemsMedications.add(vistimelineitem);
        }


      // this.focusVis();


    }

    getMedications(): void {

        this.picasoDataService.getMedicationHistory(
            this.startDate,
            this.endDate, this.progress
        ).subscribe(
            medications => this.setMedications(medications),
            error => this.errorMessage = <any>error);

    }

    public ngOnDestroy(): void {
        this.visTimelineService.off(this.visTimelineMedications, 'click');
    }


    public focusVis(): void {

        this.visTimelineService.focusOnIds(this.visTimelineMedications, this.listOfItems)
    }
}
