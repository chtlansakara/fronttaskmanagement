import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //to save tasks list
  tasksList: any = [];

  //for search form
  searchForm!:FormGroup;

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    //for search form
    private fb: FormBuilder,
  ){
    //calling the method to get list from API
    this.getTasks();

    //initialization of search form
    this.searchForm = this.fb.group({
      title: [null]
    })
  }


  //method to get tasks list saved
  getTasks(){
    this.adminService.getTasks().subscribe(res=>{
      //saving the result to the class list
      this.tasksList = res;
    })
  }

  //method to delete a task
  deleteTask(id: number){
    this.adminService.deleteTask(id).subscribe(res=>{
    this.snackbar.open("Task deleted successfully.","Close",{duration:5000});
    //reload the task list by calling that API method
    this.getTasks();
    })
  }

  //method to search task by title
  searchTask(){
    //make list empty first
    this.tasksList = [];

    //get value in search <input>
    const title = this.searchForm.get('title')!.value;

    //calling API Method
    if(title != '')
    this.adminService.searchTasks(title).subscribe(res=>{
      //assigning result to class list of tasks
      this.tasksList = res;
    });
  }

}
