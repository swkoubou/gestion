import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.css']
})
export class BootComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public cookie: CookieService) { }

  // アクセストークンをクッキーに格納する
  ngOnInit() {
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

}
