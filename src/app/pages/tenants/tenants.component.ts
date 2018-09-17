import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    MAT_DIALOG_DATA
  } from "@angular/material";
  
import {
    MatDialog,
    MatDialogConfig
  } from "@angular/material";
  import {TenantDialogComponent} from "../tenants/tenant-dialog/tenant-dialog.component"
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { TenantsService } from './tenants.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
tenantList$:Observable<any>;
tenantList = [];
loginInfo:any;  
constructor(private auth:AuthService, private tenantService:TenantsService, private router:Router,private dialog: MatDialog,private db:AngularFireDatabase) { 
    let userDetails = new Object();
    if(auth.curruser!=undefined){ 
    userDetails['first_name'] = auth.curruser.displayName;
    userDetails['avatar'] = auth.curruser.photoURL;
    userDetails['title'] = 'Owner';
    this.loginInfo = userDetails
    localStorage.setItem('currUser',JSON.stringify(userDetails))
   }
   else{
       if(localStorage.getItem('currUser')){
       userDetails = JSON.parse(localStorage.getItem('currUser'))
       this.loginInfo = userDetails
       }
       else{
        this.router.navigate['login']
       }
   }
}
  
  ngOnInit() { 
      
     this.tenantList$ =  this.db.list('tenants').valueChanges();
     this.tenantList$.subscribe(val=>{
               console.log('tenantList',val);
               this.tenantList = val;
     })
  }

  applyFilter(filterValue: string) {
    this.tenantList = Utils.filterArrayByString(this.tenantList,filterValue);
  }

  onClick(tenantData){
      this.tenantService.currentTenant = tenantData;
     this.router.navigate(['profile'])
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(TenantDialogComponent, dialogConfig);
  }
}


declare var jQuery:any;

export function correctHeight() {

    var pageWrapper = jQuery('#page-wrapper');
    var navbarHeigh = jQuery('nav.navbar-default').height();
    var wrapperHeigh = pageWrapper.height();

    if (navbarHeigh > wrapperHeigh) {
        pageWrapper.css("min-height", navbarHeigh + "px");
    }

    if (navbarHeigh < wrapperHeigh) {
        if (navbarHeigh < jQuery(window).height()) {
            pageWrapper.css("min-height", jQuery(window).height() + "px");
        } else {
            pageWrapper.css("min-height", navbarHeigh + "px");
        }
    }

    if (jQuery('body').hasClass('fixed-nav')) {
        if (navbarHeigh > wrapperHeigh) {
            pageWrapper.css("min-height", navbarHeigh + "px");
        } else {
            pageWrapper.css("min-height", jQuery(window).height() - 60 + "px");
        }
    }
}

export function detectBody() {
    if (jQuery(document).width() < 769) {
        jQuery('body').addClass('body-small')
    } else {
        jQuery('body').removeClass('body-small')
    }
}

export function smoothlyMenu() {
    if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        jQuery('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                jQuery('#side-menu').fadeIn(400);
            }, 200);
    } else if (jQuery('body').hasClass('fixed-sidebar')) {
        jQuery('#side-menu').hide();
        setTimeout(
            function () {
                jQuery('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        jQuery('#side-menu').removeAttr('style');
    }
}


export class Utils
{
    public static filterArrayByString(mainArr, searchText)
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    public static searchInObj(itemObj, searchText)
    {
        for ( const prop in itemObj )
        {
            if ( !itemObj.hasOwnProperty(prop) )
            {
                continue;
            }

            const value = itemObj[prop];

            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return prop;
                }
            }

            else if ( Array.isArray(value) )
            {
                if ( this.searchInArray(prop,value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    public static searchInArray(prop,arr, searchText)
    {
        for ( const value of arr )
        {
            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    public static searchInString(value, searchText)
    {
       
        return value.toLowerCase().includes(searchText);
    }

    public static generateGUID()
    {
        function S4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }

        return S4() + S4();
    }

    public static toggleInArray(item, array)
    {
        if ( array.indexOf(item) === -1 )
        {
            array.push(item);
        }
        else
        {
            array.splice(array.indexOf(item), 1);
        }
    }

    public static handleize(text)
    {
        return text.toString().toLowerCase()
                   .replace(/\s+/g, '-')           // Replace spaces with -
                   .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                   .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                   .replace(/^-+/, '')             // Trim - from start of text
                   .replace(/-+$/, '');            // Trim - from end of text
    }
}
