import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {

  constructor(private http: Http, private auth: AuthService) {
    
   }
  getClubs(cb) {
    console.log(this.auth.userProfile['user_id']);
    this.getPosition().then(d => {
      cb(
        this.http.get('http://localhost:3200/clubs?longitude='
          + d['longitude'] + '&latitude=' + d['latitude'] + '&userId=' + this.auth.userProfile['user_id']));
    });

  }

  getPosition() {
    return new Promise(function (resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(function (position) {
        resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude });
      }, function (msg) {
        console.log('error' + msg);
      });
    })
  }

  createClub(club: Object) {
    console.log('posting' + club);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // let body ={ name:val, location:[locat.longitude,locat.latitude]}
    return this.http.post('http://localhost:3200/clubs', JSON.stringify(club), options);
  }

  joinClub(clubId, member: Object) {
    console.log('joining location: ' + member['location'][0]);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:3200/clubs?clubId=' + clubId, JSON.stringify(member), options);
  }

  createPost(post: Object) {
    console.log('creating the posts');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3200/posts', JSON.stringify(post), options);
  }

  getPosts(clubId) {
    return this.http.get('http://localhost:3200/posts?clubId=' + clubId);
  }

  getJoinedClubs() {
    return this.http.get('http://localhost:3200/clubs/joined?userId=' + this.auth.userProfile['user_id']);
  }

  getClubsByName(name) {
    return this.http.get('http://localhost:3200/clubs/clubNames?=' + name);
  }
}
