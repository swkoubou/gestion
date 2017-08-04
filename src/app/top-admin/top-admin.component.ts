import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-top-admin',
  templateUrl: './top-admin.component.html',
  styleUrls: ['./top-admin.component.css']
})
export class TopAdminComponent implements OnInit {
  Employee:number = 0;
  Admin:number = 0;
  EmployeeList = [
    {name:'ウホる', stress:'96', authority:true,time:16, sei:'男'},
    {name:'ウホった', stress:'67', authority:false,time:16, sei:'男'},
    {name:'ウホい', stress:'87', authority:true,time:16, sei:'女'},
    {name:'ウホみ', stress:'120', authority:false,time:10, sei:'男'},
    {name:'ウホそう', stress:'50', authority:true,time:16, sei:'女'},
  ];
  month = [
    {month:1},
    {month:2},
    {month:3},
    {month:4},
    {month:5},
    {month:6},
    {month:7},
    {month:8},
    {month:9},
    {month:10},
    {month:11},
    {month:12},
  ];
  fday = [
    {day:1},
  ];
  bday = [
    {day:1},
  ];
  VisibleList:any;

  constructor(private router:Router) {}

  ngOnInit(){
    this.VisibleList = this.EmployeeList;

    for(var i = 0; i < this.EmployeeList.length; i++){
      if(this.EmployeeList[i].authority == true){
        this.Admin++;
      }
      this.Employee++;
    }
  }

  AllVisible():void {
    this.VisibleList = this.EmployeeList;
  }

  FrontDay(data):void{
    this.fday = [];
    for(var i = 1; i <= new Date(2017, data,0).getDate();i++){
      this.fday.push({day : i});
    }
  }

  BackDay(data):void{
    this.bday = [];
    for(var i = 1; i <= new Date(2017, data,0).getDate();i++){
      this.bday.push({day : i});
    }
  }

  Change_TopPage():void{
    this.router.navigate(['/toppage']);
  }
  Change_Admin():void{
    this.router.navigate(['/admin']);
  }
  Change_Setting():void{
    this.router.navigate(['/setting']);
  }
  Change_Logout():void{
    this.router.navigate(['/']);
  }
}
