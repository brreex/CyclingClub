import { Component, OnInit  } from '@angular/core';
import{FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms';
import {LocationService} from '../location.service';
import{AuthService} from '../auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
 
})
export class CreateEventComponent implements OnInit {

  myForm : FormGroup;
  lat : number;
  long : number;
  id ;
  isCreated : boolean = false;
  zoom: number = 16;
  caption: string = 'Here';

  constructor(private formBuilder : FormBuilder , private db : LocationService, 
                    private auth : AuthService, private route : Router) {
         if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
         //   console.log(position.coords);
       });
this.isCreated = false;

    }  
  else {
          alert("Location access denied");
    }

         }

onSubmit(){

  this.db.addEvent(this.myForm.value.eventName,
                  this.myForm.value.eventDate, 
                  this.myForm.value.eventTime , 
                  this.lat , 
                  this.long , 
                  this.id).subscribe(r => r.json());

    this.isCreated = true;
    
     setTimeout(() => {
         this.route.navigate(['event']) ;
     },3000); 
}

ngOnInit() {
  this.myForm = this.formBuilder.group({
      'eventName' : ['' , Validators.required],
      'eventTime' : ['' , Validators.required],
      'eventDate' : ['' , [Validators.required,this.validDate]]
     });
    
     this.id = this.auth.userProfile['clientID'];

     
}
 clickedMarker(label: string, index: number) {
    console.log("clicked the marker: " + label + " or " + index);
  }

  validDate(control : FormControl) : {[s : string] : boolean} {
    if(control.value < Date.now()){
        return {'invalid' : true};
    }
    return null;
  }

}
