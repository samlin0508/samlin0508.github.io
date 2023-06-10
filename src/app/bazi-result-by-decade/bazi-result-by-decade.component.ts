import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { BaZiResponse } from 'src/models/bazi-response';
import { BaZiShiShen } from 'src/models/bazi-shishen';
import { BaZiResult } from 'src/models/bazi-result';
import { ResultElement } from 'src/models/result-element';
import { ECharts } from 'echarts';

@Component({
  selector: 'app-bazi-result-by-decade',
  templateUrl: './bazi-result-by-decade.component.html',
  styleUrls: ['./bazi-result-by-decade.component.css']
})
export class BaziResultByDecadeComponent implements OnInit {

  constructor() { }

  graphChartIntanceOfTianGan: ECharts;
  graphChartIntanceOfDiZhi: ECharts;
  
  optionsOfTianGan = {
    title: {
      text: "天干：",
      left: '3%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: [],
      right: '4%',
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 180,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: []
  };

  optionsOfDiZhi = {
    title: {
      text: "地支：",
      left: '3%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: [],
      right: '4%',
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 180,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: []
  };

  optionsOfWuXingShengKeInTianGan = {
    title: {
      // text: '天干五行流通：',
      left: '3%',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 80,
        roam: false,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 15
        },
        data: [],
        links: [],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ]
  };

  optionsOfWuXingShengKeInDiZhi = {
    title: {
      // text: '地支五行流通：',
      left: '3%',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 80,
        roam: false,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 15
        },
        data: [],
        links: [],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    ]
  };

  @Input() parent: AppComponent = null;

  @Input() baZiResponse: BaZiResponse[] = null;
  allShiShen: string[] = ["財","官","比","食","印"];

  ngOnInit(): void {
    for(let i = 0; i < this.baZiResponse.length ; i++){
      let baZiResponse: BaZiResponse = this.baZiResponse[i];

      if(baZiResponse.baZiResultInTianGan.shiShen == null){
        baZiResponse.baZiResultInTianGan.shiShen = [];
      }

      if(baZiResponse.baZiResultInDiZhi.shiShen == null){
        baZiResponse.baZiResultInDiZhi.shiShen = [];
      }

      this.addMissingShiShen(baZiResponse.baZiResultInTianGan.shiShen);
      this.addMissingShiShen(baZiResponse.baZiResultInDiZhi.shiShen);
    }

    this.prepareLineData(true);
    this.prepareLineData(false);
  }

  private addMissingShiShen(shiShens: BaZiShiShen[]) {
    if (shiShens == null) {
      shiShens = [];
    }

    let shiShenMap: Map<string, BaZiShiShen> = this.transformShiShenAsMap(shiShens);

    this.allShiShen.forEach(function(key: string){
      if(!shiShenMap.has(key)){
        shiShens.push({
          shiShen: key,
          hitPoint: 0,
          hitPointBeforeKe: 0,
          injuried: false
        });
      }
    });
  }

  private transformShiShenAsMap(shiShens: BaZiShiShen[]): Map<string, BaZiShiShen> {
    let shiShenMap = new Map<string, BaZiShiShen>();

    shiShens.forEach(function(shiShen: BaZiShiShen){
      shiShenMap.set(shiShen.shiShen, shiShen);
    });

    return shiShenMap;
  }

