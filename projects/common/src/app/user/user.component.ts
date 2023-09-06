import { Component, Input } from '@angular/core';

@Component({
  selector: 'cmn-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: any; // Use a suitable type/interface for your user data
}