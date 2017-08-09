import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import {ClinicianManagerComponent}       from './clinician-manager.component';
import {ClinicianManagerRoutingModule}   from './clinician-manager-routing.module';
import {VisModule} from "ng2-vis";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {PatientOverviewComponent} from "./cards/patient-overview.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientDiseasesComponent} from "./cards/patient-diseases.component";
import {PatientCliniciansComponent} from "./cards/patient-clinicians-history.component";
import {PatientTreatmentHistoryComponent} from "./cards/patient-treatment-history.component";
import {nvD3} from "ng2-nvd3";
import {PatientImagingComponent} from "./cards/patient-imaging.component";
import {MyDateRangePickerModule} from "mydaterangepicker";
import {ProgressHttpModule} from "angular-progress-http";
import {DataTableModule} from "angular2-datatable";
import {FormsModule} from "@angular/forms";
import {PatientNotificationsComponent} from "./cards/patient-notifications.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {PatientConcludingCommentsComponent} from "./cards/patient-concluding-comments.component";
import {PatientFollowUpComponent} from "./cards/patient-follow-up-appointments.component";
import {PatientRangePicker} from "./cards/patient-range-picker.component";


@NgModule({
    imports: [
        ClinicianManagerRoutingModule, FormsModule,
        ChartsModule, VisModule, HttpModule, CommonModule,
      Ng2Bs3ModalModule, MyDateRangePickerModule, ProgressHttpModule, DataTableModule,
      Ng2SmartTableModule

    ],
    declarations: [ClinicianManagerComponent,
        PatientOverviewComponent,
        PatientDailyAverageObservationsComponent,
      PatientMedicationHistoryComponent, PatientFollowUpComponent,
      PatientDiseasesComponent, PatientConcludingCommentsComponent,
      PatientCliniciansComponent, PatientTreatmentHistoryComponent,
      PatientImagingComponent, PatientNotificationsComponent,
      PatientRangePicker,
        nvD3
    ]
})
export class ClinicianManagerModule {
}
