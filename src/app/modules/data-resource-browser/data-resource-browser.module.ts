import {VisModule} from "ng2-vis";
import {HttpModule} from "@angular/http";

import { NgModule }                 from '@angular/core';

import { DataResourceBrowserComponent }       from './data-resource-browser.component';
import { DataResourceBrowserRoutingModule }   from './data-resource-browser-routing.module';
import {DataResourceBrowserCardComponent} from "./cards/data-resource-browser-card.component";
import {CommonModule} from "@angular/common";
import {ProgressHttpModule} from "angular-progress-http";

@NgModule({
    imports: [
        DataResourceBrowserRoutingModule,VisModule, HttpModule, ProgressHttpModule, CommonModule
    ],
    declarations: [ DataResourceBrowserCardComponent, DataResourceBrowserComponent ]
})
export class DataResourceBrowserModule { }
