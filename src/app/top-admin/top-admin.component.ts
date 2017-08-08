import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params}  from '@angular/router';
import { RequestService} from './../request.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-top-admin',
  templateUrl: './top-admin.component.html',
  styleUrls: ['./top-admin.component.css']
})
export class TopAdminComponent implements OnInit {
  Employee:number = 0;
  Admin:number = 0;
  EmployeeList:any;
  VisibleList:any;
  BackToken:string;


  constructor(private authService:RequestService,
              private router:Router) {}

  ngOnInit(){
    this.BackToken = sessionStorage.getItem("token");
    this.authService.getuserlist(this.BackToken).subscribe(
      result => this.setProfile(result),
      error => console.log(error)
    );
  }

  setProfile(result:any){
    console.log(result);
    this.EmployeeList = result;
    for(var i = 0; i < result.length; i++){
      this.EmployeeList[i].first_name = result[i].first_name + " " + result[i].last_name;
      this.EmployeeList[i].email = result[i].email;
      this.GetStress(result[i].id,i);
      this.GetWorkTime(result[i].id,i);
    }

    this.VisibleList = this.EmployeeList;

    for(var i = 0; i < this.EmployeeList.length; i++){
      if(this.EmployeeList[i].last_name == true){
        this.Admin++;
      }
      this.Employee++;
    }

  }

  AllVisible():void {
    this.VisibleList = this.EmployeeList;
  }

  GetStress(id:number,i:number):void{
    this.authService.getstress(this.BackToken,id).subscribe(
      result => {
        if(!result){
          this.EmployeeList[i].last_name = '0';
        }else{
          this.EmployeeList[i].last_name = '13';
        }
      },
      error => console.log(error)
    );
  }
  GetWorkTime(id:number,i:number):void{
      this.authService.getworktime(this.BackToken,id).subscribe(
        result => {
          if(!result){
            this.EmployeeList[i].group_id = '0';
          }else{
            this.EmployeeList[i].group_id = '13';
          }
        },
        error => console.log(error)
      );
    }

}
