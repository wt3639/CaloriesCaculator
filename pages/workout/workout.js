const app = getApp();
 //没有存储数据时的例子
var examplePlanList = [
  {
    planName: "腿部训练计划",
    actionList: [
      {
      actionName: "杠铃深蹲",
      actionRepeat: 10,
      actionWeight: 50,
      actionSet: 5
    },
    {
      actionName:"哑铃箭步蹲",
      actionRepeat: 10,
      actionWeight: 20,
      actionSet:3
    },
    {
      actionName:"器械腿推",
      actionRepeat: 10,
      actionWeight:50,
      actionSet: 4
    },
    {
      actionName:"坐姿腿屈伸",
      actionRepeat:15,
      actionWeight: 20,
      actionSet: 3
    },
    {
      actionName:"卧姿腿弯举",
      actionRepeat:15,
      actionWeight:20,
      actionSet:3
    }]
  }
  
]
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
    wx.request({
      url: 'https://www.tomwoo.tk/CounterWebApp/calory/getplanlist',
      data: {
        openid: app.globalData.openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        wx.setStorageSync("planList", res.data.planlist)
      }
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
    var pl = wx.getStorageSync("planList") 
     if(!pl){
       wx.setStorageSync("planList", examplePlanList);
       pl = examplePlanList;
    }
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