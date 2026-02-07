import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
//backend URL
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //injecting with HttpClient service
  constructor(private http: HttpClient) { }

  //get method to get all users list
  getUsers(): Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/users");
  }


  //post method to create a task
  postTasks(taskDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"api/admin/tasks", taskDto);
  }

  //get method to get tasks list - REMOVED header
  getTasks(): Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/tasks");
  }


  //delete method to delete a single task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(BASIC_URL+"api/admin/tasks/"+id);
  }

  //get method to get a task by id
  getTaskById(id: number): Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/tasks/"+id);
  }

  //put method to update a task
    updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(BASIC_URL+"api/admin/tasks/"+ id, taskDto);
  }

  //get method to search task by title
  searchTasks(title: String): Observable<any> {
    return this.http.get(BASIC_URL+ "api/admin/tasks/search/"+ title);
  }

  //post method to create a comment for a task
  postComment(taskId: number, content: string):Observable<any>{
    //need to pass 'content' as a parameter
    const params = {
      content: content
    };
    //need to pass the 2nd parameter of post() method as null (for body of request)
    return this.http.post(BASIC_URL+ "api/admin/tasks/comment/"+ taskId,null,{
      params: params
    });
  }

  //get comments for a task
  getCommentsByTaskId(taskId: number): Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/comments/"+taskId);
  }

    //method to create an authorization header - (needed for each method)
  // private createAuthorizationHeader(): HttpHeaders{
  //   return new HttpHeaders().set(
  //     'Authorization', 'Bearer ' + StorageService.getToken()
  //   )
  // }
  //API method with out interceptor -- calling above method
  // getUsers(): Observable<any> {
  //   return this.http.get(BASIC_URL+"api/admin/users", {
  //     headers:this.createAuthorizationHeader()
  //   });
  // }

}
