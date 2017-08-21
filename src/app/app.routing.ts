import {NgModule}                 from '@angular/core';
import {
  Routes,
  RouterModule
}             from '@angular/router';

import {FullLayoutComponent}      from './layouts/full-layout.component';
import {AuthGuard} from './authentication/auth.guard';
import {LoginComponent} from './authentication/login.component'
import {RegisterComponent} from './authentication/register.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient-id',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'patient-id',
        loadChildren: './modules/patient-id/patient-id.module#PatientIdModule'
      },
      {
        path: 'clinician-manager/:card/:measurement',
        loadChildren: './modules/clinician-manager/clinician-manager.module#ClinicianManagerModule'
      },
      {
        path: 'clinician-manager/:card/:measurement/:range',
        loadChildren: './modules/clinician-manager/clinician-manager.module#ClinicianManagerModule'
      },
      {
        path: 'narratives-manager',
        loadChildren: './modules/narratives-manager/narratives-manager.module#NarrativesManagerModule'
      },
      {
        path: 'data-resource-browser',
        loadChildren: './modules/data-resource-browser/data-resource-browser.module#DataResourceBrowserModule'
      },
      {
        path: 'med-comm',
        loadChildren: './modules/med-comm/med-comm.module#MedCommModule'
      },

      {
        path: 'risk-manager',
        loadChildren: './modules/risk-manager/risk-manager.module#RiskManagerModule'
      },
      {
        path: 'codings',
        loadChildren: './modules/fhir-codes/fhir-codes.module#FhirCodesModule'
      },
      {
        path: 'service-catalog',
        loadChildren: './modules/service-catalog/service-catalog.module#ServiceCatalogModule'
      },
      {
        path: 'careplan-templates',
        loadChildren: './modules/careplan-templates/careplan-templates.module#CareplanTemplatesModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
