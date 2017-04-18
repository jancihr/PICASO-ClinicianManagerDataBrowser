import {Component, ElementRef}    from '@angular/core';
import { PatientService } from './_services/patient.service'
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";

@Component({
    templateUrl: 'patient-id.component.html',
    providers: [PatientService]
})
export class PatientIdComponent {

    query = '';
    selectedPatient: any;
    filteredList = [];
    public data: any;
    public elementRef;

    constructor(myElement: ElementRef, public patientService: PatientService, private cdSharedModelService: CdSharedModelService) {
        this.elementRef = myElement;
    }
    ngOnInit(): void {
        this.data = this.cdSharedModelService.get();
        this.patientService.loadPatients(this.data.clinician.UPID);
        this.cdSharedModelService.dataChanged$.subscribe(data => {
            this.data = data;
        })
    }
    filter() {
        if (this.query !== "") {
            this.filteredList = this.patientService.filter(this.query);
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item.Name;
        this.selectedPatient = item;
        this.filteredList = [];
        console.log(item);
        this.data.patient.display = item.display;
        this.data.patient.UPID = item.UPID;
        this.cdSharedModelService.update(this.data);
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }
}
