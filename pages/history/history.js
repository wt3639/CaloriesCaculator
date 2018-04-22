const app = getApp();
var sportHistory;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    sportHistory = wx.getStorageSync("sportHistory")
    this.setData({
      recordArray: [].concat(sportHistory).reverse() ,
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
  hisView:function(e){
    var clickHis = this.data.recordArray[e.currentTarget.dataset.index];
    var date = clickHis.date;
    var planName = clickHis.planName;
    var complete = JSON.stringify(clickHis.complete)
    var sumTime = clickHis.sumTime
    wx.navigateTo({
      url: '../workresult/workresult?date='+date+"&planName="+planName+"&complete="+complete+"&sumTime="+sumTime,
    })
    
  },

    deleteAction: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该条训练历史',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          sportHistory.splice(sportHistory.length-e.currentTarget.dataset.index-1, 1)
          wx.setStorageSync("sportHistory", sportHistory)
          that.setData({
            recordArray: [].concat(sportHistory).reverse(),
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
})