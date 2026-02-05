import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  //tasks list of the employee
  empTasksList: any = [];


  constructor(
    private employeeService: EmployeeService,
    private matSnackbar : MatSnackBar,
  ){
    this.getTasks();
  }

  getTasks(){
    this.employeeService.getEmployeeTasksById().subscribe(res=>{
      console.log(res);
      this.empTasksList = res;
    
    })
  }

  updateStatus(id: number, status : string){
    this.employeeService.updateStatusByTaskId(id,status).subscribe(res=>{
      if(res.id!= null){
      //show success message
      this.matSnackbar.open("Task status updated successfully.", "Close", {duration:5000});
      //load tasks again
      this.getTasks();
      }else{
        //show error message
      this.matSnackbar.open("Error updating the task status!.", "Close", {duration:5000});

      }
    })
  }

}
