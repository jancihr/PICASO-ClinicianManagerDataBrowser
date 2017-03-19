import { Injectable }           from '@angular/core';
import { Http, Headers }        from '@angular/http';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    this.loggedIn = true;
    return this.loggedIn;
  }

  logout(){

  }

  isLoggedIn() {
    console.log(this.loggedIn);
    return this.loggedIn;
  }

  getLoggedInUser() {
    return null;
  }
}
