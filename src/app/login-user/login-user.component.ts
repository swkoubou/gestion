import { Component, OnInit } from '@angular/core';
import { Router,} from '@angular/router';
import { RequestService} from '../request.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private router:Router,
              private request:RequestService) { }

  ngOnInit() {
  }

  MailAdress:string;
  PassWord:string;
  Error:string = '';

  UserLogin():void{
    if(!this.MailAdress || !this.PassWord){
      this.Error = 'ユーザーネームかパスワードが正しくありません';
      return;
    }
    window.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228Q3J&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fboot&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';

    /*this.authService.login(this.username,this.pass).subscribe(
      (result:any) => {
        sessionStorage.setItem('backend_token',result.access_token);
        sessionStorage.setItem('username',result.username);
        window.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2288HW&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fboot&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
        //'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2288HW&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fboot&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
        // 規制時用
        // window.location.href = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=228965&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fboot&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
      },
      error => this.fal(error)
    );*/
  }

  Back_Page():void{
  this.router.navigate(['/']);
  }
}
