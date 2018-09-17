import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tenant-dialog',
  templateUrl: './tenant-dialog.component.html',
  styleUrls: ['./tenant-dialog.component.css']
})
export class TenantDialogComponent implements OnInit {
 tenantdata : FormGroup;
 loginInfo = {
  first_name:'Tapas',
  last_name:'Mahanta',
  avatar:'ay.jpeg',
  title:'Owner'
}; 
 constructor(public dialogRef: MatDialogRef<TenantDialogComponent>,private db:AngularFireDatabase) { }

  ngOnInit() {
    
    this.tenantdata = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      PAN: new FormControl(''),
      ADHAR: new FormControl(''),
      contact: new FormControl(''),
      flatNo: new FormControl(''),
      buildingNo: new FormControl(''),
      Rdate: new FormControl(''),
      depositAmount: new FormControl(''),
   });
   
  }

  close() {
    this.dialogRef.close();
  }
  onSubmitTenantDetails(value){
    console.log('Tenant Data',value);
    this.dialogRef.close();
    let tenantId = this.db.createPushId();
    value['tenantId'] = tenantId; 
    value['Rdate'] = new Date(value.Rdate).toDateString();
    this.db.object('tenants/'+tenantId).set(value)
  }
}
