import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket = null;
  newMessageCount = 0;
  conversation = [];
  constructor(private auth: AuthService) {
    if (this.auth.authenticated()) {
      this.socket = io('http://localhost:3000');
      this.socket.on('chatUpdate', (data) => {
        console.log('new Message');
        this.newMessageCount++;
        this.conversation.push(data);
      });
    }
  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  ngOnInit() {
  }
}
