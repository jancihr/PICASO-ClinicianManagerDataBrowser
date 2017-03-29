import {NgModule}                 from '@angular/core';

import {LoginComponent}           from './login.component';
import {RegisterComponent}        from './register.component';
import {UserService} from "./_services/user.service";
import { HttpModule } from '@angular/http';


@NgModule({
    imports:[
        HttpModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        UserService
    ]
})
export class AuthenticationModule {
}
