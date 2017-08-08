import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { ServiceCatalogComponent }   from './service-catalog.component';

const routes: Routes = [
    {
        path: '',
        component: ServiceCatalogComponent,
        data: {
            title: 'Service Catalogue'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceCatalogueRoutingModule {}
