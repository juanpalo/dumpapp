import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from "@angular/router";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public login=false;
  constructor(public afAuth:AngularFireAuth,private router: Router) {
    
   }

  logout() {
    this.afAuth.auth.signOut();
    this.login=false;
  }

  ngOnInit() {
   //this.login=false;
    //if(this.afAuth.user){
     // this.login=true;
   // }
  }

}
