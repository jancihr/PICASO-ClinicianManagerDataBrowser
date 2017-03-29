import {Component}        from '@angular/core';
import {UserService} from "./_services/user.service";
import {Router} from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    constructor(private userService: UserService, public router: Router) {
    }

    login(event, username, password) {
        event.preventDefault();
        if (this.userService.login(username, password))
            this.router.navigate(['home']);

    }

    signup(event) {
        event.preventDefault();
        //this.router.navigate(['register']);
    }
}
