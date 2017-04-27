import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import{ ImageUploadModule }  from 'angular2-image-upload';

//Humaira 
//Start
import { AgmCoreModule } from 'angular2-google-maps/core';
import { RideComponent } from './ride/ride.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {LocationService} from './location.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {DataService} from './data.service';

import {routing,appRoutingProviders} from './app.routing';
import {AuthService} from './auth.service';
import {MyguardService} from './myguard.service';
import { ClubComponent } from './club/club.component';
import { EventComponent } from './event/event.component';
import { LiveComponent } from './live/live.component';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { MessangerComponent } from './messanger/messanger.component';
import { OnlineusersComponent } from './onlineusers/onlineusers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ClubComponent,
    EventComponent,
    LiveComponent,
    SearchComponent,
    ErrorComponent,
    MessangerComponent,
    OnlineusersComponent,
    CreateEventComponent,
    RideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    ImageUploadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyAJ65eokxH6b-hyyDfsoMBv7wwyRYk6o'
    })
  ],
  providers: [appRoutingProviders,AUTH_PROVIDERS,AuthService,
              MyguardService,DataService,LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
