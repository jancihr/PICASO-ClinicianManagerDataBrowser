import {NgModule}                     from '@angular/core';
import {BrowserModule}                from '@angular/platform-browser';
import {
  LocationStrategy,
  HashLocationStrategy
}         from '@angular/common';

import {AppComponent}                 from './app.component';
import {BsDropdownModule, Ng2BootstrapModule}           from 'ngx-bootstrap';
import {NAV_DROPDOWN_DIRECTIVES}      from './shared/nav-dropdown.directive';

import {ChartsModule}                 from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES}    from './shared/sidebar.directive';
import {AsideToggleDirective}         from './shared/aside.directive';
import {BreadcrumbsComponent}         from './shared/breadcrumb.component';
import {AuthGuard} from './authentication/auth.guard';

// Routing Module
import {AppRoutingModule}             from './app.routing';

//Layouts
import {FullLayoutComponent}          from './layouts/full-layout.component';
import {SimpleLayoutComponent}        from './layouts/simple-layout.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {PicasoCdModule} from "./picaso-cd-common/picaso-cd-common.module";
import {ConfigurationService} from "./picaso-cd-common/_services/configuration.service";
import {CdSharedModelService} from "./picaso-cd-common/_services/cd-shared-model.service";
import {NarrativesManagerModule} from "./modules/narratives-manager/narratives-manager.module";
import {FhirCodesModule} from "./modules/fhir-codes/fhir-codes.module";
import {MedCommModule} from "./modules/med-comm/med-comm.module";
import {PatientIdModule} from "./modules/patient-id/patient-id.module";
import {ModalModule} from "ngx-bootstrap";
import {ServiceCatalogModule} from "./modules/service-catalog/service-catalog.module";
import {PagesModule} from "./pages/pages.module";
import {CareplanTemplatesService} from "./modules/careplan-templates/careplan-templates.service";
import {CareplanTemplatesModule} from "./modules/careplan-templates/careplan-templates.module";
import {CookieModule} from "ngx-cookie";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2BootstrapModule.forRoot(),
    ChartsModule,
    ModalModule.forRoot(),
    AuthenticationModule,
    FhirCodesModule,
    NarrativesManagerModule,
    PicasoCdModule,
    PatientIdModule,
    MedCommModule,
    BsDropdownModule.forRoot(),
    ServiceCatalogModule,
    CareplanTemplatesModule,
    CookieModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, ConfigurationService, CdSharedModelService,  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
