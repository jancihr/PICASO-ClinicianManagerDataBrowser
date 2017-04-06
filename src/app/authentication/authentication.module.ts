import {NgModule}                 from '@angular/core';

import {LoginComponent}           from './login.component';
import {RegisterComponent}        from './register.component';
import {UserService} from "./_services/user.service";
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
    imports:[
        CommonModule,
        HttpModule,
        ReactiveFormsModule
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
