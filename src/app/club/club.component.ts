import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import * as io from "socket.io-client";
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Rx';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit,OnDestroy {
  members;
  message = '';
  conversation = [];
  socket = null;

  posts: Object[];
  clubId;
  clubName;
  subscription:Subscription;
  constructor(private auth: AuthService, private myserv: DataService, private cRoute: ActivatedRoute) {
    this.auth.getAllUsers().subscribe((res) => {
      this.members = res.json();
      console.log(res.json());
    },
      function (error) {
        console.log(error);
      });
  }
  createPost(postMessage) {
    console.log(postMessage);
    var memberName = this.auth.userProfile['name'];
    var clubId = this.clubId;
   this.subscription= this.myserv.createPost({ 'clubId': clubId, 'memberName': memberName, 'post': postMessage }).subscribe(res => res.json());
  }

  ngOnInit() {
    if (this.auth.authenticated()) {
      this.socket = io('http://localhost:3000');
      
      this.socket.on('chatHistory', (data) => {
        this.conversation.push(data);
      });
      this.socket.on('chatUpdate', (data) => {
        console.log(data);
        this.conversation.push(data);
      });
    }
    this.cRoute.params.subscribe(params => {
    this.clubId = params['clubId'];
      this.myserv.getPosts(params['clubId']).subscribe(res => { this.posts = res.json() });
    });
    this.cRoute.queryParams.subscribe(qparams => { this.clubName = qparams['name'] });
  }
  send() {
    console.log('user profile' + this.auth.userProfile);
    
    let newMessage =  {
      'userName': this.auth.userProfile['name'],
      'text': this.message,
      'toId':'',
      'pic': this.auth.userProfile['picture'],
      'time': new Date()
    }

    this.socket.emit('newMessage',newMessage);
    this.message = '';
  }

  keypressHandler(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
  ngOnDestroy(){
    if(this.subscription!==undefined)
      this.subscription.unsubscribe();
    this.socket.emit('disconnect');
  }
}
