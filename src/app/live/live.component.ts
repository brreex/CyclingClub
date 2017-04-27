import { Component , OnInit } from '@angular/core';
import {LocationService} from '../location.service';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  // google maps zoom level
  zoom: number = 14;
	
	// initial center position for the map
  lat: number;
  lng: number;
	markers ;
	drag : boolean = true;
  
  constructor(private db : LocationService) {
						if(navigator.geolocation){
			 					navigator.geolocation.getCurrentPosition(position => {
            				this.lat = position.coords.latitude;
            				this.lng = position.coords.longitude;
							});
				}

	  }

ngOnInit() {
	this.db.getLiveRide().subscribe(d => {
			this.markers = d.json();
			console.log("these markers : " + this.markers);
	});
	console.log('i am in marker');
	
	}
  clickedMarker(label: string, index: number) {
    console.log("clicked the marker: " + label + " or " + index);
  }

}
