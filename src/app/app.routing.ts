import { NgModule }                 from '@angular/core';
import { Routes,
    RouterModule
}             from '@angular/router';

import {CdSharedModelService} from './_services/cd-shared-model.service'

//Layouts
import { FullLayoutComponent }      from './layouts/full-layout.component';
import {AuthGuard} from './authentication/auth.guard';
import {LoginComponent} from './authentication/login.component'
import {RegisterComponent} from './authentication/register.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'data-resource-browser',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'home',
        redirectTo: 'data-resource-browser',
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
                loadChildren: 'app/modules/patient-id/patient-id.module#PatientIdModule'
            },
            {
                path: 'clinician-manager',
                loadChildren: 'app/modules/clinician-manager/clinician-manager.module#ClinicianManagerModule'
            },
            {
                path: 'narratives-manager',
                loadChildren: 'app/modules/narratives-manager/narratives-manager.module#NarrativesManagerModule'
            },
            {
                path: 'data-resource-browser',
                loadChildren: 'app/modules/data-resource-browser/data-resource-browser.module#DataResourceBrowserModule'
            },
            {
                path: 'risk-manager',
                loadChildren: 'app/modules/risk-manager/risk-manager.module#RiskManagerModule'
            }

        ],
        canActivate: [AuthGuard]
    },
    {path: '**', component: LoginComponent},

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule],
    providers: [CdSharedModelService]

})
export class AppRoutingModule {}
