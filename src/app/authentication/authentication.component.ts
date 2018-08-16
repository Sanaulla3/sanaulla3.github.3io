import { Component, OnInit } from '@angular/core';

import { AppComponent } from './../app.component';
import { RestApiService } from '../../rest-api.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  user = {
    userId: '',
    pwd: ''
  };
  constructor(
    public restApi: RestApiService,
    public app: AppComponent
  ) { }

  ngOnInit() {
  }

  logIn() {
    console.log('Login:', this.user.userId);
    this.restApi.doLogin({
      email: this.user.userId,
      password: this.user.pwd}).subscribe(res => {
        window.localStorage.setItem('profile', JSON.stringify(res.profile));
        this.app.page();
        console.log(res);

    }, err => {
      console.log('Something went wrong, retry again');
    }, () => {
      console.log('Everytime');
    });
  }

  signUp() {
    console.log('Signup:', this.user.userId);
    this.restApi.doSignUp({
      email: this.user.userId,
      password: this.user.pwd}).subscribe(res => {
        window.localStorage.setItem('profile', JSON.stringify(res.profile));
        this.app.page();
        console.log(res);

    }, err => {
      console.log('Something went wrong, retry again');
    }, () => {
      console.log('Everytime');
    });
  }

}
