import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import {Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  clubs = [{ name: '' }];
  newclubs = [{ name: '' }];
  joinedClubs = [{ name: '' }];
  imageName: String;
  serClubs=[{name:''}];
  createCond = false;
  joinCond = false;
  clubCond = true;

  subscription:Subscription;
  constructor(private myserv: DataService, private auth: AuthService) {
    console.log(auth.userProfile);
  }

  searchByName(name) {
    this.myserv.getJoinedClubs()
      .map(res => { console.log(res.json()[0]); return res.json().filter((club) => club['name'] == name); })
      .subscribe(club => { console.log(club); this.serClubs = club });
  }


  toggleCreate() {
    this.createCond = true;
  }

  toggleJoin() {
    this.joinCond = true;
  }

  toggleClub() {
    this.clubCond = false;
    console.log(this.clubCond);
  }

  prospectClub() {
    this.toggleJoin();
    this.myserv.getClubs(sub => {
      sub.subscribe(res => {
        this.newclubs = res.json();
      });
    });
  }
  joinClub(clubId, event) {
    console.log(event);
    console.log('registered');
    console.log(clubId);
    console.log(this.auth.userProfile);
    var memberName = this.auth.userProfile['given_name'];
    var userId = this.auth.userProfile['user_id'];
    var city = "fairfield";
    var state = "iowa";

    this.myserv.getPosition().then(locat => {
    this.subscription =   this.myserv.joinClub(clubId, {
        'userId': userId, 'memberName': memberName, 'city': city, 'state': state,
        'location': [locat['longitude'], locat['latitude']]
      }).subscribe(res => res.json());
    })
    console.log(name);
  }

  createClub(clubName) {
    console.log(clubName);
    var memberName = this.auth.userProfile['given_name'];
    var userId = this.auth.userProfile['user_id'];
    var city = "fairfield";
    var state = "iowa";
    var logo = '' + this.imageName;
    console.log(logo);
    this.myserv.getPosition().then(locat => {
     this.subscription = this.myserv.createClub({
        'name': clubName,
        'city': city, 'state': state, 'members': [{
          'userId': userId, 'memberName': memberName, 'city': city, 'state': state,
          'location': [locat['longitude'], locat['latitude']]
        }], 'logo': logo,
        'location': [locat['longitude'], locat['latitude']]
      }).subscribe(res => res.json());
    });
  }

  imageUploaded(image) {
    this.imageName = image.file.name;
  }

  ngOnInit() {
    this.myserv.getJoinedClubs().subscribe(res => this.joinedClubs = res.json());
  }

  ngOnDestroy(){
    if(this.subscription!==undefined)
      this.subscription.unsubscribe();
  }
}
