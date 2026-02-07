import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../auth/services/storage/storage.service';

export const roleGuard: CanActivateFn = (route, state) => {

   //to navigate to relevant route
  const router = inject(Router);

  //get expected role from route
   const expectedRole = route.data['role'];

  if(StorageService.getUserRole() != expectedRole){
    router.navigate(['/restricted']);
    return false;
  }
  return true;
};
