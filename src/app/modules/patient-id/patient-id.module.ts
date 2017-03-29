import {NgModule, EventEmitter, Output}    from '@angular/core';
import {ChartsModule}             from 'ng2-charts/ng2-charts';

import {PatientIdComponent}       from './patient-id.component';
import {PatientIdRoutingModule}   from './patient-id-routing.module';

import {FormsModule}   from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        PatientIdRoutingModule,
        ChartsModule,
        FormsModule,
        CommonModule
    ],
    declarations: [PatientIdComponent]
})

export class PatientIdModule {

    constructor() {
    }

    select(id) {


    }
}
