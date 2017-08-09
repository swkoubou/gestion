import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestService } from './../request.service';
import { CookieService } from 'angular2-cookie/core';

declare var google: any;

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  // トークンやユーザデータを格納
  public User: string = '';
  public Token: string = '';
  public BackToken: string = '';
  public WorkTime: any = [];

  // グラフデータを格納
  public barChartType: string = 'bar';
  public lineChartType: string = 'line';

  public barChartLegend: boolean = true;

  public lineChartData: Array<any> = [{ data: [], label: '心拍数' }];
  public lineChartLabels: Array<any> = [];

  public barChartData: Array<any> = [{ data: [], label: '歩数' }];
  public barChartLabels: Array<any> = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  constructor(private authService: RequestService, private router: Router, public cookie: CookieService, public element: ElementRef) { }

  // １週間の心拍数を計測する
  public WeekHeartRate(data: string[]): void {
    this.lineChartData = [];
    for (let i = 0; i < 7; i++) {
      if (!data['activities-heart'][i]['value'].restingHeartRate) {
        this.lineChartData.push(0);
      } else {
        this.lineChartData.push(parseInt(data['activities-heart'][i]['value'].restingHeartRate, 10)); // 10進数で定義
      }
      this.lineChartLabels.push(data['activities-heart'][i].dateTime.substr(6));
    }
  }

  // １週間の歩数を格納
  public WeekSteps(data: string[]): void {
    this.barChartData = [];
    for (let i = 0; i < 7; i++) {
      this.barChartData.push(parseInt(data['activities-steps'][i].value, 10));
      this.barChartLabels.push(data['activities-steps'][i].dateTime.substr(6));
    }
  }

  // 勤務時間を計測
  public WorkTimes(data: any[]): void {
    const date = [];
    for (let i = 0; i < data.length - 1; i++) {
      data[i].id =  Date.parse(data[i].end) - Date.parse(data[i].begin);
      date[i] = new Date(data[i].begin);
      date[i].setHours(date[i].getHours() - 9);
      data[i].id = data[i].id / 1000 / 3600;
      this.WorkTime[i] = '';
      this.WorkTime[i] = [new Date(date[i].getFullYear(),date[i].getMonth(),date[i].getDate()),  parseFloat(data[i].id.toFixed(2))];
    }
    google.charts.setOnLoadCallback(() => this.drawChart());
  }

  // ゼロ埋めをする
  public zero(num) {
    num += '';
    if (num.length === 1) {
      num = '0' + num;
    }
    return num;
  }

  // 今日の日付を取得
  public getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.zero(date.getMonth() + 1);
    const day = this.zero(date.getDate());
    return year + '-' + month + '-' + day;
  }


  ngOnInit() {
    // トークンを取得
    this.Token = this.cookie.get('access_token');
    this.BackToken = sessionStorage.getItem('token');

    const today = this.getToday();

    // 勤務時間を取得
    this.authService.getMonth(this.BackToken, today).subscribe(
      hosu => this.WorkTime(hosu),
      error => console.log(error)
    );
  }

  // カレンダーチャートを描画
  drawChart() {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows(this.WorkTime);

    const options = {
      calendar: { cellSize: 14 },
    };

     const chart = new google.visualization.Calendar(this.element.nativeElement.querySelector('.calender'));
     chart.draw(dataTable, options);
  }
}
