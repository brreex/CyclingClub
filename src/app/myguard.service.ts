import { Injectable } from '@angular/core';
import {CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
@Injectable()
export class MyguardService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { 
  }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
      if(this.auth.authenticated()){
        console.log('You Can Pass Through');
        return true;
      }
      this.router.navigate(['error']);
  }
}
