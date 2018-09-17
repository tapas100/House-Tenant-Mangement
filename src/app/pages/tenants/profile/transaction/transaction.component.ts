import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionData:FormGroup;
  tenantId:any;
  constructor( @Inject(MAT_DIALOG_DATA) data,private dialogRef:MatDialogRef<TransactionComponent>,private db:AngularFireDatabase) { 
    this.tenantId = data.tenantId;
  }

  ngOnInit() {
    this.transactionData = new FormGroup({
      Tdate: new FormControl(''),
      amount: new FormControl('')
   });
  }
  close() {
    this.dialogRef.close();
  }
  onSubmitTransactionDetails(value){
    console.log('Transaction Data',value);
    this.dialogRef.close();
    value['Tdate'] = new Date(value.Tdate).toDateString()
    value['transactionId'] = this.db.createPushId();
    this.db.object('transactions/'+this.tenantId+'/'+value.transactionId).set(value)
  }
}
