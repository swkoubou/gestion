import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestService } from './../request.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit{
  //フォームの入力データを格納するための変数達
  public Error: string;
  public MailAdress: string;
  public PassWord: string;
  public Gender: string;
  public LastName: string;
  public FirstName: string;
  public Token: string;

  //画面表示した時にセッションストレージからトークンを取得
constructor(private request: RequestService, private router: Router) {
  this.Token = sessionStorage.getItem('token');
}

  ngOnInit() {}

  //入力したデータを使ってデータベースに登録
  Create_User(): void {
    if (!this.MailAdress || !this.PassWord || !this.FirstName || !this.LastName || !this.Gender) {
      this.Error = '未入力項目があります';
      return;
    }

    this.request.create_user(this.MailAdress, this.PassWord, this.FirstName, this.LastName, this.Gender, this.Token).subscribe(
      result => this.Result_Process(result),
      error => console.log(error)
    );
  }

  //データベースに登録を行った時の処理、エラー時でもここに行く
  Result_Process(result: any) {
    if (result.code) {
      this.Error = 'この入力データでは作成できません';
      return;
    }

    this.MailAdress = '';
    this.PassWord = '';
    this.FirstName = '';
    this.LastName = '';
    this.Gender = '';
    this.Error = '作成成功';
  }

}
