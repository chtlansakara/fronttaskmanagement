import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../auth/services/storage/storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //get token from local storage
  const token = StorageService.getToken();

  //replace the request with added authorizatin header
  const reqWAuth = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  //return new request
  return next(reqWAuth);

};
