import {Component, ElementRef, OnInit}    from '@angular/core';
import { PatientService } from './_services/patient.service'
import {CdSharedModelService}   from '../../picaso-cd-common/_services/cd-shared-model.service';

@Component({
    templateUrl: 'patient-id.component.html',
    providers: [PatientService]
})
export class PatientIdComponent implements OnInit {

    query = '';
    selectedPatient: any;
    filteredList = [];
    public data: any;
    public elementRef;

    constructor(myElement: ElementRef, public patientService: PatientService, private cdSharedModelService: CdSharedModelService) {
        this.elementRef = myElement;
        this.data = this.cdSharedModelService.get();
    }
    ngOnInit(): void {
        this.patientService.loadPatients(this.data.clinician.pid).subscribe();
    }
    filter() {
        if (this.query !== "") {
            this.filteredList = this.patientService.filter(this.query);
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item.Display;
        this.selectedPatient = item;
        this.filteredList = [];
        this.data.patient = item;
        this.cdSharedModelService.update(this.data);
    }

}
