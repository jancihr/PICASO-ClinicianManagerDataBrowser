import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { DataResourceBrowserComponent }       from './data-resource-browser.component';
import { DataResourceBrowserRoutingModule }   from './data-resource-browser-routing.module';

@NgModule({
    imports: [
        DataResourceBrowserRoutingModule,
        ChartsModule
    ],
    declarations: [ DataResourceBrowserComponent ]
})
export class DataResourceBrowserModule { }
