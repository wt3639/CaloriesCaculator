//result.js
const app = getApp()
var rpx2px = null
Page({
  data: {
    // text:"这是一个页面" 
    BMR: '',
    total: '',
    need: '',
    prot: '',
    fat: '',
    cab: '',
    nickName:'',
    avatarUrl:'',
    BMI:'',
    height:'',
    weight:'',
  },

  onLoad: function (options) {


    this.setData({
      BMR: options.basic,
      total: options.total,
      need: options.need,
      prot: options.prot,
      fat: options.fat,
      cab: options.cab,
      nickName: options.nickName,
      avatarUrl: options.avatarUrl,
      BMI:options.BMI,
      height:options.height,
      weight:options.weight,
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,

      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,

        })
      }
    }
    var res = wx.getSystemInfoSync()
    var width = res.windowWidth;
    rpx2px = width / 750;
    var context = wx.createCanvasContext('secondCanvas')
    context.setFillStyle("#22ade6")
    context.fillRect(this.rpxTopx(10), this.rpxTopx(40), this.rpxTopx(160), this.rpxTopx(20))
    context.setFillStyle("#39b545")
    context.fillRect(this.rpxTopx(170), this.rpxTopx(40), this.rpxTopx(160), this.rpxTopx(20))
    context.setFillStyle("#ffaa42")
    context.fillRect(this.rpxTopx(330), this.rpxTopx(40), this.rpxTopx(160), this.rpxTopx(20))
    context.setFillStyle("#ee5d26")
    context.fillRect(this.rpxTopx(490), this.rpxTopx(40), this.rpxTopx(160), this.rpxTopx(20))
    context.setFillStyle("#000000")
    context.setFontSize(12);
    context.fillText('18.5', this.rpxTopx(140), this.rpxTopx(80))
    context.fillText('24', this.rpxTopx(310), this.rpxTopx(80))
    context.fillText('27', this.rpxTopx(470), this.rpxTopx(80))
    context.fillText('偏瘦', this.rpxTopx(70), this.rpxTopx(100))
    context.fillText('标准', this.rpxTopx(230), this.rpxTopx(100))
    context.fillText('超重', this.rpxTopx(390), this.rpxTopx(100))
    context.fillText('肥胖', this.rpxTopx(550), this.rpxTopx(100))
    context.setFillStyle('#ffffff')
    context.arc(this.rpxTopx(this.bmiToX(options.BMI)), this.rpxTopx(50), this.rpxTopx(10), 0, 2 * Math.PI)
    context.fill()
    context.draw()
  },

getMy: function (e){
  wx.navigateTo({
    url: '../index/index'
  })
},
rpxTopx: function (rpx) {
  return rpx * rpx2px;
},
bmiToX: function (BMITemp) {
  var bmi = parseFloat(BMITemp);
  if (bmi < 18.5) {
    var x = 10 + 160 / 18.5 * bmi
  }
  if (bmi >= 18.5 && bmi < 24) {
    var x = 170 + 160 / 5.5 * (bmi - 18.5)
  }
  if (bmi >= 24 && bmi < 27) {
    var x = 330 + 160 / 3 * (bmi - 24)
  }
  if (bmi >= 27) {
    var x = 490 + 160 / 13 * (bmi - 27)
  }
  if (bmi >= 40) {
    var x = 650
  }
  return x;
},
})

