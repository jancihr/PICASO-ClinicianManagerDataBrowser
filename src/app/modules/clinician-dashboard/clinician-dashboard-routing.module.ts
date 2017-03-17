import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { ClinicianDashboardComponent }   from './clinician-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: ClinicianDashboardComponent,
        data: {
            title: 'Clinician Manager'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClinicianDashboardRoutingModule {}
