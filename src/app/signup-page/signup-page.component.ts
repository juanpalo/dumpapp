import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
public role;
public truckerDiv=false;

public alreadySignUp=false;

itemRef: AngularFireObject<any>;
item: Observable<any>;

public title;
public checkoutForm;
  constructor( private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    public afAuth:AngularFireAuth
    ) {

      this.checkoutForm = this.formBuilder.group({
        CompanyName: '',
        DispatcherName: '',
        CompanyPhone: '',
        CompanyEmail:'',
        CompanyAddress:'',

        DriverName:'',
        Employer:'',
        Phone:'',
        Email:'',
        Address:''

      });

     }

     onSubmit(customerData) {
      // Process checkout data here
      
      console.warn('Your order has been submitted', customerData.CompanyName);

if(this.afAuth.user){
  let path=`${this.role}/${this.afAuth.auth.currentUser.uid}`;

  if(this.role=="trucker"){
    let data={
      DriverName: customerData.DriverName,
      Employer:customerData.Employer,
      Phone:customerData.Phone,
      Email:customerData.Email,
      Address:customerData.Address,
    }
    this.db.object(path).update(data).catch(error=>console.log(error));
  }else if(this.role=="broker"){
    let data={
      CompanyName: customerData.CompanyName,
      DispatcherName: customerData.DispatcherName,
      CompanyPhone: customerData.CompanyPhone,
      CompanyEmail:customerData.CompanyEmail,
      CompanyAddress:customerData.CompanyAddress,
    }
    this.db.object(path).update(data).catch(error=>console.log(error));
  }else if(this.role=="owner"){
    let data={
      CompanyName: customerData.CompanyName,
      DispatcherName: customerData.DispatcherName,
      CompanyPhone: customerData.CompanyPhone,
      CompanyEmail:customerData.CompanyEmail,
      CompanyAddress:customerData.CompanyAddress,
    }
    this.db.object(path).update(data).catch(error=>console.log(error));
  }
}
      this.checkoutForm.reset();
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      switch(this.role) { 
        case "broker": { 
           this.title="Broker/Dispatcher";
           break; 
        } 
        case "owner": { 
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

if(this.role=="trucker"){
  this.truckerDiv=true;
}else{
  this.truckerDiv=false;
}

this.itemRef = this.db.object(`${this.role}/${this.afAuth.auth.currentUser.uid}`);
this.itemRef.snapshotChanges().subscribe(action => {
  console.log(action.type);
  console.log(action.key)
  console.log(action.payload.val())
  if(action.payload.val()==null){
    this.alreadySignUp=false;
  }else{
    this.alreadySignUp=true;
  }
});


//
console.log(this.item);



  }


}
