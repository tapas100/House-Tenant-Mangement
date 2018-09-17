import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private afAuth:AngularFireAuth,private auth:AuthService) { }

  ngOnInit() {
  }
  onClick(){
   
  }

  googleLogin(){
    this.doGoogleLogin().then(val=>{
      console.log('val',val);
      this.auth.curruser = val.user;
      this.router.navigate(['tenant']);
    })
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        
        resolve(res);
        
      })
    })
  }
  
}
