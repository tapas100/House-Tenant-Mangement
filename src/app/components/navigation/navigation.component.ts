/**
 * Created by andrew.yang on 2/6/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../../pages/auth.service';
// import {Login} from "../../models/login";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
    @Input() loginInfo;
    constructor(private auth:AuthService, private router: Router) {
        let userDetails = new Object();
    if(auth.curruser!=undefined){ 
    userDetails['first_name'] = auth.curruser.displayName;
    userDetails['avatar'] = auth.curruser.photoURL;
    userDetails['title'] = 'Owner';
    this.loginInfo = userDetails
    localStorage.setItem('currUser',JSON.stringify(userDetails))
   }
   else{
       console.log('curruser',localStorage.getItem('currUser'))
       if(localStorage.getItem('currUser')){
       userDetails = JSON.parse(localStorage.getItem('currUser'))
       this.loginInfo = userDetails;
       }
       else{
        this.router.navigate['login']
      }
   }
     }

    ngOnInit() { }
    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }
    onClick(){
        this.router.navigate(['tenant'])
    }
}