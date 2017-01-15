import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { ClinicianDashboardComponent }       from './clinician-dashboard.component';
import { ClinicianDashboardRoutingModule }   from './clinician-dashboard-routing.module';

@NgModule({
    imports: [
        ClinicianDashboardRoutingModule,
        ChartsModule
    ],
    declarations: [ ClinicianDashboardComponent ]
})
export class ClinicianDashboardModule { }
