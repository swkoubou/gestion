import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public LineChartType:string = 'line';
  public barChartLegend:boolean = false;
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 40, 11], label: '歩数'}
  ];

}
