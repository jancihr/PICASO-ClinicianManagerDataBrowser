import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { PatientIdComponent }   from './patient-id.component';

const routes: Routes = [
    {
        path: '',
        component: PatientIdComponent,
        data: {
            title: 'Patient Selection'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientIdRoutingModule {}
