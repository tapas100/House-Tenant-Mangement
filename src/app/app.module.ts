import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { FlatsComponent } from './pages/flats/flats.component';
import { HomeComponent } from './pages/home/home.component';
import { TenantsComponent } from './pages/tenants/tenants.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app-routing.module";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatButtonModule, MatCardModule,MatDialogModule, MatTabsModule,MatTableModule,MatInputModule,MatPaginatorModule,MatFormFieldModule} from '@angular/material'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {environment} from '../environments/environment'
import { ProfileComponent } from '../app/pages/tenants/profile/profile.component';
import {TenantDialogComponent} from '../app/pages/tenants/tenant-dialog/tenant-dialog.component'
import { TransactionComponent } from './pages/tenants/profile/transaction/transaction.component';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TopnavbarComponent,
    FlatsComponent,
    HomeComponent,
    TenantsComponent,ProfileComponent,TenantDialogComponent,TransactionComponent,LoginComponent
  ],
  imports: [
    MatFormFieldModule,MatInputModule,
    BrowserModule,MatCardModule,ReactiveFormsModule,
    MatPaginatorModule,MatButtonModule,
    MatTableModule,MatDatepickerModule,MatNativeDateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    MatDialogModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[TenantDialogComponent,TransactionComponent]
})
export class AppModule { }
