import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material'
import { HomeComponent } from './home/home.component';
import { FlatsComponent } from './flats/flats.component';
import { TenantsComponent } from './tenants/tenants.component';
import { ProfileComponent } from './tenants/profile/profile.component';
import { TenantDialogComponent } from './tenants/tenant-dialog/tenant-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
@NgModule({
  imports: [
    CommonModule,BrowserModule,MatTabsModule
  ],
  declarations: [
    HomeComponent,FlatsComponent,TenantsComponent, ProfileComponent, TenantDialogComponent, LoginComponent
  ],
  providers:[AuthService]
})
export class PagesModule { }

