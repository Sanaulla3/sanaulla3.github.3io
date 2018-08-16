import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';

import { RestApiService } from '../../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tweets = [];
  startIndex = 0;
  lastIndex = 5;
  newTweet;
  userId;
  id;
  isLiked;
  isDisliked;
  length;
  pageSize = 5;
  max;
  pageSizeOptions: number[] = [5];
  // MatPaginator Output
  pageEvent: PageEvent;

  datasource = [];

  activePageDataChunk = [];
  constructor(
    public restApi: RestApiService) {
      this.userId = JSON.parse(window.localStorage.getItem('profile')).email;
      this.id = JSON.parse(window.localStorage.getItem('profile'))._id;
      this.isLiked = JSON.parse(window.localStorage.getItem('profile')).isLiked;
      this.isDisliked = JSON.parse(window.localStorage.getItem('profile')).isDisliked;
    }

  ngOnInit() {
    this.restApi.doGetTweets({startIndex: this.startIndex, lastIndex: this.lastIndex}).subscribe(res => {
      this.tweets = res.data.data;
      this.length = res.data.len;
      this.max = this.startIndex;
      for (const key in this.tweets) {
        if (this.isLiked.indexOf(this.tweets[key]._id) > -1) {
          this.tweets[key].isLiked = true;
        }else if (this.isDisliked.indexOf(this.tweets[key]._id) > -1) {
          this.tweets[key].isDisliked = true;
        }
      }
      this.activePageDataChunk = this.tweets.slice(0, this.pageSize);
      console.log(res);
    }, err => {
      console.log('Something went wrong, retry again');
    }, () => {
      console.log('Everytime');
    });
  }

  tweet() {
    console.log(this.id);
    if (!!this.newTweet) {
      const tweet = {
        id: this.id,
        userId: this.userId,
        time: Date.now(),
        tweet: this.newTweet,
        upVotes: 0,
        downVotes: 0,
        views: 0,
        isLiked: false,
        isDisliked: false
      };
      this.newTweet = '';
      this.restApi.doTweet(tweet).subscribe(res => {
        this.tweets.unshift(res.data);
        this.activePageDataChunk = this.tweets.slice(0, this.pageSize);
        this.length++;
        console.log(res.data);

      }, err => {
        console.log('Something went wrong, retry again');
      }, () => {
        console.log('Everytime');
      });
    }
  }

  like(tweet) {
    const index = this.tweets.indexOf(tweet);
    this.tweets[index].isLiked = !this.tweets[index].isLiked;
    const self = this;
    const promise = new Promise(function(resolve, reject) {
      if (self.tweets[index].isLiked) {
        self.tweets[index].upVotes++;
        if (self.tweets[index].isDisliked) {
          self.tweets[index].downVotes--;
          self.tweets[index].isDisliked = false;
        }
      }
      if (!self.tweets[index].isLiked) {
        self.tweets[index].upVotes--;
      }
      resolve('Success!');
    });
    promise.then(function(value) {
      self.restApi.doLiked(tweet).subscribe(res => {
          console.log(res);
      }, err => {
        console.log('Something went wrong, retry again');
      }, () => {
        console.log('Everytime');
      });
    });
  }

  dislike(tweet) {
    const index = this.tweets.indexOf(tweet);
    this.tweets[index].isDisliked = !this.tweets[index].isDisliked;
    const self = this;
    const promise = new Promise(function(resolve, reject) {
      if (self.tweets[index].isDisliked) {
        self.tweets[index].downVotes++;
        if (self.tweets[index].isLiked) {
          self.tweets[index].upVotes--;
          self.tweets[index].isLiked = false;
        }
      }
      if (!self.tweets[index].isDisliked) {
        self.tweets[index].downVotes--;
      }
      resolve('Success!');
    });
    promise.then(function(value) {
    self.restApi.doDisliked(tweet).subscribe(res => {
        console.log(res);
    }, err => {
      console.log('Something went wrong, retry again');
    }, () => {
      console.log('Everytime');
    });
      console.log(value);
    });
  }

  onPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    console.log(secondCut, this.max, this.tweets.length);
    if (secondCut > this.length) {
      secondCut = this.length;
    }
    if (this.length > this.max) {
      this.restApi.doGetTweets({startIndex: firstCut, lastIndex: secondCut}).subscribe(res => {
        this.length = res.data.len;
        this.max = (secondCut < this.length) ? secondCut : this.length;
        for (let key = 0; key <  res.data.data.length; key++  ) {
          this.tweets.push(res.data.data[key]);
          if (this.isLiked.indexOf(this.tweets[firstCut + key]._id) > -1) {
            this.tweets[firstCut + key].isLiked = true;
          } else if (this.isDisliked.indexOf(this.tweets[firstCut + key]._id) > -1) {
            this.tweets[firstCut + key].isDisliked = true;
          }
        }
        this.activePageDataChunk = this.tweets.slice(firstCut, secondCut);
        console.log(res);
      }, err => {
        console.log('Something went wrong, retry again');
      }, () => {
        console.log('Everytime');
      });
    } else {
      this.activePageDataChunk = this.tweets.slice(firstCut, secondCut);
    }
  }

  time(t) {
    const date = new Date(t);
    return date.toString().slice(0, 24);
  }
}
