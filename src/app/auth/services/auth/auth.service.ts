import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//URL for the backend application
const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //injecting with HttpClient service
  constructor(private http: HttpClient) { }

  //method to process signup requests -- passes SignupRequest object 
  // and returns Observable type object
  signup(signupRequest:any): Observable<any>{
    return this.http.post(BASE_URL+"api/auth/signup",signupRequest);
  }

  //method to login a user -- passes a LoginRequest object 
  //and returns Observable type object
  login(loginRequest:any):Observable<any>{
    return this.http.post(BASE_URL+"api/auth/login", loginRequest);
  }
}
