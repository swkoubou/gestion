import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent implements OnInit{
  Error:string;
  Name:string;

  constructor() {}

  ngOnInit(){}
}
