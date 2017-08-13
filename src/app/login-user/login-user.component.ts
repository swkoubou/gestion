import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  public MailAdress: string;
  public PassWord: string;
  public Error: string = '';

  constructor(private router: Router, private request: RequestService) { }

  ngOnInit() {
  }

  //ユーザーログインの処理、未入力時のエラー表示やデータをAPIで送るのはグループログインの時とほぼ一緒
  UserLogin(): void {
    if (!this.MailAdress || !this.PassWord) {
      this.Error = 'ユーザーネームかパスワードが入力されていません';
      return;
    }
    const group = sessionStorage.getItem('GroupName');


    this.request.login(this.MailAdress, this.PassWord, group).subscribe(
      (result: any) => this.Result_Process(result),
      error => console.log(error)
    );
  }

  //これもグループログイン時と基本は一緒、違うのはlocation.hrefでFitbitの認証ページに飛んでる所
  Result_Process(result: any) {
    if (result.code) {
      this.Error = 'メールアドレスかパスワードが正しくありません';
      return;
    }
    console.log(result);
    sessionStorage.setItem('token', result.token);
    sessionStorage.setItem('userid', result.id);
    sessionStorage.setItem('username', result.first_name + ' ' + result.last_name);
    //本番用
  //  window.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2284BG&redirect_uri=https%3A%2F%2Fgestion2.swkoubou.com&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
    //test用
    window.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228PRR&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';

  }

  //戻るボタンを押した時はグループログインのページに戻る
  Back_Page(): void {
  this.router.navigate(['/']);
  }
}
