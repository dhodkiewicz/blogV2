import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn{
  return(control: AbstractControl): ValidationErrors | null =>{
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if(password && confirmPassword && password !== confirmPassword){
        return {
          passwordsDontMatch: true
        }
      }

      return null
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() }) // A.K.A. cross-field validator (2x fields)

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    if(!this.signUpForm.valid){
      return;
    }
  }

  get email(){
    return this.signUpForm.get('email')
  }

  get password(){
    return this.signUpForm.get('password')
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }

  get name(){
    return this.signUpForm.get('name')
  }

}
