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
  EmployeeList = [
    {Name:'ウホる', Stress:'96', Authority:true,Time:16, Sei:'男'},
  ];
  VisibleList:any;
  Token:string = "";

  constructor(private authService:RequestService,
              private router:Router,
              public cookie: CookieService) { }

  ngOnInit(){
    this.VisibleList = this.EmployeeList;
    for(var i = 0; i < this.EmployeeList.length; i++){
      if(this.EmployeeList[i].Authority == true){
        this.Admin++;
      }
      this.Employee++;
    }
  }

  AllVisible():void {
    this.VisibleList = this.EmployeeList;
  }


}
