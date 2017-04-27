import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {Http,Headers} from '@angular/http';
import {token} from './my.token';
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  myHeader:Headers;
  userProfile: Object;
  allUsers:[Object];
  latitude:number;
  longitude:number;

  lock = new Auth0Lock('PIENImwpDLbLjasKnxocaa690X94hHir', 'bababu.auth0.com', {
    theme:{
      logo:'../public/images/cycleclublogo.png'
    }
  });
 
  constructor(private http:Http) {
    this.myHeader = new Headers();
    this.myHeader.append('Content-Type','application/json');
    this.myHeader.append('Authorization',token);
    
    this.lock.on("authenticated", (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
         this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
          alert(error);
          return;
        }
        
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
 }

 public getAllUsers(){
   return this.http.get('https://bababu.auth0.com/api/v2/users',{headers:this.myHeader});
 }
}