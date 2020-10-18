import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forBiddenUsername = ['Damon', 'David'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required,this.forBiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email,], this.forbiddenEmails),
      }),
      
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // valueChanges and statusChanges are two hooks  observables
    this.signupForm.valueChanges.subscribe(
      (value: any) =>{
        console.log(value);
      }
    );

    this.signupForm.statusChanges.subscribe(
      (status: any) =>{
        console.log(status);
      }
    );

    // set form value(can be used for prepopulating form value)
    this.signupForm.setValue({
      'userData':{
        'username':'Stefan',
        'email':'stefan@falls.com'
      },
        'gender': 'male',
        'hobbies':[]
    })

    // updating only few/single fields( using patchValue)
    this.signupForm.patchValue({
      'userData':{
        'username':'Klauss',
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm) 
    this.signupForm.reset(); // an object can also be passed here specifying the fields to be reset.
    this.ngOnInit();  
  }


  onAddHobby(){
    const control = new FormControl(null, Validators.required);
   (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  forBiddenNames(control: FormControl):{[s:string]: boolean}{  // custom sync validators
    if(this.forBiddenUsername.indexOf(control.value) !== -1){
       return { 'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {   // custom Async validators
     const promise = new Promise<any>((resolve, reject) => {
           setTimeout(() =>{
             if(control.value === 'test@test.com'){
                     resolve({'emailIsForbidden': true})
             }else{
               resolve(null);
             }
           },2000);
     });
     return promise;
    }
}
