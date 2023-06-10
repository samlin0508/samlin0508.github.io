import { Component } from '@angular/core';
import { BaZiResponse } from 'src/models/bazi-response';
import { ClipboardService } from 'ngx-clipboard';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "BaZiExpert";

  baZiGrid = {
    gender: 0,
    baZiGridInTianGan: {
      typeOfTianGanDiZhi: 0,
      elementInHourOfBirth: "丁",
      elementInDayOfBirth: "丙",
      elementInMonthOfBirth: "乙",
      elementInYearOfBirth: "甲",
      elementInDecade: "",
      elementInYear: "",
      elementInMonth: ""
    },
    baZiGridInDiZhi: {
      typeOfTianGanDiZhi: 1,
      elementInHourOfBirth: "卯",
      elementInDayOfBirth: "寅",
      elementInMonthOfBirth: "丑",
      elementInYearOfBirth: "子",
      elementInDecade: "",
      elementInYear: "",
      elementInMonth: "寅"
    }
  };

  baZiResponses: BaZiResponse[][] = [];

  constructor(
    private clipboardService: ClipboardService,
  ) { }

  copyUrl() {
    this.clipboardService.copy(`${environment.application.baseUrl}?g=${this.baZiGrid.gender}&t1=${this.baZiGrid.baZiGridInTianGan.elementInHourOfBirth}&t2=${this.baZiGrid.baZiGridInTianGan.elementInDayOfBirth}&t3=${this.baZiGrid.baZiGridInTianGan.elementInMonthOfBirth}&t4=${this.baZiGrid.baZiGridInTianGan.elementInYearOfBirth}&t5=${this.baZiGrid.baZiGridInTianGan.elementInDecade}&t6=${this.baZiGrid.baZiGridInTianGan.elementInYear}&t7=${this.baZiGrid.baZiGridInTianGan.elementInMonth}&d1=${this.baZiGrid.baZiGridInDiZhi.elementInHourOfBirth}&d2=${this.baZiGrid.baZiGridInDiZhi.elementInDayOfBirth}&d3=${this.baZiGrid.baZiGridInDiZhi.elementInMonthOfBirth}&d4=${this.baZiGrid.baZiGridInDiZhi.elementInYearOfBirth}&d5=${this.baZiGrid.baZiGridInDiZhi.elementInDecade}&d6=${this.baZiGrid.baZiGridInDiZhi.elementInYear}&d7=${this.baZiGrid.baZiGridInDiZhi.elementInMonth}`);
  }
}