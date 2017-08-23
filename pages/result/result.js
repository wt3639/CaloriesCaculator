//result.js
const app = getApp()
var basic = null
var total = null
var need = null
var prot = null
var fat = null
var cab = null
var height = null
var weight = null
var BMI = null
var heightTemp = null
var weightTemp = null
var userInfo= {}
Page({
  data: {
  // text:"这是一个页面" 
  BMR: '',
  total: '',
  need:'',
  prot:'',
  fat:'',
  cab:'',
  userInfo: {},
  height:'',
  weight:'',
  BMI:'',
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
   BMI = parseInt(options.weight) / (parseInt(options.height) * parseInt(options.height))*10000;
   BMI = BMI.toFixed(1);
  if (options.goal=="muscle") {
     need = (total + parseInt(options.energy));
     prot = parseInt(2.2 * parseInt(options.weight));
     fat = parseInt(need * 0.25 / 9);
     cab = parseInt((need - prot * 4 - fat * 9) / 4);
  } else {
     need = (total - parseInt(options.energy));
     prot = parseInt(2.75 * parseInt(options.weight));
     fat = parseInt(need * 0.2 / 9);
     cab = parseInt((need - prot * 4 - fat * 9) / 4);
  } 
  height = options.height;
  weight = options.weight;
  heightTemp = height;
  weightTemp = weight;  

  this.setData({
    BMR: basic,
    total:total,
    need:need,
    prot:prot,
    fat:fat,
    cab:cab,
    height:height,
    weight:weight,
    BMI:BMI,
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
  if (app.globalData.rpx2px){
    var context = wx.createCanvasContext('firstCanvas')
    context.setFillStyle("#22ade6")
    context.fillRect(app.rpxTopx(10), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
    context.setFillStyle("#39b545")
    context.fillRect(app.rpxTopx(170), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
    context.setFillStyle("#ffaa42")
    context.fillRect(app.rpxTopx(330), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
    context.setFillStyle("#ee5d26")
    context.fillRect(app.rpxTopx(490), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
    context.setFillStyle("#000000")
    context.setFontSize(12);
    context.fillText('18.5', app.rpxTopx(140), app.rpxTopx(80))
    context.fillText('24', app.rpxTopx(310), app.rpxTopx(80))
    context.fillText('27', app.rpxTopx(470), app.rpxTopx(80))
    context.fillText('偏瘦', app.rpxTopx(70), app.rpxTopx(100))
    context.fillText('标准', app.rpxTopx(230), app.rpxTopx(100))
    context.fillText('超重', app.rpxTopx(390), app.rpxTopx(100))
    context.fillText('肥胖', app.rpxTopx(550), app.rpxTopx(100))
    context.setFillStyle('#ffffff')
    context.arc(app.rpxTopx(app.bmiToX(BMI)), app.rpxTopx(50), app.rpxTopx(10), 0, 2 * Math.PI)
    context.fill()
    context.draw()

  }else{
    app.drawReadyCallback = function() {
      var context = wx.createCanvasContext('firstCanvas')
      context.setFillStyle("#22ade6")
      context.fillRect(app.rpxTopx(10), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
      context.setFillStyle("#39b545")
      context.fillRect(app.rpxTopx(170), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
      context.setFillStyle("#ffaa42")
      context.fillRect(app.rpxTopx(330), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
      context.setFillStyle("#ee5d26")
      context.fillRect(app.rpxTopx(490), app.rpxTopx(40), app.rpxTopx(160), app.rpxTopx(20))
      context.setFillStyle("#000000")
      context.setFontSize(12);
      context.fillText('18.5', app.rpxTopx(140), app.rpxTopx(80))
      context.fillText('24', app.rpxTopx(310), app.rpxTopx(80))
      context.fillText('27', app.rpxTopx(470), app.rpxTopx(80))
      context.fillText('偏瘦', app.rpxTopx(70), app.rpxTopx(100))
      context.fillText('标准', app.rpxTopx(230), app.rpxTopx(100))
      context.fillText('超重', app.rpxTopx(390), app.rpxTopx(100))
      context.fillText('肥胖', app.rpxTopx(550), app.rpxTopx(100))
      context.setFillStyle('#ffffff')
      context.arc(app.rpxTopx(app.bmiToX(BMI)), app.rpxTopx(50), app.rpxTopx(10), 0, 2 * Math.PI)
      context.fill()
      context.draw()
    }
  }
  
},
hidePrivate: function (e) {
  console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  if(e.detail.value==true){
    height = '*';
    weight = '*';
    this.setData({
      height:'*',
      weight:'*',
    })
  }else{
    height = heightTemp;
    weight = weightTemp;
    this.setData({
      height: height,
      weight: weight,
    })
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
    + '&cab=' + cab + '&BMI=' + BMI + '&height=' + height + '&weight=' + weight + '&nickName=' + userInfo.nickName + '&avatarUrl=' + userInfo.avatarUrl,
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
},




})

