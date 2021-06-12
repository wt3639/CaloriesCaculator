import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var userHistory = null;
const db = wx.cloud.database({
  env: 'calories-webtest-efd9c7'
})

Page({
  onShareAppMessage: res => {
    return {
      title: '热量摄入计算器',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onShow:function(){
    wx.showLoading({
      title: '载入中',
    })
    var that = this;
    const _ = db.command
    db.collection('userinfo').where(_.or([
      {
        _openid: _.eq(app.globalData.openid),
    },
    {
      openid: _.eq(app.globalData.openid),
    }
    ]))
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          app.globalData.userHistory = res.data;
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
          var option = {
            /*
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                          type: 'line',
                          axis:'x',
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {
                          color: '#000'
                        },
                        position: function (pos, params, el, elRect, size) {
                          var obj = { top: 10 };
                          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                          return obj;
                        },
                        extraCssText: 'width: 170px'
                      },
                      
                    */
            grid: {
              top: '12%',
              left: '1%',
              right: '10%',
              containLabel: true
            },

            xAxis: {
              type: 'category',
              data: simulationData.categories,

            },
            yAxis: {
              min: function (value) {
                return value.min - 8;
              },
              type: 'value',
              name: '体重(kg)'
            },
            dataZoom: [
              {
                type: 'inside',
                startValue: simulationData.categories.length - 5,
                endValue: simulationData.categories.length - 1,
                filterMode: 'empty',
                xAxisIndex: [0]
              },
            ],
            series: [{
              name: '体重',
              type: 'line',
              data: simulationData.data,
              smooth: true,
              label: {
                show: true,
                fontSize: 15,

              },
            }]
          };
          that.ecComponent = that.selectComponent('#mychart-dom-bar');
          that.ecComponent.init((canvas, width, height) => {
            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(option);

            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            that.chart = chart;

            that.setData({
              isLoaded: true,
              isDisposed: false
            });

            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
          });
          wx.hideLoading()
        }
      })
    wx.request({
      url: 'https://www.tomwoo.tk/CounterWebApp/calory/getHistory',
      data: {
        id: app.globalData.openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
//         console.log(res.data)
//         app.globalData.userHistory = res.data.userList;
//         userHistory = app.globalData.userHistory;
//         var windowWidth = 320;
//         try {
//           var res = wx.getSystemInfoSync();
//           windowWidth = res.windowWidth;
//         } catch (e) {
//           console.error('getSystemInfoSync failed!');
//         }
//         var simulationData = that.createSimulationData();
//         console.log(simulationData)
//         var option = {
// /*
//           tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//               type: 'line',
//               axis:'x',
//             },
//             backgroundColor: 'rgba(245, 245, 245, 0.8)',
//             borderWidth: 1,
//             borderColor: '#ccc',
//             padding: 10,
//             textStyle: {
//               color: '#000'
//             },
//             position: function (pos, params, el, elRect, size) {
//               var obj = { top: 10 };
//               obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
//               return obj;
//             },
//             extraCssText: 'width: 170px'
//           },
          
//         */
//           grid: {
//             top: '12%',
//             left: '1%',
//             right: '10%',
//             containLabel: true
//           },

//           xAxis: {
//             type: 'category',
//             data: simulationData.categories,
           
//           },
//           yAxis: {
//             min: function(value){
//               return value.min -8;
//             },
//             type: 'value',
//             name:'体重(kg)'
//           },
//           dataZoom: [
//             {
//               type: 'inside',
//               startValue: simulationData.categories.length - 5,
//               endValue: simulationData.categories.length-1,
//               filterMode: 'empty',
//               xAxisIndex: [0] 
//             },
//           ],
//           series: [{
//             name: '体重',
//             type: 'line',
//             data: simulationData.data,
//             smooth:true,
//             label:{
//               show:true,
//               fontSize:15,

//             },
//           }]
//         };
//         that.ecComponent = that.selectComponent('#mychart-dom-bar');
//         that.ecComponent.init((canvas, width, height) => {
//           // 获取组件的 canvas、width、height 后的回调函数
//           // 在这里初始化图表
//           const chart = echarts.init(canvas, null, {
//             width: width,
//             height: height
//           });
//           chart.setOption(option);

//           // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
//           that.chart = chart;

//           that.setData({
//             isLoaded: true,
//             isDisposed: false
//           });

//           // 注意这里一定要返回 chart 实例，否则会影响事件处理等
//           return chart;
//         });
//           wx.hideLoading()
       }
    })

  

  },
  onReady: function () {
    // 获取组件

  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true 
    },
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < userHistory.length; i++) {
      var unixTimestamp = new Date(userHistory[i].updateAt * 1000)
      //console.log(unixTimestamp.getMonth())
      //categories.push([unixTimestamp.getMonth()+1,unixTimestamp.getDate()].join('/'));
      categories.push(userHistory[i].create_date.toLocaleDateString().substring(5));
      data.push(userHistory[i].weight);
    }
    return {
      categories: categories,
      data: data
    }
  },
});
