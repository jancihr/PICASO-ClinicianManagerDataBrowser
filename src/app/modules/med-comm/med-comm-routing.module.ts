import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';
import {MedCommComponent}       from './med-comm.component';


const routes: Routes = [
    {
        path: '',
        component: MedCommComponent,
        data: {
            title: 'Communication'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedCommRoutingModule {
}
