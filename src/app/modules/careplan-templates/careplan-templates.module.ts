import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareplanTemplatesComponent} from './careplan-templates.component';
import {CareplanTemplatesueRoutingModule} from "./careplan-templates-routing.module";
import {CareplanTemplatesService} from "./careplan-templates.service";
import {TabsModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    CareplanTemplatesueRoutingModule,
    TabsModule.forRoot()
  ],
  providers: [CareplanTemplatesService],
  declarations: [CareplanTemplatesComponent]
})
export class CareplanTemplatesModule {
}
