import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FhirCodesComponent} from './fhir-codes.component';

@NgModule({
    imports: [
        CommonModule
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
