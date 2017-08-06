import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params}  from '@angular/router';
import { RequestService} from './../request.service';
import {CookieService} from 'angular2-cookie/core';

declare var google: any;

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  User:string = "";
  Token:string ="";

  public barChartType:string = 'bar';
  public lineChartType:string = 'line';

  public barChartLegend:boolean = true;

  public lineChartData:Array<any> = [{data:[], label:"心拍数"}];
  public lineChartLabels:Array<any> =[];

  public barChartData:Array<any> = [{data:[], label:"歩数"}];
  public barChartLabels:Array<any> =[];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  constructor(private authService:RequestService,
              private router:Router,
              public cookie: CookieService,
              public element: ElementRef) { }

  public WeekHeartRate(data:string[]):void{
    this.lineChartData = [];
    for(var i = 0;i<7;i++){
      if(!data["activities-heart"][i]["value"].restingHeartRate){
        this.lineChartData.push(0);
      }else{
        this.lineChartData.push(parseInt(data["activities-heart"][i]["value"].restingHeartRate));
      }
      this.lineChartLabels.push(data["activities-heart"][i].dateTime.substr(6));
    }
  }

  public WeekSteps(data:string[]):void{
    this.barChartData = [];
    for(var i = 0;i<7;i++){
      this.barChartData.push(parseInt(data["activities-steps"][i].value));
      this.barChartLabels.push(data["activities-steps"][i].dateTime.substr(6));
    }
  }

  public monthGraph(data:string[]):void {
    var StartTime = data["activities-heart-intraday"]["dataset"]["100"].time;
    var StartSecond = 3600 * (parseInt(StartTime[0]) * 10 + parseInt(StartTime[1])) + 60 * (parseInt(StartTime[3]) * 10 + parseInt(StartTime[4])) + parseInt(StartTime[6]) * 10 + parseInt(StartTime[7]);

    var EndTime = data["activities-heart-intraday"]["dataset"][data["activities-heart-intraday"]["dataset"].length - 1].time;
    var EndSecond = 3600 * (parseInt(EndTime[0]) * 10 + parseInt(EndTime[1])) + 60 * (parseInt(EndTime[3]) * 10 + parseInt(EndTime[4])) + parseInt(EndTime[6]) * 10 + parseInt(EndTime[7]);

    var WorkTime = (EndSecond - StartSecond) / 3600;
    console.log(WorkTime);


  }

  public zero(num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;
  }

  public getToday() {
    var date = new Date();
    let year = date.getFullYear();
    let month = this.zero(date.getMonth() + 1);
    let day = this.zero(date.getDate());
    return year +"-"+ month +"-"+ day;
  }


  ngOnInit() {
    this.Token = this.cookie.get("access_token");
    let today = this.getToday();

    /*this.authService.getWeekHeartRate(this.token, today).subscribe(
      result => this.WeekHeartRate(result),
      error => console.log(error)
    );
    this.authService.getWeekSteps(this.token,today).subscribe(
      hosu => this.WeekSteps(hosu),
      error => console.log(error)
    );*/
    this.authService.getMonth(this.Token,today).subscribe(
      hosu => this.monthGraph(hosu),
      error => console.log(error)
    );
    google.charts.setOnLoadCallback(() => this.drawChart());
  }

  drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows([
            [ new Date(2017, 1, 3), 3 ],
            [ new Date(2017, 2, 5), 38705 ],
            [ new Date(2017, 3, 12), 38210 ],
            [ new Date(2017, 4, 13), 38029 ],
            [ new Date(2017, 5, 19), 38823 ],
            [ new Date(2017, 6, 23), 38345 ],
            [ new Date(2017, 7, 24), 38436 ],
            [ new Date(2017, 7, 30), 38447 ]
    ]);

    var options = {
      calendar: { cellSize: 14 },
    };

         var chart = new google.visualization.Calendar(this.element.nativeElement.querySelector('.calender'));
         chart.draw(dataTable,options);
     }
}
