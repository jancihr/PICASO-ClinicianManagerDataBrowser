import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { NarrativesManagerComponent }   from './narratives-manager.component';

const routes: Routes = [
    {
        path: '',
        component: NarrativesManagerComponent,
        data: {
            title: 'Narratives Manager'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NarrativesManagerRoutingModule {}
