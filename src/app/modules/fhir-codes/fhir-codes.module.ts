import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FhirCodesComponent} from './fhir-codes.component';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccordionModule, DropdownModule, ModalModule, TabsModule, TypeaheadModule} from "ng2-bootstrap";
import {FhirCodesRoutingModule} from "./fhir-codes-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FhirCodesRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        AccordionModule,
        TabsModule,
        TypeaheadModule,
        ModalModule
    ],
    declarations: [
        FhirCodesComponent
    ],
    exports: [
        FhirCodesComponent
    ],
    providers:[
    ]
})
export class FhirCodesModule {

}
