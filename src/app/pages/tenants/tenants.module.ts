import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material";
import {TenantDialogComponent} from "../tenants/tenant-dialog/tenant-dialog.component";
import { TransactionComponent } from './profile/transaction/transaction.component'
import { TenantsService } from './tenants.service';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { TopnavbarComponent } from '../../components/topnavbar/topnavbar.component';
@NgModule({
  imports: [
    CommonModule,MatDialogModule,NavigationComponent,TopnavbarComponent
  ],
  declarations: [TransactionComponent],
  entryComponents:[TenantDialogComponent],
  providers:[TenantsService]
})
export class TenantsModule { }
