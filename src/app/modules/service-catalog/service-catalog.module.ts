import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceCatalogComponent} from './service-catalog.component';
import {ServiceCatalogueRoutingModule} from "./service-catalogue-routing.module";
import {ServiceCatalogService} from "./service-catalog.service";
import {TabsModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ServiceCatalogueRoutingModule,
    TabsModule.forRoot()
  ],
  providers: [ServiceCatalogService],
  declarations: [ServiceCatalogComponent]
})
export class ServiceCatalogModule {
}
