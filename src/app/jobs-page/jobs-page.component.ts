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
  public companyName;
  public title;
  public info;

 //test objects
 contractors: Observable<any[]>;
  jobs: Observable<any[]>;

  itemRef: AngularFireObject<any>;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.companyName = String(params.get('companyName'));
    });


  }

}