  private prepareLineData(isForTianGan: boolean){
    let options = isForTianGan ? this.optionsOfTianGan : this.optionsOfDiZhi;
    let reportType = this.getReportType();
    let startI = 1;

    if(reportType === 2) {
      startI = 2;
    } else if (reportType === 3) {
      startI = 3;
    }

    for(let i = startI ; i < this.baZiResponse.length ; i++){
      let baZiResponse: BaZiResponse = this.baZiResponse[i];
      let hint = this.stringifyKeElementInDayOfBirth(
        isForTianGan,
        this.baZiResponse[0],
        baZiResponse);

      if(reportType === 1) {
        options.xAxis[0].data.push(isForTianGan ?
          baZiResponse.baZiResultInTianGan.elementInDecade + 
          hint : 
          baZiResponse.baZiResultInDiZhi.elementInDecade + 
          hint);
      } else if(reportType === 2) {
        options.xAxis[0].data.push(isForTianGan ?
          baZiResponse.baZiResultInTianGan.elementInYear + 
          hint : 
          baZiResponse.baZiResultInDiZhi.elementInYear + 
          hint);
      } else {
        options.xAxis[0].data.push(isForTianGan ?
          baZiResponse.baZiResultInTianGan.elementInMonth + 
          hint : 
          baZiResponse.baZiResultInDiZhi.elementInMonth + 
          hint);
      }
    }

    if(options.legend["selected"] === undefined) options.legend["selected"] = {};

    let extraInformation = [];

    if(isForTianGan) {
      if(this.baZiResponse[0].baZiResultInTianGan.doesElementInDayOfBirthKeByOthers) {
        extraInformation.push("本命日主受剋");
      }
    } else {
      if(this.baZiResponse[0].baZiResultInDiZhi.doesElementInDayOfBirthKeByOthers) {
        extraInformation.push("本命日主受剋");
      }
    }

    for(let i = 0 ; i < this.allShiShen.length ; i++){
      let specifiedShiShen: string = this.allShiShen[i];
      let specifiedShiShenInStaticElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
        this.baZiResponse[0].baZiResultInTianGan.shiShen : 
        this.baZiResponse[0].baZiResultInDiZhi.shiShen)
        .get(specifiedShiShen);

      if(reportType === 1) {
        // if(specifiedShiShenInStaticElements.hitPoint < specifiedShiShenInStaticElements.hitPointBeforeKe) {
        //   extraInformation.push(`本命${specifiedShiShen}(${specifiedShiShenInStaticElements.hitPointBeforeKe - specifiedShiShenInStaticElements.hitPoint})受傷`);
        // }

        let series = {
          name: '本命' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInStaticElements.hitPoint, 
            specifiedShiShenInStaticElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[0].baZiResultInTianGan : this.baZiResponse[0].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);
  
        series = {
          name: '大運' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          let baZiResponse: BaZiResponse = this.baZiResponse[i];
          let specifiedShiShenInDynamicElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
            baZiResponse.baZiResultInTianGan.shiShen : 
            baZiResponse.baZiResultInDiZhi.shiShen
            ).get(specifiedShiShen);
          series.data.push([
            x, 
            specifiedShiShenInDynamicElements.hitPoint, 
            specifiedShiShenInDynamicElements.injuried ? "X" : "",
            isForTianGan ? baZiResponse.baZiResultInTianGan : baZiResponse.baZiResultInDiZhi]);
        }
  
        options.legend.data.push(series.name);
        options.series.push(series);

        if(specifiedShiShen === '財') {
          options.legend["selected"]['本命' + specifiedShiShen] = true;
          options.legend["selected"]['大運' + specifiedShiShen] = true;
        } else {
          options.legend["selected"]['本命' + specifiedShiShen] = false;
          options.legend["selected"]['大運' + specifiedShiShen] = false;
        }
      } else if(reportType === 2) {
        // if(specifiedShiShenInStaticElements.hitPoint < specifiedShiShenInStaticElements.hitPointBeforeKe) {
        //   extraInformation.push(`本命${specifiedShiShen}(${specifiedShiShenInStaticElements.hitPointBeforeKe - specifiedShiShenInStaticElements.hitPoint})受傷`);
        // }

        let series = {
          name: '本命' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInStaticElements.hitPoint, 
            specifiedShiShenInStaticElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[0].baZiResultInTianGan : this.baZiResponse[0].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);

        let specifiedShiShenInDecadeElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
          this.baZiResponse[1].baZiResultInTianGan.shiShen : 
          this.baZiResponse[1].baZiResultInDiZhi.shiShen)
          .get(specifiedShiShen);
        series = {
          name: '大運' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInDecadeElements.hitPoint, 
            specifiedShiShenInDecadeElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[1].baZiResultInTianGan : this.baZiResponse[1].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);

