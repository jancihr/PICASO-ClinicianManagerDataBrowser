import {Injectable}           from '@angular/core';
import {Http, Headers}        from '@angular/http';
import {Observable} from "rxjs";
import {ConfigurationService} from "../../picaso-cd-common/_services/configuration.service";

@Injectable()
export class UserService {
    private loggedIn = false;
    private loginData: any;
    private identityData: any;
    private requestOptions: any;

    constructor(private config: ConfigurationService, private http: Http) {
        //this.loggedIn = !!localStorage.getItem('auth_token');

    }

    login(username, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let request = {
            "authenticate_user": {
                "service": "clinician_dashboard",
                "username": username,
                "password": password
            }
        };
        return <Observable<any>>this.http.post(this.config.get().API.AUTHENTICATION_URL, request, this.config.get().common.defaultHttpReqOptions).map(res => {
            if (res.text().trim().length > 0) {
                this.loginData = res.json();
                return this.loginData.success;
            }
        })
    }

    getLoginData() {
        return this.loginData;
    }

    getIdentityData() {
        return this.identityData;
    }

    identify(token) {
        let request = {
            "identify_user": {
                "token": token
            }
        };
        return <Observable<any>>this.http.post(this.config.get().API.IDENTITY_URL, request, this.config.get().common.defaultHttpReqOptions).map(res => {
            if (res.text().trim().length > 0) {
                this.identityData = res.json();
                return this.identityData;
            }
        });

    }

    isLoggedIn() {
        if (this.loginData)
            return this.loginData.success;
        return false;
    }

    logout() {
        this.identityData = null;
        this.loginData = null;
    }

    getLoggedInUser() {
        return this.identityData;
    }
}