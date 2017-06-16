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
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'home',
    redirectTo: 'patient-id',
    pathMatch: 'full',
    canActivate: [AuthGuard]
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
        path: 'clinician-manager',
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
      }
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
