import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {


  //to get the id of the task to load from the router path
  taskId: number;

  //form variables
  updateTaskForm!: FormGroup;
  //array to hold returned list of users from API
  listOfEmployees: any = [];
  //array to hold priority list for a task
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  //array to hold status for a task
  listOfStatus: any = ["PENDING", "INPROGRESS", "DEFERRED", "COMPLETED", "CANCELLED" ];


  constructor(
    // for directing to the task detatils by id
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    // for the form
    private fb: FormBuilder,
    //for notifications
    private snackbar: MatSnackBar,
    //for navigation
    private router: Router
  ){
     //initializtion of task id
    this.taskId = this.activatedRoute.snapshot.params["id"];
    //call the API method & load task details to form
    this.getTaskById();


    //form variable initialization
     this.updateTaskForm = this.fb.group({
      employeeId:[null,[Validators.required]],
      title:[null, [Validators.required]],
      description: [null, Validators.required],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],

    });

    //getting users list
    this.getUsers();
  }

  //method to get task by id - to load task details
  getTaskById(){
    this.adminService.getTaskById(this.taskId).subscribe(res =>{
      //add task details to reactive form
      this.updateTaskForm.patchValue(res);
    })
  }

  //method to get employee users list
   getUsers(){
    this.adminService.getUsers().subscribe( (res) =>{
      //assign returned list to class variable
      this.listOfEmployees = res;
    })
  }


  //method to submit form
  updateTask(){
    this.adminService.updateTask(this.taskId, this.updateTaskForm.value).subscribe(res=>{
      if(res.id != null){
        this.snackbar.open("Task updated successfully!", "Close",{duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackbar.open("Task creation failed!", "ERROR",{duration:5000});
      }
    })
  }

}
