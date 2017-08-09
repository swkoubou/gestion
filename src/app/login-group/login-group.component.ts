import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-login-group',
  templateUrl: './login-group.component.html',
  styleUrls: ['./login-group.component.css']
})
export class LoginGroupComponent implements OnInit {
  GroupName: string;
  Error: string;

  constructor(private router: Router, private request: RequestService) { }

  ngOnInit() {
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
