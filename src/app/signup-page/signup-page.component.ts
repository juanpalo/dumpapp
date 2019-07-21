import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { FormBuilder } from '@angular/forms';
 

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
public role;
public checkoutForm;
  constructor( private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {

      this.checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
      });

     }

     onSubmit(customerData) {
      // Process checkout data here
      console.warn('Your order has been submitted', customerData);
   
      this.checkoutForm.reset();
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      
    });
  }


}
