import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  current_profile;

  constructor() {
  }

  page() {
    this.current_profile = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.current_profile.email);
  }

  logOut() {
    this.current_profile = '';
    window.localStorage.setItem('profile', '');
  }
}
