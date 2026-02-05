import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';
//backend URL
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

   //method to create an authorization header - (needed for each method)
  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

  //method to get tasks for the Employee-user
   getEmployeeTasksById(): Observable<any> {
      return this.http.get(BASIC_URL+"api/employee/tasks", {
        headers:this.createAuthorizationHeader()
      });
    }


    //method to update tasks for the Employee-user - using back ticks as a template string
   updateStatusByTaskId(id: number, status: string): Observable<any> {
      return this.http.get(BASIC_URL+`api/employee/tasks/${id}/${status}`, {
        headers:this.createAuthorizationHeader()
      });
    }


    //get method to get a task by id
    getTaskById(id: number): Observable<any> {
      return this.http.get(BASIC_URL+"api/employee/tasks/"+id, {
        headers:this.createAuthorizationHeader()
      });
    }

     //post method to create a comment for a task
    postComment(taskId: number, content: string):Observable<any>{
      //need to pass 'content' as a parameter
      const params = {
        content: content
      };
      //need to pass the 2nd parameter of post() method as null (for body of request)
      return this.http.post(BASIC_URL+ "api/employee/tasks/comment/"+ taskId,null,{
        params: params,
        headers:this.createAuthorizationHeader()
      });
    }

      //get comments for a task
      getCommentsByTaskId(taskId: number): Observable<any> {
        return this.http.get(BASIC_URL+"api/employee/comments/"+taskId, {
          headers:this.createAuthorizationHeader()
        });
      }


}
