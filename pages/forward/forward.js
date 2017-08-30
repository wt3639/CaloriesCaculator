//result.js
const app = getApp()
var util = require("../util/util.js")
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
  
    var context = wx.createCanvasContext('secondCanvas')
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
    context.arc(app.rpxTopx(util.bmiToX(options.BMI)), app.rpxTopx(50), app.rpxTopx(10), 0, 2 * Math.PI)
    context.fill()
    context.draw()
  },

getMy: function (e){
  wx.navigateTo({
    url: '../index/index'
  })
},


})

