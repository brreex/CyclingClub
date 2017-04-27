import {ModuleWithProviders} from '@angular/core';


import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {ClubComponent} from './club/club.component';
import {EventComponent} from './event/event.component';
import {LiveComponent} from './live/live.component';
import {SearchComponent} from './search/search.component';
import {ErrorComponent} from './error/error.component';

//Humaira
//start
import { RideComponent } from './ride/ride.component';
import {CreateEventComponent} from './create-event/create-event.component';
//end

import {Routes,RouterModule} from '@angular/router';
import {MyguardService} from './myguard.service';

const MY_ROUTES:Routes = [
    {path:'clubs',component:HomeComponent,canActivate:[MyguardService],
            children:[{path:'club/:clubId',component:ClubComponent,canActivate:[MyguardService]}]},
    // {path:'',redirectTo:'clubs',pathMatch:'full'},
    {path:'profile',component:ProfileComponent,canActivate:[MyguardService]},
    // {path:'club',component:ClubComponent,canActivate:[MyguardService]},

     //Humaira
    //Start    
    {path:'event/create' , component : CreateEventComponent ,canActivate:[MyguardService]},
    {path:'event/start' , component : RideComponent ,canActivate:[MyguardService]},
    //End

    {path:'event',component:EventComponent,canActivate:[MyguardService]},
    {path:'live',component:LiveComponent,canActivate:[MyguardService]},
    {path:'search',component:SearchComponent,canActivate:[MyguardService]},
    {path:'error',component:ErrorComponent}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(MY_ROUTES);