        series = {
          name: '流年' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          let baZiResponse: BaZiResponse = this.baZiResponse[i];
          let specifiedShiShenInDynamicElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
            baZiResponse.baZiResultInTianGan.shiShen : 
            baZiResponse.baZiResultInDiZhi.shiShen
            ).get(specifiedShiShen);
          series.data.push([
            x, 
            specifiedShiShenInDynamicElements.hitPoint, 
            specifiedShiShenInDynamicElements.injuried ? "X" : "",
            isForTianGan ? baZiResponse.baZiResultInTianGan : baZiResponse.baZiResultInDiZhi]);
        }
  
        options.legend.data.push(series.name);
        options.series.push(series);

        if(specifiedShiShen === '財') {
          options.legend["selected"]['本命' + specifiedShiShen] = true;
          options.legend["selected"]['大運' + specifiedShiShen] = true;
          options.legend["selected"]['流年' + specifiedShiShen] = true;
        } else {
          options.legend["selected"]['本命' + specifiedShiShen] = false;
          options.legend["selected"]['大運' + specifiedShiShen] = false;
          options.legend["selected"]['流年' + specifiedShiShen] = false;
        }
      } else if(reportType === 3) {
        // if(specifiedShiShenInStaticElements.hitPoint < specifiedShiShenInStaticElements.hitPointBeforeKe) {
        //   extraInformation.push(`本命${specifiedShiShen}(${specifiedShiShenInStaticElements.hitPointBeforeKe - specifiedShiShenInStaticElements.hitPoint})受傷`);
        // }

        let series = {
          name: '本命' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: false,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInStaticElements.hitPoint, 
            specifiedShiShenInStaticElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[0].baZiResultInTianGan : this.baZiResponse[0].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);

        let specifiedShiShenInDecadeElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
          this.baZiResponse[1].baZiResultInTianGan.shiShen : 
          this.baZiResponse[1].baZiResultInDiZhi.shiShen)
          .get(specifiedShiShen);
        series = {
          name: '大運' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: false,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInDecadeElements.hitPoint, 
            specifiedShiShenInDecadeElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[1].baZiResultInTianGan : this.baZiResponse[1].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);

        let specifiedShiShenInYearElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
          this.baZiResponse[2].baZiResultInTianGan.shiShen : 
          this.baZiResponse[2].baZiResultInDiZhi.shiShen)
          .get(specifiedShiShen);
        series = {
          name: '流年' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: false,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          }
        };
  
        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          series.data.push([
            x, 
            specifiedShiShenInYearElements.hitPoint, 
            specifiedShiShenInYearElements.injuried ? "X" : "",
            isForTianGan ? this.baZiResponse[2].baZiResultInTianGan : this.baZiResponse[2].baZiResultInDiZhi]);
        }

        options.legend.data.push(series.name);
        options.series.push(series);

        series = {
          name: '流月' + specifiedShiShen,
          type: 'line',
          // areaStyle: { normal: {} },
          smooth: true,
          data: [],
          label: {
            show: true,
            formatter: '{@value}'
          },
        };

        for(let i = startI, x = 0 ; i < this.baZiResponse.length ; i++, x++){
          let baZiResponse: BaZiResponse = this.baZiResponse[i];
          let specifiedShiShenInDynamicElements: BaZiShiShen = this.transformShiShenAsMap(isForTianGan ? 
            baZiResponse.baZiResultInTianGan.shiShen : 
            baZiResponse.baZiResultInDiZhi.shiShen
            ).get(specifiedShiShen);
          series.data.push([
            x, 
            specifiedShiShenInDynamicElements.hitPoint, 
            specifiedShiShenInDynamicElements.injuried ? "X" : "", 
            isForTianGan ? baZiResponse.baZiResultInTianGan : baZiResponse.baZiResultInDiZhi]);
        }
  
        options.legend.data.push(series.name);
        options.series.push(series);

        if(specifiedShiShen === '財') {
          options.legend["selected"]['本命' + specifiedShiShen] = true;
          options.legend["selected"]['大運' + specifiedShiShen] = true;
          options.legend["selected"]['流年' + specifiedShiShen] = true;
          options.legend["selected"]['流月' + specifiedShiShen] = true;
        } else {
          options.legend["selected"]['本命' + specifiedShiShen] = false;
          options.legend["selected"]['大運' + specifiedShiShen] = false;
          options.legend["selected"]['流年' + specifiedShiShen] = false;
          options.legend["selected"]['流月' + specifiedShiShen] = false;
        }
      }
    }

    if(isForTianGan) {
      options.title.text = `天干：${extraInformation.join()}`;
    } else {
      options.title.text = `地支：${extraInformation.join()}`;
    }
  }

  private getReportType() :number {
    if(this.parent.baZiGrid.baZiGridInTianGan.elementInDecade &&
      this.parent.baZiGrid.baZiGridInTianGan.elementInYear &&
      this.parent.baZiGrid.baZiGridInTianGan.elementInMonth &&
      this.parent.baZiGrid.baZiGridInDiZhi.elementInDecade &&
      this.parent.baZiGrid.baZiGridInDiZhi.elementInYear &&
      this.parent.baZiGrid.baZiGridInDiZhi.elementInMonth){
        return 3;
    } else if(this.parent.baZiGrid.baZiGridInTianGan.elementInDecade &&
      this.parent.baZiGrid.baZiGridInTianGan.elementInYear &&
      this.parent.baZiGrid.baZiGridInDiZhi.elementInDecade &&
      this.parent.baZiGrid.baZiGridInDiZhi.elementInYear){
        return 2;
      } else {
      return 1;
    }
  }

  private stringifyKeElementInDayOfBirth(
    isForTianGan: boolean,
    baZiResponseInStatic: BaZiResponse,
    baZiResponseInDynamic: BaZiResponse) :string {
    let baZiResultInStatic: BaZiResult = baZiResponseInStatic.baZiResultInTianGan;
    let baZiResultInDynamic: BaZiResult = baZiResponseInDynamic.baZiResultInTianGan;

    if(!isForTianGan) {
      baZiResultInStatic = baZiResponseInStatic.baZiResultInDiZhi;
      baZiResultInDynamic = baZiResponseInDynamic.baZiResultInDiZhi
    }

    if(baZiResultInStatic.doesElementInDayOfBirthKeByOthers) {
      if(baZiResultInDynamic.doesElementInDayOfBirthKeByOthers) {
        if(baZiResultInDynamic.countOfElementKeElementInDayOfBirth === baZiResultInStatic.countOfElementKeElementInDayOfBirth) {
          return "(本命日主受剋)";
        } else if(baZiResultInDynamic.countOfElementKeElementInDayOfBirth > baZiResultInStatic.countOfElementKeElementInDayOfBirth) {
          return "(本命日主受剋-加重)";
        } else {
          return "(本命日主受剋-減輕)";
        }
      } else {
        return "(本命日主受剋脫困)";
      }
    } else {
      if(baZiResultInDynamic.doesElementInDayOfBirthKeByOthers) {
        return "(日主受剋)";
      }
    }

    return "";
  }

  onGraphChartIntanceOfTianGanInit(echartsIntance) {
    this.graphChartIntanceOfTianGan = echartsIntance;
  }

  onGraphChartIntanceOfDiZhiInit(echartsIntance) {
    this.graphChartIntanceOfDiZhi = echartsIntance;
  }

  onChartEventOfTianGan(event: any, type: string) {
    let baZiResult: BaZiResult = event.data[3];
    let nodes: any[] = [];
    let links: any[] = [];

    if(baZiResult.resultOfElementInMonthKeElementInYear !== null) {
      this.prepareGraphData(
        baZiResult.resultOfElementInMonthKeElementInYear, 
        nodes, 
        links, 
        1, 
        1,
        true,
        "1 ");
    }

    this.prepareGraphData(
      baZiResult.headOfWuXingShengKe, 
      nodes, 
      links, 
      nodes.length + 1, 
      1,
      true,
      "2 ");

    if(baZiResult.elementKeElementInDayOfBirth !== null && baZiResult.elementKeElementInDayOfBirthDueToElementInMonthKeElementInYear === false) {
      this.prepareGraphData(
        baZiResult.elementKeElementInDayOfBirth, 
        nodes, 
        links, 
        undefined, 
        undefined,
        false,
        "2 ");
    }

    if(baZiResult.restOfWuXingShengKe !== null) {
      nodes.push({
        name: this.getNodeName(baZiResult.restOfWuXingShengKe, "3 "),
        x: nodes.sort((node1, node2) => node1.x > node2.x ? -1 : 1)[0].x + (1 * 2),
        y: 1
      });
    }

    this.optionsOfWuXingShengKeInTianGan.series[0].data = [...nodes];
    this.optionsOfWuXingShengKeInTianGan.series[0].links = [...links];
    this.graphChartIntanceOfTianGan.setOption({
      series: this.optionsOfWuXingShengKeInTianGan.series
    });
  }

  onChartEventOfDiZhi(event: any, type: string) {
    let baZiResult: BaZiResult = event.data[3];
    let nodes: any[] = [];
    let links: any[] = [];

    if(baZiResult.resultOfElementInMonthKeElementInYear !== null) {
      this.prepareGraphData(
        baZiResult.resultOfElementInMonthKeElementInYear, 
        nodes, 
        links, 
        1, 
        1,
        true,
        "1 ");
    }

    this.prepareGraphData(
      baZiResult.headOfWuXingShengKe, 
      nodes, 
      links, 
      nodes.length + 1, 
      1,
      true,
      "2 ");

    if(baZiResult.restOfWuXingShengKe !== null) {
      nodes.push({
        name: this.getNodeName(baZiResult.restOfWuXingShengKe, "3 "),
        x: nodes.sort((node1, node2) => node1.x > node2.x ? -1 : 1)[0].x + (1 * 2),
        y: 1
      });
    }

    this.optionsOfWuXingShengKeInDiZhi.series[0].data = [...nodes];
    this.optionsOfWuXingShengKeInDiZhi.series[0].links = [...links];
    this.graphChartIntanceOfDiZhi.setOption({
      series: this.optionsOfWuXingShengKeInDiZhi.series
    });
  }

  private prepareGraphData(
    resultElement: ResultElement, 
    nodes: any[], 
    links :any[], 
    x: number, 
    y: number,
    addNode: boolean,
    prefixOfNodeName: string) {
    let sourceNodeName: string = this.getNodeName(resultElement, prefixOfNodeName);

    if(addNode) {
      nodes.push({
        name: sourceNodeName,
        x: x * 2,
        y: y
      });
    }

    if(resultElement.resultElementISheng !== null) {
      let targetNodeName: string = this.getNodeName(resultElement.resultElementISheng, prefixOfNodeName);
      let resultElementNode : any = this.transformNodesAsMap(nodes).get(sourceNodeName);
      let resultElementLinkWith: any[] = this.transformLinksAsMap(links).get(sourceNodeName);
      let countOfResultElementLinkWith: number = resultElementLinkWith === undefined ? 0 : resultElementLinkWith.length;

      links.push({
        source: sourceNodeName,
        target: targetNodeName,
        label: {
          show: true,
          formatter: '生'
        },
        lineStyle: {
          curveness: 0
        }
      });

      this.prepareGraphData(
        resultElement.resultElementISheng,
        nodes,
        links,
        (resultElementNode.x / 2) + 1,
        y = countOfResultElementLinkWith + 1,
        true,
        prefixOfNodeName);
    }

    if(resultElement.resultElementIKe !== null) {
      let targetNodeName: string = this.getNodeName(resultElement.resultElementIKe, prefixOfNodeName);
      let resultElementNode : any = this.transformNodesAsMap(nodes).get(sourceNodeName);
      let resultElementLinkWith: any[] = this.transformLinksAsMap(links).get(sourceNodeName);
      let countOfResultElementLinkWith: number = resultElementLinkWith === undefined ? 0 : resultElementLinkWith.length;

      links.push({
        source: sourceNodeName,
        target: targetNodeName,
        label: {
          show: true,
          formatter: '剋'
        },
        lineStyle: {
          curveness: 0
        }
      });

      this.prepareGraphData(
        resultElement.resultElementIKe,
        nodes,
        links,
        (resultElementNode.x / 2) + 1,
        y = countOfResultElementLinkWith + 1,
        true,
        prefixOfNodeName);
    }
  }

  private getNodeName(
    resultElement: ResultElement,
    prefixOfNodeName: string): string {
    let nodeName: string = resultElement.mainElement.name;
    let appearsAt: string = "";

    switch(resultElement.mainElement.appearsAt) {
      case 0:
        appearsAt = "時:";
        break;
      case 1:
        appearsAt = "日:";
        break;
      case 2:
        appearsAt = "月:";
        break;
      case 3:
        appearsAt = "年:";
        break;
      case 4:
        appearsAt = "大運:";
        break;
      case 5:
        appearsAt = "流年:";
        break;
      case 6:
        appearsAt = "流月:";
        break;
    }

    nodeName = `${prefixOfNodeName}${appearsAt}${resultElement.mainElement.name}`

    let namesOfAttachedElements: string[] = [];

    resultElement.attachedElements.forEach((value, index) => {
      namesOfAttachedElements.push(value.name);
    });

    if(namesOfAttachedElements.length > 0) {
      nodeName += `(${namesOfAttachedElements.join()})`;
    }

    return nodeName;
  }

  private transformNodesAsMap(nodes: any[]): Map<string, any> {
    let nodesMap = new Map<string, any>();

    nodes.forEach(function(node: any) {
      if(!nodesMap.has(node.name)) {
        nodesMap.set(node.name, node);
      }
    });

    return nodesMap;
  }

  private transformLinksAsMap(links: any[]): Map<string, any[]> {
    let linksMap = new Map<string, any[]>();

    links.forEach(function(link: any) {
      if(!linksMap.has(link.source)) {
        linksMap.set(link.source, []);
      }

      linksMap.get(link.source).push(link);
    });

    return linksMap;
  }
}
