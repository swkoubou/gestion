import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestService} from './../request.service';
import { CookieService } from 'angular2-cookie/core';

import { ListviewComponent } from './../listview/listview.component';
import { TopAdminComponent } from './../top-admin/top-admin.component';
import { SettingComponent } from './../setting/setting.component';


@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {

  //認証用のトークンが入ってる
  public FitbitToken: string = '';
  public BackToken: string = '';
  public Admin: boolean = true;

  //ユーザー
  public User: any = {
    Name : '',
    Weight: 0,
    Height: 0,
    Stress: true,
    ImageSrc: '',
    Id: 0
  }

  //表示するコンポーネントをbooleanで制御
  public ListView: boolean = true;
  public TopAdmin: boolean = false;
  public Setting: boolean = false;

  //セッションストレージからトークンなど一式用意
  constructor(private authService: RequestService, private router: Router, public cookie: CookieService) {
                //ログイン出来ていないユーザーを通さないようにする
                if (!sessionStorage.getItem('token')) {
                  this.router.navigate(['/']);
                }
                this.FitbitToken = this.cookie.get('access_token');
                this.BackToken = sessionStorage.getItem('token');
                this.User.Name = sessionStorage.getItem('username');
                this.User.Id = sessionStorage.getItem('userid');
                this.User.GroupId = sessionStorage.getItem('GroupId');

 }

 //ngOnInitはページが読み込み終わったら実行、constructorはページを読み込むと同時に
  ngOnInit() {
    this.authService.getProfile(this.FitbitToken).subscribe(
      result => this.setProfile(result),
      error => console.log(error)
    );
  }

  //下３つは表示コンポーネントを変更するメソッド
  Change_Setting(): void {
    this.Setting = true;
    this.ListView = false;
    this.TopAdmin = false;
  }

  Change_TopAdmin(): void {
    this.Setting = false;
    this.ListView = false;
    this.TopAdmin = true;
  }

  Change_ListView(): void {
    this.Setting = false;
    this.ListView = true;
    this.TopAdmin = false;
  }

  //ログアウトの処理。セッションストレージを全て捨てる。これでブラウザバック出来ないようにする
  Change_Logout(): void {
    this.authService.logout(this.BackToken).subscribe(
      result => {
        sessionStorage.clear();
        this.router.navigate(['/']);

      },
      error => console.log(error)
    );
  }

  //左のバーに表示するデータをFitbitから取得
  setProfile(data: any[]): void {
    this.User.Weight = data['user'].weight;
    this.User.Height = data['user'].height;
    this.User.ImageSrc = data['user'].avatar;

    this.authService.putProfile(this.BackToken, data['user'].encodedId, this.FitbitToken).subscribe(
      result => this.GetStress(),
      error => console.log(error)
    );
  }

  //ストレスを取得
  GetStress(): void {
    this.authService.GetStress(this.BackToken).subscribe(
      result => this.enter(result),
      error => console.log(error)
    );
  }

  //出勤をサーバーに伝える
  enter(data:any): void {
    console.log(data);
    this.authService.enter(this.BackToken).subscribe(
      result => '',
      error => console.log(error)
    );
  }
}
