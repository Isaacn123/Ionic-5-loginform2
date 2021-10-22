import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular'
import   firebase from 'firebase/app';
import 'firebase/auth'

import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx'
import { firebaseConfig } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'], 
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController, private fbook: Facebook) {
  }

  ngOnInit() {
  }

  gotoLoginpage(){
    this.nav.navigateForward(['loginscreen']);
  }

  registerUser(){ 
    this.nav.navigateForward(['signup'])
  }

  loginwithFacebook(){             
   this.fbook.login(['public_profile','email']).then( (response: FacebookLoginResponse)=>{
     console.log(response);
     const userId = response.authResponse.userID;
     const userToken = response.authResponse.accessToken;

     if(response.status === "connected"){
      console.log("FacebookRESP", response)                  
       firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(userToken)).then( (userresponse)=>{
        
        console.log("USERRESPONCE::",userresponse);
       }).catch(error =>{
        console.log("errorFIREBASE", error)
      })
     }
   }).catch(error =>{
    console.log("errorFB", error)
  })
  }

 
}
