import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { NarrativesManagerComponent }       from './narratives-manager.component';
import { NarrativesManagerRoutingModule }   from './narratives-manager-routing.module';

@NgModule({
    imports: [
        NarrativesManagerRoutingModule,
        ChartsModule
    ],
    declarations: [ NarrativesManagerComponent ]
})
export class NarrativesManagerModule { }
