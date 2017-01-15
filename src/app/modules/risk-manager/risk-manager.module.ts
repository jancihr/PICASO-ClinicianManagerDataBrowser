import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { RiskManagerComponent }       from './risk-manager.component';
import { RiskManagerRoutingModule }   from './risk-manager-routing.module';

@NgModule({
    imports: [
        RiskManagerRoutingModule,
        ChartsModule
    ],
    declarations: [ RiskManagerComponent ]
})
export class RiskManagerModule { }
