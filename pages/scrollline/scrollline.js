var wxCharts = require('../util/wxcharts.js');
var app = getApp();
var lineChart = null;
var startPos = null;
var userHistory=null;
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
        for (var i = 0; i < userHistory.length; i++) {
          var unixTimestamp = new Date(userHistory[i].create_at*1000)
          categories.push(unixTimestamp.toLocaleDateString());
          data.push(userHistory[i].weight);
        }
        return {
            categories: categories,
            data: data
        }
    },
    onShow:function(e){
      var that = this;
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
          app.globalData.userHistory = res.data.userList;
          userHistory = app.globalData.userHistory;
          var windowWidth = 320;
          try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
          } catch (e) {
            console.error('getSystemInfoSync failed!');
          }
          var simulationData = that.createSimulationData();
          console.log(simulationData)
          var updateData = {
            categories: simulationData.categories,
            series: [{
              name: '体重1',
              data: simulationData.data,
              format: function (val, name) {
                return val.toFixed(2) + 'kg';
              }
            }],
          }
          lineChart.updateData(updateData);
        }
      })
     
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        userHistory = app.globalData.userHistory;
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: simulationData.categories,
          animation: false,
          series: [{
            name: '体重',
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
            
          },
          width: windowWidth,
          height: 300,
          legend:false,
          dataLabel: true,
          dataPointShape: true,
          enableScroll: true,
          extra: {
            lineStyle: 'curve'
          }
        });
    }
});