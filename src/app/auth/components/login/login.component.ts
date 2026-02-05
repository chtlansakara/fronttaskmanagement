import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
//form group variable
  loginForm!: FormGroup;
  //hide password variable - to toggle visibility on click
  hidePassword = true;

  //constructor injecting dependencies
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
   ){
    //initialize the form with its inputs
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
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
    console.log("Logging in user..");
    console.log(this.loginForm.value);

     // call API method via Auth Service
    this.authService.login(this.loginForm.value).subscribe((res) => {
      //display result in console
      console.log(res);
      //show success message or error message
      if(res.userId != null){
        //create a user object
        const user = {
          id: res.userId,
          role: res.userRole
        }
        //save user to local storage
        StorageService.saveUser(user);
        //save token to local storage
        StorageService.saveToken(res.jwt);

        //navigating to dashboard by the user role
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
        }else if(StorageService.isEmployeeLoggedIn()){
          this.router.navigateByUrl("/employee/dashboard");
        }

        this.snackbar.open("Login successful", "Close", {duration: 5000});
      }else{
        this.snackbar.open("Invaid credentials!", "Close", {duration: 5000, panelClass: "error-snackbar"});
      }
    } )

  }
}
