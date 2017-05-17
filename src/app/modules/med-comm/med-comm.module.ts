import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedCommComponent } from './med-comm.component';
import {MedCommRoutingModule} from "./med-comm-routing.module";

@NgModule({
  imports: [
    MedCommRoutingModule,
    CommonModule
  ],
  declarations: [MedCommComponent]
})
export class MedCommModule {
  constructor() {
  }
}
