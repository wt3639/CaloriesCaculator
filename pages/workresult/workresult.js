const app = getApp();
var resArray = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    planName:null,
    complete:[],
    hiddenmodal:true,
    canvasHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      this.setData({
        date: options.date,
        planName: options.planName,
        complete:JSON.parse(options.complete),
        canvasHeight: 450 +JSON.parse(options.complete).length*30
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
  saveImageShare:function(){
    this.setData({
      hiddenmodal: false,
    })
      const ctx = wx.createCanvasContext('shareCanvas')
      // 底图
      var ctxHeight = 450 + this.data.complete.length*30;
      ctx.setFillStyle('#242c2e')  
      ctx.fillRect(0, 0, 400, ctxHeight)
      ctx.drawImage("../../images/bell.jpg", 150, 0, 100, 100)
      // 作者名称
      ctx.setTextAlign('left')    // 文字居中
      ctx.setFillStyle('#ffffff')  // 文字颜色：黑色
      ctx.setFontSize(20)         // 文字字号：22px
      ctx.fillText("日期: "+this.data.date, 50, 110)
      ctx.fillText("计划名称: " + this.data.planName, 50, 140)
      ctx.fillText("完成情况:", 50, 170)
      ctx.fillText("动作名称", 50, 200 )
      ctx.fillText("组号", 200, 200 )
      ctx.fillText("次数", 250, 200 )
      ctx.fillText("重量", 300, 200 )
      for(let i=0;i<this.data.complete.length;i++){
        ctx.fillText(this.data.complete[i].name, 50, 230+30*i)
        ctx.fillText(this.data.complete[i].setnum, 200, 230 + 30 * i)
        ctx.fillText(this.data.complete[i].repeats, 250, 230 + 30 * i)
        ctx.fillText(this.data.complete[i].weight+"kg",300 , 230 + 30 * i)
      }
      
      // 小程序码
      const qrImgSize = 180
      ctx.drawImage("../../images/lego.jpg", (400 - qrImgSize) / 2, ctxHeight-qrImgSize, qrImgSize, qrImgSize)
      ctx.stroke()
      ctx.draw(false,function(){
        console.log("draw callback")
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          fileType: 'jpg',
          success: function(res){
            console.log(res.tempFilePath)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
          }
        })
        }
      )
  },
})