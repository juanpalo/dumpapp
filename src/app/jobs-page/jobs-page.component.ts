//this componet response for dispay jobs info from evert broker or owner post

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
})
export class JobsPageComponent implements OnInit {

  public JobForm;
  public role;
  public title;
  public info;

  itemRef: AngularFireObject<any>;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      switch(this.role) { 
        case "broker": { 
          this.role='broker';
           this.title="Broker/Dispatcher";
           break; 
        } 
        case "owner": { 
          this.role='owner';
           this.title="Owner/Operator";
           break; 
        } 
        case "trucker"
        : { 
           this.title="Trucker/Driver" ;
           break; 
        } 
        default: { 
          console.log("Invalid choice"); 
          break;              
       } 
     } 
    });


  }

}
