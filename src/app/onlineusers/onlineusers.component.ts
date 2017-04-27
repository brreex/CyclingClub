import { Component,Input } from '@angular/core';

@Component({
  selector: 'onlineusers',
  templateUrl: './onlineusers.component.html',
  styleUrls: ['./onlineusers.component.css']
})
export class OnlineusersComponent {
  @Input() data
  constructor() {
    console.log('member'+this.data);
   }
}
