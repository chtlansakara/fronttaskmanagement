import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: false,
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent {
  //variable for FormGroup
  taskForm!: FormGroup;
  //array to hold returned list of users from API
  listOfEmployees: any = [];
  //array to hold priority list for a task
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];


  //injecting Admin, Form Builder, Snackbar & Router services
  constructor(
    private adminService: AdminService, 
    private fb: FormBuilder,
    //for notifications
    private snackbar: MatSnackBar,
    //for navigation 
    private router: Router
  ){
    //calling API method
    this.getUsers();
    //assing form values to variables
    this.taskForm = this.fb.group({
      employeeId:[null,[Validators.required]],
      title:[null, [Validators.required]],
      description: [null, Validators.required],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    })
  }

  //method to get all users
  getUsers(){
    this.adminService.getUsers().subscribe( (res) =>{
      //assign returned list to class variable
      this.listOfEmployees = res; 
      //print in the console
      console.log(res);
    })
  }

  //method to submit form
  createTask(){
    console.log(this.taskForm.value);
    this.postTask();
  }

  //method to create a task
  postTask(){
    this.adminService.postTasks(this.taskForm.value).subscribe(res=>{
      if(res.id != null){
        this.snackbar.open("Task created successfully!", "Close",{duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackbar.open("Task creation failed!", "ERROR",{duration:5000});
      }
    })
  }
} 
