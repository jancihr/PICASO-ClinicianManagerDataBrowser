import {NgModule}                     from '@angular/core';
import {BrowserModule}                from '@angular/platform-browser';
import {
    LocationStrategy,
    HashLocationStrategy
}         from '@angular/common';

import {AppComponent}                 from './app.component';
import {Ng2BootstrapModule}           from 'ng2-bootstrap/ng2-bootstrap';
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

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ng2BootstrapModule,
        ChartsModule,
        PicasoCdModule,
        AuthenticationModule
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
