var id = null;
var editFlag = false;
var actionIndex = null;
var actHisList = [];
var sportHis = {
  date: null,
  planName: null,
  complete: []
}
var timer
var actLineArray = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    actionList: [],
    planName: null,
    actionName: null,
    repeats: null,
    weight: null,
    sets: null,
    setnum: null,
    formHide: false,
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    actHisList = [];
    var actLineArray = [];
    var planList = wx.getStorageSync("planList")[options.actionId];
    id = options.actionId;
    //console.log(planList)
    for (var i = 0; i < planList.actionList.length; i++) {
      var actLine = {
        name: null,
        repeats: null,
        sets: null,
        weight: null,
        hide: false,
      }
      actLine.name = planList.actionList[i].name;
      actLine.repeats = planList.actionList[i].repeats;
      actLine.sets = planList.actionList[i].sets;
      actLine.weight = planList.actionList[i].weight;
      actLineArray.push(actLine)
    }
    console.log(actLineArray)
    this.setData({
      actionList: actLineArray,
      planName: planList.name,
    })
    sportHis.date = new Date().toLocaleString();
    sportHis.planName = planList.name;
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
  addAction: function () {
    this.setData({
      hiddenmodalput: false,
    })

  },
  nameInputOver: function (e) {

  },

  formSubmit: function (e) {
    clearTimeout(timer);
    console.log(e)
    var actionHistory = {
      name: null,
      repeats: null,
      weight: null,
      setnum: null,
    };
    var setNum = this.data.setnum
    actionHistory.name = this.data.actionName;
    actionHistory.repeats = e.detail.value.repeats
    actionHistory.weight = e.detail.value.weight;
    actionHistory.setnum = this.data.setnum;
    actHisList.push(actionHistory)
    console.log(setNum);
    console.log(this.data.sets);
    setNum++;
    this.setData({
      setnum: setNum,
      formHide: true,
      count: 0
    })
    clearTimeout(timer);
    Countdown(this);
  },

  restComplete: function () {
    this.setData({
      formHide: false,
    })
    clearTimeout(timer);
  },

  completePlan: function () {
    sportHis.complete = actHisList;
    var sportHisList = wx.getStorageSync("sportHistory") || [];
    sportHisList.push(sportHis);
    wx.setStorageSync("sportHistory", sportHisList)
    wx.navigateBack({
      url: '../workout/workout',
    })
  },
  actionCancel: function () {
    this.setData({
      hiddenmodalput: true,
      actionName: null,
      repeats: null,
      weight: null,
      sets: null,
      count: 0,
      formHide: false,
    })
    clearTimeout(timer);
  },

  actionConfirm: function () {
    var tempActionList = this.data.actionList;
    tempActionList[actionIndex].hide = true;
    this.setData({
      hiddenmodalput: true,
      actionList: tempActionList,
      formHide: false,
    })
    console.log(this.data.actionList)
  },

  startAction(e) {
    console.log(e);
    var actionList = this.data.actionList;
    var action = actionList[e.currentTarget.dataset.index]
    actionIndex = e.currentTarget.dataset.index
    this.setData({
      hiddenmodalput: false,
      actionName: action.name,
      repeats: action.repeats,
      weight: action.weight,
      sets: action.sets,
      setnum: 1
    })
  }

})

function Countdown(that) {
  var count = that.data.count;
  if (count % 60 == 0 && count != 0) {
    wx.vibrateLong({
      success: console.log("vibrate")
    })
  }
  console.log(count);
  count++;
  timer = setTimeout(function () {
    that.setData({
      count: count
    });
    Countdown(that);
  }, 1000);
};
