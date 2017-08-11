import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';


@Component({
  selector: 'app-login-group',
  templateUrl: './login-group.component.html',
  styleUrls: ['./login-group.component.css']
})
export class LoginGroupComponent implements OnInit {
  GroupName: string;
  Error: string;

  constructor(private router: Router, private request: RequestService, public cookie: CookieService) {
    // URLのアンカー（#以降の部分）を取得
    var urlHash = location.hash;

    // URLにアンカーが存在する場合
    if(urlHash){
      console.log("ufsd");
      const p = [];
      const pp = window.location.href.substring(1).split('#');
      const ppp = pp[1].split('&');
      const pppp = ppp[0].split('=');
      // sessionStorage.setItem(pppp[0],pppp[1]);
      const key = pppp[0];
      const value = pppp[1];
      const opts: CookieOptionsArgs = {
        expires: this.getToday()
      };
      this.cookie.put(key, value, opts);
      this.router.navigate(['/toppage']);
    }

    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/toppage']);
    }
  }
  
    // アクセストークンをクッキーに格納する
  ngOnInit() {
  }

    // クッキーを格納した日付を記録する
    public getToday() {
        const date = new Date();
        const YYYY = date.getFullYear();
        const Mon = this.zero(date.getMonth() + 1);
        const DD = this.zero(date.getDate() + 7);
        // const ary = ["Sun","Mon","Tus","Web","Ths","Fri","Sta"];
        const Wdy = date.getDay();
        const HH = date.getHours();
        const MM = date.getMinutes();
        const SS = date.getSeconds();
        // Wdy, DD Mon YYYY HH:MM:SS GMT"
        console.log(Wdy + ', ' + DD + ' ' + Mon + ' ' + YYYY + ' ' + HH + ':' + MM + ':' + SS + ' GMT');
        return Wdy + ', ' + DD + ' ' + Mon + ' ' + YYYY + ' ' + HH + ':' + MM + ':' + SS + ' GMT';
      }

      // １桁の場合0で埋める
      public zero(num) {
        num += '';
        if (num.length === 1) {
          num = '0' + num;
        }
        return num;
      }
  //入力したグループ名が存在するか検索、あればユーザーログインに移動
  Change_Page(): void {
    if (!this.GroupName) {
      this.Error = 'グループ名を入力してください';
      return;
    }

    this.request.group_search(this.GroupName).subscribe(
      result => this.Result_Process(result),
      error => console.log(error)
    );
  }

  //グループ名検索後の処理、グループ名は後のユーザーリスト取得に必要なのでセッションストレージに格納
  Result_Process(result: any) {
    if (result.code) {
      this.Error = 'グループ名が存在しません';
      return;
    }
    sessionStorage.setItem('GroupName', this.GroupName);
    sessionStorage.setItem('GroupId', result.id);
    this.router.navigate(['/loginuser']);
  }

  Change_CreateGroup(): void {
    this.router.navigate(['/creategroup']);
  }
}
