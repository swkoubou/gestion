import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestService } from './../request.service';
import {CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-top-admin',
  templateUrl: './top-admin.component.html',
  styleUrls: ['./top-admin.component.css']
})
export class TopAdminComponent implements OnInit {
  public Employee: number = 0;
  public Admin: number = 0;
  public EmployeeList: any;
  public VisibleList: any;
  public BackToken: string;


  constructor(private authService: RequestService, private router: Router) {}

  //ページ読み込み時にトークンを取得、またグループに所属しているユーザーの一覧を取得
  ngOnInit() {
    this.BackToken = sessionStorage.getItem('token');
    this.authService.getuserlist(this.BackToken).subscribe(
      result => this.setProfile(result),
      error => console.log(error)
    );
  }

  //ページに表示するデータを用意。ストレス値や勤務時間はその人のidを使ってここで持ってきてる
  setProfile(result: any) {
    this.EmployeeList = result;
    for (let i = 0; i < result.length; i++) {
      this.EmployeeList[i].first_name = result[i].first_name + ' ' + result[i].last_name;
      this.EmployeeList[i].email = result[i].email;
      this.GetStress(result[i].id, i);
      this.GetWorkTime(result[i].id, i);
    }

    this.VisibleList = this.EmployeeList;

    for (let i = 0; i < this.EmployeeList.length; i++) {
      if (this.EmployeeList[i].last_name === true) {
        this.Admin++;
      }
      this.Employee++;
    }

  }

  //一番最初に行う関数。表示用の配列と編集用の配列を別に分けている
  AllVisible(): void {
    this.VisibleList = this.EmployeeList;
  }

  //ストレスをサーバーから持ってきてる。
  GetStress(id: number, i: number): void {
    this.authService.getstress(this.BackToken, id).subscribe(
      result => {
        if (!result) {
          this.EmployeeList[i].last_name = '0';
        } else {
          this.EmployeeList[i].last_name = '13';
        }
      },
      error => console.log(error)
    );
  }

  //勤務時間をサーバーから持ってくる
  GetWorkTime(id: number, i: number): void {
      this.authService.getworktime(this.BackToken, id).subscribe(
        result => this.WorkTime(result, i),
        error => console.log(error)
      );
    }

    //持ってきた勤務時間のデータを表示できるように整形している
 WorkTime(data: any[], p: number): void {
    const date = [];
    let WorkTime = 0;
    for (let i = 0; i < data.length - 1; i++) {
      data[i].id =  Date.parse(data[i].end) - Date.parse(data[i].begin);
      date[i] = new Date(data[i].begin);
      date[i].setHours(date[i].getHours() - 9);
      data[i].id = data[i].id / 1000 / 3600;
      WorkTime = 0;
      WorkTime = parseFloat(data[i].id.toFixed(2));
    }
    this.EmployeeList[p].group_id = WorkTime;
}

}
