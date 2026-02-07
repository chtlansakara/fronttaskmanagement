import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../auth/services/storage/storage.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  //to navigate to relevant route
  const router = inject(Router);

  //check if user is logged in
  if(StorageService.isLoggedIn()){


    // return false;

  //get user role if logged in:
    const role = StorageService.getUserRole();
    if(role=="ADMIN"){
      router.navigate(['/admin/dashboard']);
    }else{
      router.navigate(['/employee/dashboard']);
    }
    return false;
  }
  router.navigate(['/login']);
  return true;
};
