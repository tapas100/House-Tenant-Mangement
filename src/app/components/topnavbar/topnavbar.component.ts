import { Component } from '@angular/core';
import {ActivatedRoute, Router, Routes, RouterEvent,NavigationEnd} from "@angular/router"
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { smoothlyMenu } from '../../pages/tenants/tenants.component';
declare var $: any;
@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.component.html'
})


export class TopnavbarComponent {
    breadcrumbs$ : any;
    breadCrumbs = [];
   constructor(private router:Router,private activatedRoute:ActivatedRoute){}
//Build your breadcrumb starting with the root route of your current activated route
  ngOnInit() {
     this.breadcrumbs$ = this.router.events
    .pipe(
            filter(event => event instanceof NavigationEnd)).subscribe
    (event => this.breadCrumbs = this.buildBreadCrumb(this.activatedRoute.root));
    }
    toggleNavigation(): void {
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['login'])
    }
    buildBreadCrumb(route: ActivatedRoute, url: string = 'http://locallhost:4200', 
                breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    //If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '/home';
    //In the routeConfig the complete path is not available, 
    //so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        //If we are not on our current path yet, 
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    console.log('breadcrumb',newBreadcrumbs)
    return newBreadcrumbs;
}
    
   
}
export interface BreadCrumb {
    label: string;
    url: string;
};