import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  //form group variable
  signupForm!: FormGroup;
  //hide password variable - to toggle visibility on click
  hidePassword = true;

  //constructor injecting dependencies
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
   ){
    //initialize the form with its inputs
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }


  //method to toggle password visibility
  togglePasswordVisibility(){
    //inverse the boolean value for hidePassword
    this.hidePassword = !this.hidePassword;
  }


  //method to submit the form
  submitForm(){
    //print form values on the console
    console.log("It comes to here!");
    console.log(this.signupForm.value);

    //check two password fields if they matches
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;

    if(password !== confirmPassword){
      //show an error message
      this.snackbar.open("Passwords do not match!", "Close",{duration: 5000, panelClass : "error-snackbar"});
      return;
    }

    //when passwords match - 
    // call API method via Auth Service
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      //display result in console
      console.log(res);
      //show success message or error message
      if(res.id != null){
        this.snackbar.open("Sign up successful", "Close", {duration: 5000});
        //navigate to login page
      this.router.navigateByUrl("/login");
      }else{
        this.snackbar.open("Sign up failed! Try again.", "Close", {duration: 5000, panelClass: "error-snackbar"});
      }
    } )


  }
}
