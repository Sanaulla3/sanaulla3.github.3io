import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observer } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpClient } from '@angular/common/http';

export class MyServiceEvent {
  message: any;
  eventId: number;
}

@Injectable()
export class RestApiService {

  readonly BASE_URL: any =  'http://localhost:3000';
  options;
  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}); // x-www-form-urlencoded //x-www-form-urlencoded

  public onChange: EventEmitter<MyServiceEvent> = new EventEmitter<MyServiceEvent>();

  constructor(
    private http: Http) {
    this.options = new RequestOptions({ headers: this.headers });
  }


  doLogin(data): Observable<any> {
    const body2 = data;
    const content = new URLSearchParams();
    content.set('email', data.email);
    content.set('password', data.password);
    return this.http.post(this.BASE_URL + '/login', content , this.options).map(res => <any>res.json());
  }

  doSignUp(data) {

    const content = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
      console.log(key, data[key]);
      content.set(key, data[key]);
    });
    return this.http.post(this.BASE_URL + '/signup', content , this.options).map(res => <any>res.json());
  }

  doGetTweets(data): Observable<any> {

    const content = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
      console.log(key, data[key]);
      content.set(key, data[key]);
    });
    return this.http.post(this.BASE_URL + '/getTweets', content , this.options).map(res => <any>res.json());
  }

  doTweet(data): Observable<any> {

    const content = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
      console.log(key, data[key]);
      content.set(key, data[key]);
    });
    return this.http.post(this.BASE_URL + '/tweet', content , this.options).map(res => <any>res.json());
  }

  doLiked(data): Observable<any> {

    const content = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
      console.log(key, data[key]);
      content.set(key, data[key]);
    });
    return this.http.post(this.BASE_URL + '/upVote', content , this.options).map(res => <any>res.json());
  }

  doDisliked(data): Observable<any> {

    const content = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
      console.log(key, data[key]);
      content.set(key, data[key]);
    });
    return this.http.post(this.BASE_URL + '/downVote', content , this.options).map(res => <any>res.json());
  }

}
