import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { ClinicianDashboardComponent }       from './clinician-dashboard.component';
import { ClinicianDashboardRoutingModule }   from './clinician-dashboard-routing.module';
import {VisModule} from "ng2-vis";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {PatientOverviewComponent} from "./cards/patient-overview.component";
import {PatientDailyAverageObservationsComponent} from "./cards/patient-daily-average-observations.component";
import {PatientMedicationHistoryComponent} from "./cards/patient-medication-history.component";
import {PatientDiseasesComponent} from "./cards/patient-diseases.component";
import {PatientCliniciansComponent} from "./cards/patient-clinicians-history.component";
import {PatientCheckHistoryComponent} from "./cards/patient-check-history.component";
import {nvD3} from "ng2-nvd3";
import {PatientMoriskyResultsComponent} from "./cards/patient-morisky-results.component";
import {PatientImagingComponent} from "./cards/patient-imaging.component";

@NgModule({
    imports: [
        ClinicianDashboardRoutingModule,
        ChartsModule, VisModule, HttpModule, CommonModule,
        Ng2Bs3ModalModule
    ],
    declarations: [ ClinicianDashboardComponent,
        PatientOverviewComponent,
        PatientDailyAverageObservationsComponent,
        PatientMedicationHistoryComponent,
        PatientDiseasesComponent,
        PatientCliniciansComponent, PatientCheckHistoryComponent,
        PatientMoriskyResultsComponent, PatientImagingComponent,
        nvD3
    ]
})
export class ClinicianDashboardModule { }
