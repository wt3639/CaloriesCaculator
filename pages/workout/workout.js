const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planList:null,
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
    var pl = wx.getStorageSync("planList") || []
    this.setData({
      planList: pl,
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

  addPlan:function(){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  deletePlan:function(e){
    var that = this;
    wx.showModal({
  title: '提示',
  content: '是否删除该计划',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      var planList = that.data.planList;
      planList.splice(e.currentTarget.dataset.index, 1)
      wx.setStorageSync("planList", planList);
      that.setData({
        planList: planList,
      })
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})

   
  },

  checkHis:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  }
})