//this componet response for dispay jobs info from evert broker or owner post

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject,AngularFireList  } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import{JobBlock} from'../job-block';
import { stringify } from '@angular/compiler/src/util';

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

  contractors:Array<string>=[]; 
  contractorJobs;
  jb:JobBlock=new JobBlock();

contractorsWithJobBlock: Array<JobBlock>=[];

  jobIds: Array<string>=[]; 

  itemsRef: AngularFireList<any>;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router) { 
        
    }

//function collect contractors and it's jobs form a new object array

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.companyName = params.get('companyName');
    });

    this.itemsRef = this.db.list(`ownerOrBrokerCreateJobs/${this.companyName}`);

    this.itemsRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {

        //console.log(action.type);
        
this.jb.contractor=String(action.key);
this.jb.jobList=action.payload.val();
this.contractorsWithJobBlock.push(this.jb);

        //this.contractors.push(action.key);
        console.log(action.key);
        console.log(action.payload.val());

        

        //this.contractorJobs=action.payload.val();
         

      });
    });

  }

}
