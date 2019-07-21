import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  items: Observable<any[]>;
//object to check data exit
  itemRef: AngularFireObject<any>;

  public broker="broker";
  public owner="owner";
  public trucker="trucker";


  constructor(public db: AngularFireDatabase,
    private router: Router,
    public afAuth:AngularFireAuth) {
    this.items = db.list('items').valueChanges();
   }

   login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(()=> 
     this.updateUserData()).catch
    (error=>console.log(error));
  }

  private updateUserData(): void{
    
    let path=`users/${this.afAuth.auth.currentUser.uid}`;
    let data={
      email:this.afAuth.auth.currentUser.email,
      name:this.afAuth.auth.currentUser.displayName,
    }
    this.db.object(path).update(data).catch(error=>console.log(error));
  }

  ngOnInit() {

this.afAuth.auth.onAuthStateChanged(user=>{
  if(user){
    this.itemRef = this.db.object(`trucker/${this.afAuth.auth.currentUser.uid}`);
    this.itemRef.snapshotChanges().subscribe(action => {
      if(action.payload.val()==null){
      }else{
        //go to profile page
        this.router.navigate(['profile']);
      }
    });

    this.itemRef = this.db.object(`broker/${this.afAuth.auth.currentUser.uid}`);
    this.itemRef.snapshotChanges().subscribe(action => {
      if(action.payload.val()==null){
      }else{
        //go to profile page
        this.router.navigate(['profile']);
      }
    });

    this.itemRef = this.db.object(`owner/${this.afAuth.auth.currentUser.uid}`);
    this.itemRef.snapshotChanges().subscribe(action => {
      if(action.payload.val()==null){
      }else{
        //go to profile page
        this.router.navigate(['profile']);
      }
    });

  }
})

  }

}
