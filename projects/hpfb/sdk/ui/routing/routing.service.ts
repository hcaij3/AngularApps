import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigateToWithExtra(path: string, dataObj: any) {
    this.router.navigate([path], {
      state:{
        myComplexObject: dataObj
       }
     });
  }
}
