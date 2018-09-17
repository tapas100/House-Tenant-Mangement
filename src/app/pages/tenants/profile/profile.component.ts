import { Component, OnInit } from '@angular/core';
import {MatSort,MatTableDataSource,MatPaginator} from '@angular/material';
import {
  MAT_DIALOG_DATA
} from "@angular/material";

import {
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { TransactionComponent } from './transaction/transaction.component';
import { TenantsService } from '../tenants.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['transactionId', 'Tdate', 'amount'];
  dataSource: any;
  currtenant:any;
  transactionList$:Observable<any>;
  transactionlist = [];
  loginInfo:any;
  constructor(private auth:AuthService, private router:Router, private dialog:MatDialog,private tenantService:TenantsService,private db:AngularFireDatabase) {
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
       this.loginInfo = userDetails;
       }
       else{
        this.router.navigate['login']
       }
   }
   }

  ngOnInit() {
    if(this.tenantService.currentTenant!=undefined){
      this.currtenant = this.tenantService.currentTenant;
      localStorage.setItem('currTenant',JSON.stringify(this.currtenant))
    }
    else{
      if(localStorage.getItem('currTenant')){
        this.currtenant = JSON.parse(localStorage.getItem('currTenant'))
      }
      else{
        this.router.navigate['login']
      }
    }
    this.transactionList$ =  this.db.list('transactions/'+this.currtenant.tenantId).valueChanges();
    this.transactionList$.subscribe(val=>{
      console.log('DB transactions',val)
        this.transactionlist = val;
      
        console.log('transactionList',this.transactionlist);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.transactionlist);
    })

    
    
    console.log('tenantData',this.tenantService.currentTenant)
    
  
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      tenantId:this.currtenant.tenantId
  };
    this.dialog.open(TransactionComponent, dialogConfig);
  }
  onBack(){
    this.router.navigate(['tenant'])
  }
  onRemove(){
    this.db.list('tenants/'+this.currtenant.tenantId).remove();
    this.db.list('transactions/'+this.currtenant.tenantId).remove();
    this.router.navigate(['tenant']);
  }
}

export interface PeriodicElement {
  transactionId:string;
  Tdate:string;
  amount:string;
}
