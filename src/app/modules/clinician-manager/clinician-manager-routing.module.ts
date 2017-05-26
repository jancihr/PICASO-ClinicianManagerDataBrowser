import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import {ClinicianManagerComponent}   from './clinician-manager.component';

const routes: Routes = [
    {
        path: '',
        component: ClinicianManagerComponent,
        data: {
            title: 'Patient data viewer'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClinicianManagerRoutingModule {
}
