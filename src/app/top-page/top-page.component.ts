import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import { ListviewComponent } from './../listview/listview.component';
import { TopAdminComponent } from './../top-admin/top-admin.component';
import { SettingComponent } from './../setting/setting.component';


@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  User:any = {
    Name : "野獣",
    Weight:70,
    Height:180,
    Stress:true
  }
  public listview:boolean = true;
  public topadmin:boolean = false;
  public setting:boolean = false;

  Change_Setting():void {
    this.setting = true;
    this.listview = false;
    this.topadmin = false;
  }

  Change_TopAdmin():void {
    this.setting = false;
    this.listview = false;
    this.topadmin = true;
  }

  Change_ListView():void {
    this.setting = false;
    this.listview = true;
    this.topadmin = false;
  }

  Change_Logout():void{
    this.router.navigate(['/']);
  }
}
