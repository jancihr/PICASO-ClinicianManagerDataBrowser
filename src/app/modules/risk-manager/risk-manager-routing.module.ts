import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { RiskManagerComponent }   from './risk-manager.component';

const routes: Routes = [
    {
        path: '',
        component: RiskManagerComponent,
        data: {
            title: 'Narratives Manager'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RiskManagerRoutingModule {}
