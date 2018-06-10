const app = getApp();
var resArray = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    planName: null,
    complete: [],
    hiddenmodal: true,
    canvasHeight: 0,
    imageSrc: null,
    sumTime: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var SumTime = options.sumTime;
    var SumHour = parseInt(SumTime / 3600000);
    var SumMin = parseInt(SumTime % 3600000 / 60000);
    var SumSec = Math.round(SumTime % 60000 / 1000);
    var sumTimeStr = SumHour + "时" + SumMin + "分" + SumSec + "秒";
    console.log(sumTimeStr);
    var complete = JSON.parse(options.complete);
    var lines =0;
    for(let i=0;i<complete.length;i++){
      lines = lines + Math.ceil(complete[i].done.length/3);
    }
    this.setData({
      date: options.date,
      planName: options.planName,
      complete: JSON.parse(options.complete),
      canvasHeight: 440 + complete.length * 30+lines*30,
      sumTime: sumTimeStr,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sportHistory = wx.getStorageSync("sportHistory")
    this.setData({
      recordArray: sportHistory,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  saveImageShare: function () {
    var that = this;
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    var ctxHeight = that.data.canvasHeight;
    ctx.setFillStyle('#242c2e')
    ctx.fillRect(0, 0, 400, ctxHeight)
    ctx.drawImage("../../images/bell.jpg", 150, 0, 100, 100)
    // 作者名称
    ctx.setTextAlign('left')    // 文字居中
    ctx.setFillStyle('#ffffff')  // 文字颜色：黑色
    ctx.setFontSize(20)         // 文字字号：22px
    ctx.fillText("日期: " + this.data.date, 50, 130)
    ctx.fillText("计划名称: " + this.data.planName, 50, 160)
    ctx.fillText("完成情况:", 50, 190)
    var margin =0;
    for (let i = 0; i < this.data.complete.length; i++) {
      ctx.fillText(this.data.complete[i].name, 50, 220+margin)
      
      for (let j = 0; j < this.data.complete[i].done.length; j++) {
        ctx.fillText(this.data.complete[i].done[j].repeats + "×" + this.data.complete[i].done[j].weight+"kg", 50+100*(j%3), 250 + margin+30*parseInt(j/3))
      }
      margin = margin + 30 * Math.ceil(this.data.complete[i].done.length / 3) + 30
    }

    // 小程序码
    const qrImgSize = 180
    ctx.drawImage("../../images/lego.jpg", (400 - qrImgSize) / 2, ctxHeight - qrImgSize, qrImgSize, qrImgSize)
    ctx.stroke()
    ctx.draw(false, function () {
      console.log("draw callback")
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        fileType: 'jpg',
        success: function (res) {
          console.log(res.tempFilePath)
          that.setData({
            hiddenmodal: false,
            imageSrc: res.tempFilePath
          })
        }
      })
    }
    )
  },

  picConfirm: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imageSrc,
    })
    that.setData({
      hiddenmodal: true,
    })
  },

  picCancel: function () {
    var that = this;
    that.setData({
      hiddenmodal: true,
    })
  }
})