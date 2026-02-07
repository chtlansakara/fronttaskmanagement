import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const matsnackbar = inject(MatSnackBar);
  return next(req).pipe(catchError((error:HttpErrorResponse)=>{
    console.log(`${error.name} of status ${error.status} occurred`);
    console.log(error.message);
    matsnackbar.open("Error connecting with the server!", "Close", {duration: 5000, panelClass:[`snackbar-error`]});
    return throwError(()=> error);
  } ));
};
