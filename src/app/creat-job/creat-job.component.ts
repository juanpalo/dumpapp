import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-creat-job',
  templateUrl: './creat-job.component.html',
  styleUrls: ['./creat-job.component.css']
})
export class CreatJobComponent implements OnInit {

  public JobForm;
  public role;
  public title;
  public info;

  itemRef: AngularFireObject<any>;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth,
    private router: Router) {
      this.JobForm = this.formBuilder.group({
        Contractor: '',
        Foreman: '',
        Phone: '',
        Email:'',
        JobID:'',
        JobDate:'',
        ArriveAt:'',
        LoadAt:'',
        Times:'',
      });
     }

     onSubmit(customerData) {
      //authenticate check
      if(this.afAuth.user){

      let path=`ownerOrBrokerCreateJobs/${this.info.CompanyName}/${customerData.Contractor}/${customerData.JobID}`;

       if(customerData.Contractor!=""
       &&customerData.Foreman!=""
       &&customerData.Phone!=""
       &&customerData.Email!=""
       &&customerData.JobID!=""
       &&customerData.JobDate!=""
       &&customerData.ArriveAt!=""
       &&customerData.LoadAt!=""
       &&customerData.Times!=""
       ){
        let data={
      Contractor:customerData.Contractor,
      Foreman:customerData.Foreman,
      Phone:customerData.Phone,
      Email:customerData.Email,
      JobID:customerData.JobID,
      JobDate:customerData.JobDate,
      ArriveAt:customerData.ArriveAt,
      LoadAt:customerData.LoadAt,
      Times:customerData.Times    

    }
    this.db.object(path).update(data)
    .catch(error=>console.log(error))
    .then(any=>this.router.navigate(['profile']));
    this.JobForm.reset();

     }
    }
  }

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

    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        /*
        this.itemRef = this.db.object(`trucker/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not a trucker');
          }else{
            this.role='trucker';
            this.info=action.payload.val();
            console.log(action.payload.val());
          }
        });
      */
        this.itemRef = this.db.object(`${this.role}/${this.afAuth.auth.currentUser.uid}`);
        this.itemRef.snapshotChanges().subscribe(action => {
          if(action.payload.val()==null){
            console.log('not regist');
          }else{
           
            this.info=action.payload.val();
            console.log(action.payload.val());
          }
        });
    
      }
    })



  }

}
