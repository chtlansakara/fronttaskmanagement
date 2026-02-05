import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //to check who is logged in (user role)
  isEmployeeLoggedIn : boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();

  //injecting Router
  constructor(private router: Router){}

  //getting who is logged in (user role) - when the component is initialized
  ngOnInit(){ 
    this.router.events.subscribe(event => {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }

  //log out method
  logout(){
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }
}
