import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HomeComponent} from "./pages/home/home.component";
import { FlatsComponent } from "./pages/flats/flats.component";
import { TenantsComponent } from "./pages/tenants/tenants.component";
import { ProfileComponent } from './pages/tenants/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes=[
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
    },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     data:{
    //         breadcrumb: 'Home'
    //     }
    // },
    // {
    //     path: 'flats',
    //     component : FlatsComponent,
    //     data:{
    //         breadcrumb: 'Flats'
    //     }
    // },
    {
            path: 'login',
            component: LoginComponent,
        },
        {
        path: 'tenant',
        component : TenantsComponent,
        data:{
            breadcrumb: 'Tenants'
        }
    },
    {
        path: 'profile',
        component : ProfileComponent,
        data:{
            breadcrumb: 'profile'
        }
    },
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
