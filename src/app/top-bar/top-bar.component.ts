import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from "@angular/router";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  
  constructor(public afAuth:AngularFireAuth,private router: Router) {
    
   }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  ngOnInit() {
   
  }

}
