import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  //passing token value to be saved
  static saveToken(token: string):void{
    //removing previous saved token value
    window.localStorage.removeItem(TOKEN);
    //saving new token value
    window.localStorage.setItem(TOKEN, token);
  }

  //passing user object to be saved
  static saveUser(user: any):void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  //getting token from storage
  static getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }

  //getting user from storage
  static getUser(): any{
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) :null;
  }

  //getting user role from storage
  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  //to check if admin logged in 
  static isAdminLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is ADMIN
    return role =="ADMIN";
  }

  //to check if employee logged in 
  static isEmployeeLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is EMPLOYEE
    return role =="EMPLOYEE";
  }

  //to get user id
  static getUserId(): string {
    const user = this.getUser();
    if(user == null){
      return "";
    }
    return user.id;
  }
  
  //to log out
  static logout():void {
    //removing token and user from local storage
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
