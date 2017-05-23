import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FhirCodesComponent} from './fhir-codes.component';
import {FhirCodesRoutingModule} from "./fhir-codes-routing.module";

@NgModule({
  imports: [
    FhirCodesRoutingModule,
    CommonModule
  ],
  declarations: [
    FhirCodesComponent
  ],
  exports: [
    FhirCodesComponent
  ],
  providers: []
})
export class FhirCodesModule {

}
