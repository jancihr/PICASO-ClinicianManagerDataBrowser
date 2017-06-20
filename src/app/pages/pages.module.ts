import { NgModule }                 from '@angular/core';

import { p404Component }            from './404.component';
import { p500Component }            from './500.component';
import { RegisterComponent }        from './register.component';

import { PagesRoutingModule }       from './pages-routing.module';

@NgModule({
    imports: [ PagesRoutingModule ],
    declarations: [
        p404Component,
        p500Component,
        RegisterComponent
    ]
})
export class PagesModule { }
