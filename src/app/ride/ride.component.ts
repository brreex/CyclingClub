import { Component, OnInit } from '@angular/core';
import{LocationService} from '../location.service';
import{ActivatedRoute} from '@angular/router';
import{AuthService} from '../auth.service';
import{Router} from '@angular/router';


@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  id;
  userId;
  userName;
  intervalId;
  isStop : boolean = false;
  
  // google maps zoom level
  zoom: number = 17;
	
	// initial center position for the map
  lat: number;
  long: number;
  constructor(private  service : LocationService, 
              private route : ActivatedRoute,  private auth : AuthService,
                private router : Router) { 
    
     if(navigator.geolocation){
			 					navigator.geolocation.getCurrentPosition(position => {
            				this.lat = position.coords.latitude;
            				this.long = position.coords.longitude;
                     console.log ("start Longtitude  : " + this.long  + " Latitude :" + this.lat);
                  
							});
             
      }
    
    //this.userName = this.auth.userProfile[''];
    this.userName = "humi";
    this.userId = this.auth.userProfile['clientID'];
    this.route.queryParams.subscribe( params => {
            this.id = params['eventId'];
            this.service.updateEvent(this.id).subscribe();
    });



  }

  ngOnInit() {
    
      this.intervalId =  setInterval(() => {
     //       console.log("humi");
            if(this.long != undefined){
                  console.log("Updated");
                  this.service.updateLocation(this.id,this.lat,this.long).subscribe();
              }
              if(navigator.geolocation){
			 
       					    navigator.geolocation.getCurrentPosition(position => {
            				this.lat = position.coords.latitude;
            				this.long = position.coords.longitude;
                    console.log ("Longtitude  : " + this.long  + " latitude : " + this.lat);  
                });
          }
        },5000);

       }

everytime(){
  console.log("this is methode");
}

emergency(eventId){
  this.service.emergencyEvent(eventId,this.userId,this.lat,this.long).subscribe();
}

stopEvent(eventId){
 
  this.service.stopEvent(eventId).subscribe();
  clearInterval(this.intervalId);
  this.isStop = true;
  
  setTimeout(() => {
         this.router.navigate(['event']) ;
  },3000);  
}

}
