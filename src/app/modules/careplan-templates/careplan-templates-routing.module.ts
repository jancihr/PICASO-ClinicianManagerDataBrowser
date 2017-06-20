import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { CareplanTemplatesComponent }   from './careplan-templates.component';

const routes: Routes = [
    {
        path: '',
        component: CareplanTemplatesComponent,
        data: {
            title: 'Careplan Templates'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CareplanTemplatesueRoutingModule {}
