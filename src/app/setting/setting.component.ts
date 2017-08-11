import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserlistComponent } from './../userlist/userlist.component';
import { UsersettingComponent } from './../usersetting/usersetting.component';
import { CreateuserComponent } from './../createuser/createuser.component';

import { RequestService} from './../request.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  //表示するコンポーネントをbooleanで制御する
  public Admin: boolean = true;
  public UserList: boolean = false;
  public UserSetting: boolean = true;
  public CreateUser: boolean = false;
  public SelectUserSetting: boolean = true;
  public SelectCreateUser: boolean = false;
  public SelectUserList: boolean = false;
  public BackToken:string;

  constructor(private router: Router, private authService:RequestService) { }

  ngOnInit() {
    this.BackToken = sessionStorage.getItem('token');
    this.authService.backProfile(this.BackToken).subscribe(
      result => this.Profile(result),
      error => console.log(error)
    );
  }

  //左のバーに表示するデータをFitbitから取得
  Profile(data: any[]): void {
    if(data["permission"] !== "admin"){
      this.Admin = false;
    }
  }

  //下全て表示するコンポーネントを切り替える処理
  Change_UserSetting(): void {
    this.UserSetting = true;
    this.UserList = false;
    this.CreateUser = false;

    this.SelectUserSetting = true;
    this.SelectCreateUser = false;
    this.SelectUserList = false;
  }

  Change_CreateUser(): void {
    this.UserSetting = false;
    this.UserList = false;
    this.CreateUser = true;

    this.SelectUserSetting = false;
    this.SelectCreateUser = true;
    this.SelectUserList = false;
  }

  Change_UserList(): void {
    this.UserSetting = false;
    this.UserList = true;
    this.CreateUser = false;

    this.SelectUserSetting = false;
    this.SelectCreateUser = false;
    this.SelectUserList = true;
  }

  Change_TopPage(): void {
    this.router.navigate(['/toppage']);
  }
  Change_Admin(): void {
    this.router.navigate(['/admin']);
  }
  Change_Setting(): void {
    this.router.navigate(['/setting']);
  }
  Change_Logout(): void {
    this.router.navigate(['/']);
  }
}
