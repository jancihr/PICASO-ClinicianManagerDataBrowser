import { NgModule }                 from '@angular/core';
import { Routes,
         RouterModule }             from '@angular/router';

//Layouts
import { FullLayoutComponent }      from './layouts/full-layout.component';
import { SimpleLayoutComponent }    from './layouts/simple-layout.component';

import { NarrativesManagerComponent }    from './modules/narratives-manager/narratives-manager.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'clinician-dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'clinician-dashboard',
                loadChildren: 'app/modules/clinician-dashboard/clinician-dashboard.module#ClinicianDashboardModule'
            },
            {
                path: 'narratives-manager',
                loadChildren: 'app/modules/narratives-manager/narratives-manager.module#NarrativesManagerModule'
            }
            ,
            {
                path: 'data-resource-browser',
                loadChildren: 'app/modules/data-resource-browser/data-resource-browser.module#DataResourceBrowserModule'
            }

        ]
    },
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: 'app/pages/pages.module#PagesModule',
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
