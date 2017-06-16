import {NgModule}             from '@angular/core';
import {
    Routes,
    RouterModule
}         from '@angular/router';
import {FhirCodesComponent} from './fhir-codes.component';


const routes: Routes = [
    {
        path: '',
        component: FhirCodesComponent,
        data: {
            title: 'FHIR Codes Manager'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FhirCodesRoutingModule {
}
