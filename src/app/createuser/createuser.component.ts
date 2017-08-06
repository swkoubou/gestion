import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit{
  Error:string;
  MailAdress:string;
  PassWord:string;
  Sex:string;
  LastName:string;
  FirstName:string;

  constructor() {}

  ngOnInit(){}

}
