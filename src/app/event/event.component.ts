import { Component, OnInit } from '@angular/core';
import{LocationService} from '../location.service';
import{AuthService} from '../auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events;
  userId;
  buttonString;
  emergency;
  isMine : boolean = false;
  isResolve : boolean = false;
  
  constructor(private  service : LocationService, private auth : AuthService , private router : Router) { 
    this.userId = this.auth.userProfile['clientID'];
    
    this.service.getEmergency().subscribe(
      d => {
          this.emergency = d.json();
          for(let e of this.emergency){
            if(this.userId == e.userId){
              this.isMine = true;
            }
          }
      });
    
  }
  ngOnInit() {
    
    this.service.getEvent(this.userId).subscribe(
    d => { 
        this.events = d.json();
  });
 }

 startEvent(eventId){
   setTimeout(() => {
  console.log("Event Start" + eventId);
         this.router.navigate(['event/start'] , { queryParams : {eventId : eventId} }) ;
  },2000);
 }

 CheckStatus(eventStatus){
  if(eventStatus == "created"){
    this.buttonString = "Start";
  }else  {
    this.buttonString = "Resume";
  }
  return true;
 }

  resolveEmergency(id){
    this.service.resolveEmergency(id).subscribe();
    this.isResolve = true;
    setTimeout(() => {
         this.router.navigate(['event']) ;
      },3000);  

  }
}
