import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfComponent } from './pdf/pdf.component';

import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { TopBarComponent } from './top-bar/top-bar.component';

const firebaseConfig = {
  apiKey: "AIzaSyAy4Vx5HGQ82x8hCiBuPhAtxQphCq8KJDU",
  authDomain: "truckproject-b9adc.firebaseapp.com",
  databaseURL: "https://truckproject-b9adc.firebaseio.com",
  projectId: "truckproject-b9adc",
  storageBucket: "",
  messagingSenderId: "192747041888",
  appId: "1:192747041888:web:a3e175088a47deb1"
};

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: 'pdf', component: PdfComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
