// /<reference path='/node_modules/@types/d3-selection/index.d.ts' />
import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { RequestService } from '../request.service'
@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  public data = [];
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public LineChartType = 'line';
  public barChartLegend = false;
  public barChartData: any[] = [{data: [65, 59, 80, 81, 56, 40, 11], label: '歩数'}];
  public width: number; public height: number; public cellSize: number;

  constructor(public api: RequestService, private container: ElementRef) {
    container.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit() {
    this.getData();
  }

  // http://bl.ocks.org/benlyall/b237f16dda3125423130 <=　参考

  getData() {
    this.api.testGet()
      .subscribe(
        response => {
          this.data = response;
          console.log(this.data);
        },
        err => console.log(err),
        () => {}
      );
  }
  createCalender() {
    const width = 960, height = 136, cellSize = 17;
    const day = d3.time.format('%w'), week = d3.time.format('%U'), percent = d3.format('.1%'), format = d3.time.format('%Y-%m-%d');

    const color = d3.scale.category10();
    const dateParse = d3.time.format('%m/%d/%Y');

    const svg = d3.select(this.container.nativeElement.querySelector('calender')).selectAll('svg')
        .data(d3.range(2010, 2013))
      .enter().append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'RdYlGn')
      .append('g')
        .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

    svg.append('text')
        .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
        .style('text-anchor', 'middle')
        .text(function(d) { return d; });

    const rect = svg.selectAll('.day')
        .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append('rect')
        .attr('class', 'day')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) { return week(d) * cellSize; })
        .attr('y', function(d) { return day(d) * cellSize; })
        .datum(format);

    rect.append('title')
        .text(function(d) { return d; });

    svg.selectAll('.month')
        .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append('path')
        .attr('class', 'month')
        .attr('d', monthPath);

    d3.json(this.data, function(error, data) {
      data.forEach(function(d) {
        d.dd = format(dateParse.parse(d.date));
    });
      const nest = d3.nest()
        .key(function(d) { return d.dd; })
        .map(data);

      color.domain(d3.set(data.map(function(d) { return d.category; })).values());

      rect.filter(function(d) { return d in nest; })
          .attr('class', function(d) { return 'day'; })
          .style('fill', function(d) { return color(nest[d][0].category); })
        .select('title')
          .text(function(d) { return d + ': ' + nest[d][0].city; });
    });

    function monthPath(t0) {
      const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
          d0 = +day(t0), w0 = +week(t0),
          d1 = +day(t1), w1 = +week(t1);
      return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize
          + 'H' + w0 * cellSize + 'V' + 7 * cellSize
          + 'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize
          + 'H' + (w1 + 1) * cellSize + 'V' + 0
          + 'H' + (w0 + 1) * cellSize + 'Z';
    }
  }

}
