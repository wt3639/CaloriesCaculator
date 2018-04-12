var wxCharts = require('../util/wxcharts.js');
var app = getApp();
var lineChart = null;
var startPos = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
        lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
        lineChart.scrollEnd(e);
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });        
    },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 20; i++) {
            categories.push('201620162-' + (i + 1));
            data.push(Math.random()*(20-10)+10);
        }
        return {
            categories: categories,
            data: data
        }
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        wx.request({
          url: 'https://www.tomwoo.tk/CounterWebApp/calory/getHistory',
          data: {
            id: app.globalData.openid,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
      
          }
        })
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: false,
            series: [{
                name: '体重1',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + 'kg';
                }
            }],
            xAxis: {
                disableGrid: false
            },
            yAxis: {
                title: '体重 (kg)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 300,
            dataLabel: true,
            dataPointShape: true,
            enableScroll: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});