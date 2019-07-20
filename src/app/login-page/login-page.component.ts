import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase,public afAuth:AngularFireAuth) {
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
  }

}
