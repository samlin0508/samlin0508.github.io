import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { BaZiResponse } from 'src/models/bazi-response';
import { BaziExpertService } from 'src/services/bazi-expert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bazi-grid',
  templateUrl: './bazi-grid.component.html',
  styleUrls: ['./bazi-grid.component.css']
})
export class BaziGridComponent implements OnInit {

  elementNamesInTianGan: string[] = ["", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  elementNamesInDiZhi: string[] = ["", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  constructor(
    private baziExpertService: BaziExpertService,
    private route: ActivatedRoute) {}

  @Input() parent: AppComponent = null;

  explore(): void {
    this.baziExpertService.explore(this.parent.baZiGrid).subscribe((data: BaZiResponse[])=>{
      this.parent.baZiResponses = [];
      this.parent.baZiResponses.push(data);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(window.location.href.indexOf('?') !== -1 && Object.keys(params).length === 0) return;

      if(params.g !== undefined) {
        this.parent.baZiGrid.gender = +params.g;
      }

      if(params.t1 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInHourOfBirth = params.t1;
      }

      if(params.t2 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInDayOfBirth = params.t2;
      }

      if(params.t3 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInMonthOfBirth = params.t3;
      }

      if(params.t4 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInYearOfBirth = params.t4;
      }

      if(params.t5 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInDecade = params.t5;
      }

      if(params.t6 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInYear = params.t6;
      }

      if(params.t7 !== undefined) {
        this.parent.baZiGrid.baZiGridInTianGan.elementInMonth = params.t7;
      }

      if(params.d1 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInHourOfBirth = params.d1;
      }

      if(params.d2 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInDayOfBirth = params.d2;
      }

      if(params.d3 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInMonthOfBirth = params.d3;
      }

      if(params.d4 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInYearOfBirth = params.d4;
      }

      if(params.d5 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInDecade = params.d5;
      }

      if(params.d6 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInYear = params.d6;
      }

      if(params.d7 !== undefined) {
        this.parent.baZiGrid.baZiGridInDiZhi.elementInMonth = params.d7;
      }

      this.explore();
    });
  }
}
