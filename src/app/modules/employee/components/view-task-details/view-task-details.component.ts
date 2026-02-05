import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  standalone: false,
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {
 //to hold task id from URL
  taskId : number ;
  //to hold task details
  currentTask: any;
  //to hold form values
  commentForm!: FormGroup;
  //to hold comments of the task
  commentsOfTask: any ;

  //inject Admin Service, ActivatedRoute, FormBuilder, MatSnackbar
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackbar: MatSnackBar,
  ){
    //extract id from URL
    this.taskId =this.activatedRoute.snapshot.params["id"];
  }

  //life cycle hook -
  ngOnInit() {
    this.getTaskById();
    //initializing the form group variable
    this.commentForm = this.fb.group({
      content:[null, Validators.required]
    });
    //get comments of the task
    this.getCommentsbyTaskId();
  }

  //method to get task by id - to load task details
  getTaskById(){
    this.employeeService.getTaskById(this.taskId).subscribe(res =>{
      //save to class variable
      this.currentTask = res;
      console.log(this.currentTask);
    })
  }

  //method to create a comment
  publishComment(){
    //the value for 'content' should be string type - so control value is accessed
    this.employeeService.postComment(this.taskId, this.commentForm.get("content")?.value).subscribe(res=>{
      if(res.id!=null){
        this.matSnackbar.open("Comment published successfully", "Close", {duration: 5000});
        //load comments again
        this.getCommentsbyTaskId();
      }else{
        this.matSnackbar.open("Something went wrong! Try again.", "Close", {duration: 5000});
      }
    })
  }

  //method to get comments by task id
  getCommentsbyTaskId(){
    this.employeeService.getCommentsByTaskId(this.taskId).subscribe(res =>{
      //save to class variable
      this.commentsOfTask = res;
      console.log(this.commentsOfTask);
    })
  }






}
