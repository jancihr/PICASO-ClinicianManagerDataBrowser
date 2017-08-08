import {Component, ElementRef}    from '@angular/core';
import {PatientService} from './_services/patient.service'
import {CdSharedModelService} from "../../picaso-cd-common/_services/cd-shared-model.service";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'patient-id.component.html',
  providers: [PatientService]
})
export class PatientIdComponent {
  patients: any[] = [];
  public data: any;

  constructor(public patientService: PatientService, private cdSharedModelService: CdSharedModelService) {
  }

  ngOnInit(): void {
    this.data = this.cdSharedModelService.get();
    this.patientService.loadPatients(this.data.clinician.UPID).subscribe((res) => {
      this.patients = res;
      console.log(this.patients);
    });
    this.cdSharedModelService.dataChanged$.subscribe(data => {
      this.data = data;
    })
  }

  patientSelected($event) {
    let item = $event.item;
    console.log(item);
    this.data.patient.display = item.display;
    this.data.patient.UPID = item.UPID;
    this.cdSharedModelService.update(this.data);
  }

}
