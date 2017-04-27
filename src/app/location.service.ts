import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class LocationService {

  constructor(private http : Http) { 
  }
  addEvent(eName,eDate,eTime,lat,long,id){
    let body = {
      userId : id,
      eventName : eName,
      eventDate : eDate,
      eventTime : eTime,
      latitude : lat,
      longtitude : long,
    }
    
      return this.http.post('http://localhost:3200/location' , body);
  }
  getEvent(userId){
    return this.http.get('http://localhost:3200/location?userId='+userId);
  }

  getLiveRide(){
      return this.http.get('http://localhost:3200/location/live');
  }
  updateEvent(id){
       let body = {
        eventId : id
      }
      console.log("event Updated : " + id);
      return this.http.put('http://localhost:3200/location/live', body);
  }
  emergencyEvent(id,uId,lat,long){
      let body = {
        eventId : id,
        userId : uId,
        latitude : lat,
        longtitude : long
      }
      return this.http.post('http://localhost:3200/location/live/emergency', body);
  }

  stopEvent(id){
      return this.http.delete('http://localhost:3200/location/live/stop?eventId='+id);
  }
  updateLocation(id,lat,long){
    let body = {
      eventId : id,
      latitude : lat,
      longtitude : long
    }
    console.log("longtitude service : " + long);  
    return this.http.put('http://localhost:3200/location/live/update',body);
  }
  getEmergency(){
    return this.http.get('http://localhost:3200/location/live/emergency');
  }
  resolveEmergency(id){
      console.log("Emergency ID " + id);
      return this.http.delete('http://localhost:3200/location/live/emergency?eventId='+id);
  }

}
