import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

//object to check data exit
itemRef: AngularFireObject<any>;
public info;
public role;
  constructor(public db: AngularFireDatabase,
    private router: Router,
    public afAuth:AngularFireAuth) { }

  ngOnInit() {

    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.itemRef = this.db.object(`trucker/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a trucker');
          }else{
            this.role='trucker';
            console.log(action.payload.val());
          }
        });
    
        this.itemRef = this.db.object(`broker/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a broker');
          }else{
            this.role='broker';
            console.log(action.payload.val());
          }
        });
    
        this.itemRef = this.db.object(`owner/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a owner');
          }else{
            this.role='owner';
            this.info=action.payload.val();
            console.log(action.payload.val().CompanyAddress);
          }
        });
    
      }
    })

  }

}
