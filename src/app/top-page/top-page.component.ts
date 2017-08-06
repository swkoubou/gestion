import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params}  from '@angular/router';
import { RequestService} from './../request.service';
import {CookieService} from 'angular2-cookie/core';

import { ListviewComponent } from './../listview/listview.component';
import { TopAdminComponent } from './../top-admin/top-admin.component';
import { SettingComponent } from './../setting/setting.component';


@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {

  Token:string ="";
  Admin:boolean = true;

  User:any = {
    Name : "野獣",
    Weight:0,
    Height:0,
    Stress:true
  }
  public ListView:boolean = true;
  public TopAdmin:boolean = false;
  public Setting:boolean = false;

  constructor(private authService:RequestService,
              private router:Router,
              public cookie: CookieService) { }


  ngOnInit() {
    this.Token = this.cookie.get("access_token");

    this.authService.getProfile(this.Token).subscribe(
      result => this.setProfile(result),
      error => console.log(error)
    );
  }

  Change_Setting():void {
    this.Setting = true;
    this.ListView = false;
    this.TopAdmin = false;
  }

  Change_TopAdmin():void {
    this.Setting = false;
    this.ListView = false;
    this.TopAdmin = true;
  }

  Change_ListView():void {
    this.Setting = false;
    this.ListView = true;
    this.TopAdmin = false;
  }

  Change_Logout():void{
    this.router.navigate(['/']);
  }

  setProfile(data:any[]):void{
    console.log(data);
    this.User.Weight = data["user"].weight;
    this.User.Height = data["user"].height;
  }
}
