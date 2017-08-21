//result.js
const app = getApp()
var basic
var total
var need
var prot
var fat
var cab
var userInfo= {}
Page({
  data: {
  // text:"这是一个页面" 
  BMI: '',
  total: '',
  need:'',
  prot:'',
  fat:'',
  cab:'',
  userInfo: {},
}, 

onLoad: function(options) {
  // 页面初始化 options为页面跳转所带来的参数 
  var si
  if(options.sex=='male'){
     basic = parseInt(90 + 4.8 * parseInt(options.height) + 13.4 * parseInt(options.weight) - 5.7 * parseInt(options.age))
  }
  else{
     basic = parseInt(450 + 3.1 * parseInt(options.height) + 9.2 * parseInt(options.weight) - 4.3 * parseInt(options.age))
  }
  switch(options.sportIndex){
    case '0': si = 1.2;break
    case '1': si = 1.375;break
    case '2': si = 1.55;break
    case '3': si = 1.725;break
    case '4': si = 1.9;break
  }
   total = parseInt(basic * si + parseInt(options.aerobic));
  if (options.goal=="muscle") {
     need = (total + parseInt(options.energy));
     prot = parseInt(2.2 * parseInt(options.weight));
     fat = parseInt(need * 0.25 / 8);
     cab = parseInt((need - prot * 4 - fat * 8) / 4);
  } else {
     need = (total - parseInt(options.energy));
     prot = parseInt(2.75 * parseInt(options.weight));
     fat = parseInt(need * 0.2 / 8);
     cab = parseInt((need - prot * 4 - fat * 8) / 4);
  } 

  
                 
  this.setData({
    BMI: basic,
    total:total,
    need:need,
    prot:prot,
    fat:fat,
    cab:cab,
  })

  if (app.globalData.userInfo) {
    this.setData({
      userInfo: app.globalData.userInfo,
     
    })
    userInfo = app.globalData.userInfo;
    console.log(userInfo);
  } else {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      this.setData({
        userInfo: res.userInfo,
        
      })
      userInfo = res.userInfo;
      console.log(userInfo);
    }
  }
},
onShareAppMessage: function (res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '我的热量摄入表',
    path: '/pages/forward/forward?basic=' + basic + '&total=' + total + '&need=' + need + '&prot=' + prot + '&fat=' + fat
    + '&cab=' + cab + '&nickName=' + userInfo.nickName + '&avatarUrl=' + userInfo.avatarUrl,
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
}

})

