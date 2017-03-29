import {Component, ElementRef}    from '@angular/core';
import {PatientService} from './_services/patient.service'
import {CdSharedModelService}   from '../../_services/cd-shared-model.service';

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
        this.data = this.cdSharedModelService.get();
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
        this.data.patient.display = item.Name;
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
